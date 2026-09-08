"use client";

import Link from "next/link";
import { ArrowUpRight, Fingerprint, BookOpen, PackageCheck, MoveUpRight } from "lucide-react";
import { EmailSignup } from "@/components/lead-forms";

export function CoreEducation({compact=false}:{compact?:boolean}) {
  return <section className={`core-education section-pad ${compact?"core-education-compact":""}`} id="understand-your-core" aria-labelledby="core-heading">
    <div className="core-education-heading" data-reveal><span className="eyebrow">A LITTLE KNOWLEDGE GOES DEEPER</span><h2 id="core-heading">Your back. Your hips.<br/><span>The connection is<br/>at your core.</span></h2><Link href="/learn" className="text-link">Watch &amp; learn <ArrowUpRight size={18}/></Link></div>
    <div className="core-education-content" data-reveal>
      <div className="psoas-definition"><span className="eyebrow">MEET THE PSOAS</span><p className="psoas-word">psoas <span>/ SO-as /</span></p><p>A deep core muscle that connects the lower spine to the thigh bone. It helps you bend at the hip and works with other muscles to support posture and movement.</p></div>
      <div className="core-context"><h3>Look beyond the surface.</h3><p>The abdominal core, hip flexors, and muscles around the lower back work together. The QL sits at the back of the abdominal wall, connecting the pelvis and lower rib.</p><p>The Body Wedge’s contours are designed for focused abdominal self-massage and awareness of this hip–back connection. Learn the placement from the original demonstration before you begin.</p></div>
      <p className="education-note">Tension can have many causes. This is education, not a diagnosis or a promise of relief. <a href="https://my.clevelandclinic.org/health/body/psoas-muscle" target="_blank" rel="noopener noreferrer">Read about psoas anatomy <ArrowUpRight size={12}/></a></p>
    </div>
  </section>;
}

export function BuyerContexts(){return <div className="buyer-contexts" aria-label="Make core care part of your routine"><span>AFTER LONG HOURS SITTING</span><span>BETWEEN TRAINING SESSIONS</span><span>IN YOUR MOVEMENT PRACTICE</span></div>;}

export function BuyDirect(){return <section className="direct-reasons section-pad" aria-labelledby="direct-heading"><div><span className="eyebrow">FROM THE BODY WEDGE, DIRECTLY</span><h2 id="direct-heading">The tool. The guidance.<br/>The team behind it.</h2></div><div className="direct-reason-list"><div><Fingerprint size={23}/><h3>Choose your fit.</h3><p>Compare the original size and density options in one place.</p></div><div><BookOpen size={23}/><h3>Learn as you go.</h3><p>Original demonstrations and included instructions help you get to know the tool.</p></div><div><PackageCheck size={23}/><h3>Buy from the source.</h3><p>Order directly from The Body Wedge and contact the team with product or order questions.</p></div></div></section>;}

export function CustomerVoices(){return <section className="customer-voices section-pad" id="customer-stories" aria-labelledby="voices-heading"><div className="voices-heading" data-reveal><span className="eyebrow">FROM THE BODY WEDGE COMMUNITY</span><h2 id="voices-heading">Small tool.<br/><span>Real perspectives.</span></h2><a className="text-link" href="https://thebodywedge.com/">Read the original feedback <ArrowUpRight size={18}/></a></div><div className="voice-quotes" data-reveal><figure><span className="eyebrow">AN ACTIVE ROUTINE</span><blockquote>“small, easy to use, and affordable.”</blockquote><figcaption>Steven G. Depolo</figcaption></figure><figure><span className="eyebrow">GETTING STARTED</span><blockquote>“the manual and instructions provided made it easy to understand”</blockquote><figcaption>Nicole</figcaption></figure><p>Excerpts from customer feedback published by The Body Wedge. These are individual experiences.</p></div></section>;}

export function PractitionerStrip(){return <section className="practitioner-strip section-pad"><div data-reveal><span className="eyebrow">FOR THE PEOPLE WHO HELP PEOPLE MOVE</span><h2>A place in your practice.</h2><p>Massage therapists, physical therapists, chiropractors, trainers, and movement professionals: explore product education, clinic use, and wholesale inquiries.</p></div><Link className="button button-outline" href="/practitioners"><span>Practitioners &amp; wholesale</span><ArrowUpRight size={20}/></Link></section>;}

export function NewsletterSection(){return <section className="newsletter-section section-pad" id="stay-in-the-loop" aria-labelledby="newsletter-heading"><div data-reveal><span className="eyebrow">CURIOUS? KEEP EXPLORING.</span><h2 id="newsletter-heading">A little more<br/><span>body know-how.</span></h2><p>Join the list for Body Wedge education, new videos, and product updates. Learn at your pace, even if you’re not ready to buy.</p></div><div data-reveal><EmailSignup/><Link href="/learn" className="newsletter-video-link">Explore the free video library now <MoveUpRight size={17}/></Link></div></section>;}
