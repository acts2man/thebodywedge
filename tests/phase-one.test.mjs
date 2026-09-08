import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";

const require=createRequire(import.meta.url);
const root=new URL("../",import.meta.url);
const read=path=>readFileSync(new URL(path,root),"utf8");
function loadTs(path,bindings={}){
  const module={exports:{}};
  const js=ts.transpileModule(read(path),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const localRequire=name=>Object.hasOwn(bindings,name)?bindings[name]:require(name);
  vm.runInThisContext(`(function(require,module,exports){${js}\n})`,{filename:path})(localRequire,module,module.exports);
  return module.exports;
}
const commerce=loadTs("lib/commerce.ts");
const validation=loadTs("lib/lead-validation.ts",{"./commerce":commerce});

function environment(){
  const blobs=new Map();
  let unavailable=false;
  const store={
    async get(key,{type}={}){if(unavailable)throw new Error("offline");const value=blobs.get(key);return value===undefined?null:type==="json"?value:JSON.stringify(value);},
    async setJSON(key,value){if(unavailable)throw new Error("offline");blobs.set(key,value);},
  };
  const route=loadTs("app/api/leads/route.ts",{"@netlify/blobs":{getStore:()=>store},"@/lib/lead-validation":validation,"@/lib/commerce":commerce});
  return {blobs,POST:route.POST,fail:()=>{unavailable=true}};
}
const newsletter={kind:"newsletter",email:"Person@example.com",consent:true,website:"",source:"/"};
const inquiry={kind:"practitioner",email:"practice@example.com",name:"Test Person",business:"Example Practice",profession:"Massage therapist",country:"United States",interest:commerce.practitionerInterests[2],message:"Please share purchasing information.",consent:true,website:"",source:"/practitioners"};
const request=(body,headers={})=>new Request("https://bodywedge.example/api/leads",{method:"POST",headers:{"content-type":"application/json",origin:"https://bodywedge.example","x-nf-client-connection-ip":"192.0.2.10",...headers},body:JSON.stringify(body)});

test("Shopify checkout preserves variant and quantity, with bounded quantity and referral",()=>{
  const url=new URL(commerce.checkoutUrl(43706534789363,3));
  assert.equal(url.origin,"https://thebodywedge.com");
  assert.equal(url.pathname,"/cart/43706534789363:3");
  assert.equal(url.searchParams.get("ref"),"bodywedge-phase1");
  assert.ok(commerce.checkoutUrl(43706534789363,0).includes(":1?"));
  assert.ok(commerce.checkoutUrl(43706534789363,100).includes(":20?"));
});
test("newsletter persists consent and deduplicates a retried email",async()=>{
  const env=environment();
    assert.equal((await env.POST(request(newsletter))).status,201);
    assert.equal((await env.POST(request({...newsletter,email:" person@EXAMPLE.COM "}))).status,201);
    const rows=[...env.blobs.entries()].filter(([key])=>key.startsWith("newsletter/"));
    assert.equal(rows.length,1);assert.equal(rows[0][1].email,"person@example.com");assert.equal(rows[0][1].consentText,commerce.newsletterConsent);assert.equal(rows[0][1].consentVersion,commerce.consentVersion);
    assert.equal([...env.blobs.keys()].filter(key=>key.startsWith("practitioner/")).length,0);
});
test("practitioner inquiries persist separately and retries are idempotent",async()=>{
  const env=environment();
    assert.equal((await env.POST(request(inquiry))).status,201);assert.equal((await env.POST(request(inquiry))).status,201);
    const rows=[...env.blobs.entries()].filter(([key])=>key.startsWith("practitioner/"));assert.equal(rows.length,1);assert.equal(rows[0][1].interest,inquiry.interest);assert.equal(rows[0][1].country,inquiry.country);
    assert.equal([...env.blobs.keys()].filter(key=>key.startsWith("newsletter/")).length,0);
});
test("invalid data, missing consent, and cross-origin submissions do not save",async()=>{
  const env=environment();
    for(const payload of [{...newsletter,consent:false},{...newsletter,email:"invalid"},{...inquiry,business:" "},{...inquiry,interest:"unknown"}])assert.equal((await env.POST(request(payload))).status,400);
    assert.equal((await env.POST(request(newsletter,{origin:"https://another.example"}))).status,403);
    assert.equal((await env.POST(request({...newsletter,source:"x".repeat(17000)}))).status,400);
    assert.equal([...env.blobs.keys()].filter(key=>key.startsWith("newsletter/")).length,0);
});
test("honeypot is silent and rate limiting is enforced",async()=>{
  const env=environment();
    assert.equal((await env.POST(request({...newsletter,website:"bot.example"}))).status,200);
    assert.equal([...env.blobs.keys()].filter(key=>key.startsWith("newsletter/")).length,0);
    for(let i=0;i<8;i++)assert.equal((await env.POST(request({...newsletter,email:`person${i}@example.com`}))).status,201);
    assert.equal((await env.POST(request({...newsletter,email:"one-more@example.com"}))).status,429);
    assert.equal([...env.blobs.keys()].filter(key=>key.startsWith("newsletter/")).length,8);
});
test("storage failure gives a recoverable error without claiming success",async()=>{
  const env=environment();env.fail();const response=await env.POST(request(newsletter));assert.equal(response.status,503);const body=await response.json();assert.ok(body.error);assert.equal(body.ok,undefined);
});
