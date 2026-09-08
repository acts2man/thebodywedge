import { getStore } from "@netlify/blobs";
import { leadSchema, readLeadBody } from "@/lib/lead-validation";
import { consentVersion, newsletterConsent } from "@/lib/commerce";

const headers={"Cache-Control":"no-store"};
const reply=(body:Record<string,unknown>,status=200)=>Response.json(body,{status,headers});
const digest=async(value:string)=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");

export async function POST(request:Request){
  const origin=request.headers.get("origin");
  if((origin && origin!==new URL(request.url).origin)||request.headers.get("sec-fetch-site")==="cross-site") return reply({error:"Please submit the form from The Body Wedge website."},403);
  let input:unknown;
  try{input=await readLeadBody(request);}catch{return reply({error:"Please check the form and try again."},400);}
  const parsed=leadSchema.safeParse(input);
  if(!parsed.success) return reply({error:"Please enter a valid email, complete the required fields, and confirm your consent."},400);
  const lead=parsed.data;
  if(lead.website) return reply({ok:true});
  try{
    const store=getStore({name:"body-wedge-leads",consistency:"strong"}),now=Date.now(),hour=Math.floor(now/3600000);
    const ip=request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local-preview";
    const rateKey=await digest(`${hour}:${ip}`);
    const rateBlob=`rate/${hour}/${rateKey}`;
    const previous=await store.get(rateBlob,{type:"json"}) as {attempts?:number}|null;
    const attempts=Number(previous?.attempts || 0)+1;
    await store.setJSON(rateBlob,{attempts,expiresAt:(hour+1)*3600000});
    if(attempts>8) return reply({error:"You’ve made several requests. Please try again later, or email info@thebodywedge.com."},429);
    const createdAt=new Date(now).toISOString();
    if(lead.kind==="newsletter"){
      const source=["/","/about","/learn","/shop","/practitioners","/products/the-body-wedge"].includes(lead.source)?lead.source:"/";
      const id=await digest(lead.email);
      const key=`newsletter/${id}`;
      if(!await store.get(key)) await store.setJSON(key,{email:lead.email,source,consentText:newsletterConsent,consentVersion,createdAt,status:"subscribed"});
    }else{
      const id=await digest(JSON.stringify([lead.email,lead.name,lead.business,lead.profession,lead.country,lead.interest,lead.message]));
      const key=`practitioner/${id}`;
      if(!await store.get(key)) await store.setJSON(key,{id,name:lead.name,email:lead.email,business:lead.business,profession:lead.profession,country:lead.country,interest:lead.interest,message:lead.message,consentText:"Contact about this inquiry only; no marketing subscription.",createdAt,status:"new"});
    }
    return reply({ok:true},201);
  }catch{
    console.error("Body Wedge lead storage failed");
    return reply({error:"We couldn’t save your details. Please try again, or email info@thebodywedge.com."},503);
  }
}
