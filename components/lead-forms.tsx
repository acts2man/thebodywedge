"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { newsletterConsent, practitionerInterests } from "@/lib/commerce";

async function saveLead(payload: Record<string,unknown>) {
  const response = await fetch("/api/leads", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)});
  const result = await response.json().catch(()=>({}));
  if(!response.ok || result.ok!==true) throw new Error(result.error || "We couldn’t save your details. Please try again, or email info@thebodywedge.com.");
}

export function EmailSignup(){
  const id=useId(),busy=useRef(false);
  const [consent,setConsent]=useState(false),[status,setStatus]=useState<"idle"|"saving"|"success"|"error">("idle"),[error,setError]=useState("");
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(busy.current)return;
    if(!consent){setError("Please agree to receive email updates before joining.");setStatus("error");return;}
    busy.current=true;setStatus("saving");setError("");
    const form=new FormData(e.currentTarget);
    try{await saveLead({kind:"newsletter",email:form.get("email"),consent,website:form.get("website"),source:window.location.pathname});setStatus("success");}catch(e){setError(e instanceof Error?e.message:"Please try again.");setStatus("error");}finally{busy.current=false;}
  }
  return <div className="signup-surface">{status==="success"?<div className="lead-success" role="status"><Check size={26}/><h3>You’re on the list.</h3><p>Thanks for your interest in The Body Wedge. Your signup has been saved.</p></div>:<form method="post" action="/api/leads" onSubmit={submit} className="newsletter-form" aria-label="Body Wedge email signup"><label htmlFor={`${id}-email`}>Your email address</label><div className="newsletter-input-row"><input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} disabled={status==="saving"}/><button className="button" disabled={status==="saving"} type="submit"><span>{status==="saving"?"Joining…":"Keep me informed"}</span>{status==="saving"?<LoaderCircle className="spinner" size={18}/>:<ArrowUpRight size={18}/>}</button></div><div className="lead-consent"><Checkbox id={`${id}-consent`} checked={consent} onCheckedChange={v=>setConsent(v===true)} disabled={status==="saving"}/><label htmlFor={`${id}-consent`}>{newsletterConsent}</label></div><div className="lead-honeypot" aria-hidden="true"><label htmlFor={`${id}-website`}>Leave this empty</label><input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1}/></div><p className="lead-privacy"><a href="https://thebodywedge.com/pages/privacy-policy">Privacy policy</a></p><div role="status" aria-live="polite">{status==="error"&&<p className="lead-error">{error}</p>}</div></form>}</div>;
}

export function PractitionerInquiry(){
  const busy=useRef(false),[interest,setInterest]=useState(""),[consent,setConsent]=useState(false),[status,setStatus]=useState<"idle"|"saving"|"success"|"error">("idle"),[error,setError]=useState("");
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(busy.current)return;
    if(!interest||!consent){setError("Choose an area of interest and agree to be contacted about your inquiry.");setStatus("error");return;}
    busy.current=true;setStatus("saving");setError("");const form=new FormData(e.currentTarget);
    try{await saveLead({kind:"practitioner",name:form.get("name"),email:form.get("email"),business:form.get("business"),profession:form.get("profession"),country:form.get("country"),message:form.get("message"),interest,consent,website:form.get("website"),source:"/practitioners"});setStatus("success");}catch(e){setError(e instanceof Error?e.message:"Please try again.");setStatus("error");}finally{busy.current=false;}
  }
  return <div className="practitioner-form-surface">{status==="success"?<div className="lead-success" role="status"><Check size={28}/><h3>Your inquiry is saved.</h3><p>Thank you for telling us about your practice. For time-sensitive questions, email <a href="mailto:info@thebodywedge.com">info@thebodywedge.com</a> or call <a href="tel:8559334363">(855) 933-4363</a>.</p></div>:<form method="post" action="/api/leads" className="practitioner-form" onSubmit={submit} aria-labelledby="practice-form-title"><span className="eyebrow">PRACTITIONER &amp; WHOLESALE INQUIRIES</span><h2 id="practice-form-title">Tell us about<br/>your practice.</h2><div className="form-pair"><label htmlFor="practice-name">Your name<input id="practice-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="practice-email">Work email<input id="practice-email" name="email" type="email" autoComplete="email" required maxLength={254}/></label></div><label htmlFor="practice-business">Practice or business<input id="practice-business" name="business" autoComplete="organization" required maxLength={150}/></label><div className="form-pair"><label htmlFor="practice-profession">Profession<input id="practice-profession" name="profession" placeholder="e.g. Massage therapist" required maxLength={100}/></label><label htmlFor="practice-country">Country / region<input id="practice-country" name="country" autoComplete="country-name" required maxLength={100}/></label></div><div className="form-field"><label htmlFor="practice-interest">I’m interested in</label><Select value={interest} onValueChange={setInterest}><SelectTrigger id="practice-interest" className="practice-select"><SelectValue placeholder="Choose an area of interest"/></SelectTrigger><SelectContent className="practice-select-options">{practitionerInterests.map(v=><SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div><label htmlFor="practice-message">How can we help?<textarea id="practice-message" name="message" placeholder="Tell us about your plans, product questions, or approximate quantities. Please don’t include patient details." required rows={4} maxLength={3000}/></label><div className="lead-consent"><Checkbox id="practice-consent" checked={consent} onCheckedChange={v=>setConsent(v===true)}/><label htmlFor="practice-consent">The Body Wedge may contact me about this inquiry. This does not sign me up for marketing emails.</label></div><div className="lead-honeypot" aria-hidden="true"><label htmlFor="practice-website">Leave this empty</label><input id="practice-website" name="website" autoComplete="off" tabIndex={-1}/></div><button type="submit" className="button" disabled={status==="saving"}><span>{status==="saving"?"Saving inquiry…":"Submit inquiry"}</span>{status==="saving"?<LoaderCircle className="spinner" size={18}/>:<ArrowUpRight size={18}/>}</button><p className="lead-privacy">Submitting an inquiry does not create an account or place an order. <a href="https://thebodywedge.com/pages/privacy-policy">Privacy policy</a></p><div role="status" aria-live="polite">{status==="error"&&<p className="lead-error">{error}</p>}</div></form>}</div>;
}
