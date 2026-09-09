"use client";
import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Play, Feather, Fingerprint, Check, Mail, Phone, MapPin, Layers3, MessageCircle, PackageCheck, Sparkles } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteShell, Action, ProductGrid, VideoButton, FAQList, FinalCTA } from "@/components/bodywedge";
import { products } from "@/lib/catalog";
import { CoreEducation, NewsletterSection, PractitionerStrip } from "@/components/bodywedge-phase1";
import { videoGroups, articles } from "@/lib/editorial";
const A = "/assets/";
const store = "https://thebodywedge.com";

export function InnerHero({name,eyebrow,children,description,extra,image,imageAlt,imageLabel}: {name:string;eyebrow:string;children:ReactNode;description?:string;extra?:ReactNode;image?:string;imageAlt?:string;imageLabel?:string}) {return <section className={`inner-hero ${image?"inner-hero-visual":""}`}><div className="inner-hero-copy"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{name}</span></div><span className="eyebrow">{eyebrow}</span><h1>{children}</h1>{image&&<div className="mobile-flow-image mobile-flow-image-850 inner-hero-mobile-media"><img src={`${A}${image}`} alt={imageAlt||""} width="1152" height="1440"/></div>}{description&&<p>{description}</p>}{extra}</div>{image&&<figure className="inner-hero-media desktop-flow-image-850" data-reveal><img src={`${A}${image}`} alt={imageAlt||""} width="1152" height="1440"/><figcaption><span>{imageLabel}</span><span>THE BODY WEDGE / LIFE IN MOTION</span></figcaption></figure>}</section>;}

export function ShopPage(){return <SiteShell><main id="main"><InnerHero name="The collection" eyebrow="THOUGHTFUL TOOLS. EVERYDAY POSSIBILITIES." description="A more personal approach to self-care starts with the right tools. Find the Wedge that fits your life.">YOUR BODY.<br/><em>YOUR WEDGE.</em></InnerHero><section className="shop-body section-pad"><div className="shop-note"><span>THE COLLECTION / 3 PRODUCTS</span><span>DESIGNED TO GO WHERE LIFE TAKES YOU</span></div><ProductGrid/><div className="shop-help"><div><h2>A little help choosing?</h2><p>We’ll help you find your starting point.</p></div><Link className="text-link" href="/contact">Talk to the team <ArrowUpRight size={18}/></Link></div></section></main></SiteShell>;}

export { ProductPage } from "@/components/bodywedge-product";

export function AboutPage(){return <SiteShell><main id="main"><InnerHero name="Our approach" eyebrow="THE BODY WEDGE PHILOSOPHY" description="We believe in taking a proactive approach to your quality of life. In paying attention to your body. And in making space for the things that keep you moving." image="approach-movement.webp" imageAlt="A woman reaching into a gentle standing stretch in a sunlit studio" imageLabel="MAKE ROOM TO MOVE">COME BACK<br/>TO <em>YOURSELF.</em></InnerHero><CoreEducation/><section className="editorial-body light-surface section-pad"><div data-reveal><span className="eyebrow">SELF-CARE STARTS WITH AWARENESS</span><h2>A thoughtful tool.<br/>A simple intention.</h2></div><div className="editorial-prose" data-reveal><p>Your day asks a lot of your body. Sitting, standing, working, moving—it all adds up. The Body Wedge was designed to help make self-massage a more accessible part of everyday life.</p><p>Its distinctive shape is inspired by the fingertips and palm of a massage therapist. A curved rocker base, multiple contact points, and lightweight foam bring that idea into a tool you can use at home.</p><h3>Start at your core.</h3><p>The Body Wedge is designed with the abdominal and core muscles in mind, including the psoas. Our video library is a starting point for learning about the tool, your body, and ways to approach self-care.</p><p>There’s no one-size-fits-all routine. Get to know the product, follow the guidance, and seek professional advice when you need it.</p><Action href="/learn">Learn about your Wedge</Action></div></section><section className="about-statement"><div data-reveal><blockquote>More awareness.<br/>More intention.<br/>More room to be you.</blockquote><span className="eyebrow">YOUR BODY. YOUR PACE. YOUR POWER.</span></div><img src={`${A}black-original.png`} alt="The Body Wedge’s hand-inspired shape" width="639" height="723" loading="lazy"/></section><PractitionerStrip/><NewsletterSection/><FinalCTA/></main></SiteShell>;}

export function FAQPage(){return <SiteShell><main id="main"><InnerHero name="Questions" eyebrow="ANSWERS, WITHOUT THE GUESSWORK" description="Get to know the Wedge, choose your option, and find the guidance you need before you begin.">GOOD<br/><em>QUESTIONS.</em></InnerHero><section className="faq-page section-pad light-surface"><aside className="faq-aside"><h2>We’re here<br/>to help.</h2><p>Have a question that isn’t covered here? Get in touch with The Body Wedge team.</p><Link className="text-link" href="/contact">Ask us a question <ArrowUpRight size={18}/></Link></aside><FAQList/></section></main></SiteShell>;}

export function ContactPage(){
  const [status,setStatus]=useState("");
  function draftEmail(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const subject=`Body Wedge question from ${String(form.get("name") || "").trim()}`;
    const body=`Name: ${String(form.get("name") || "").trim()}\nEmail: ${String(form.get("email") || "").trim()}\n\n${String(form.get("message") || "").trim()}`;
    window.location.href=`mailto:info@thebodywedge.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Check your email app for the draft. Nothing has been sent yet. If no draft opens, copy your message and email info@thebodywedge.com directly.");
  }
  return <SiteShell><main id="main" className="contact-route">
    <section className="contact-hero inner-hero" aria-labelledby="contact-title">
      <div className="contact-intro inner-hero-copy">
        <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
        <span className="eyebrow">A REAL CONVERSATION STARTS HERE</span>
        <h1 id="contact-title">LET’S<br/><em>CONNECT.</em></h1>
        <p>Choosing your first Wedge? Have an order question? Tell us what’s on your mind.</p>
        <div className="contact-direct">
          <a href="mailto:info@thebodywedge.com"><Mail size={22} strokeWidth={1.4}/><span><small>EMAIL THE TEAM</small><span>info@thebodywedge.com</span></span><ArrowUpRight size={22}/></a>
          <a href="tel:8559334363"><Phone size={22} strokeWidth={1.4}/><span><small>GIVE US A CALL</small><span>(855) 933-4363</span></span><ArrowUpRight size={22}/></a>
        </div>
        <p className="contact-location"><MapPin size={16}/>Chicago, Illinois, United States</p><Link className="contact-practitioner-link text-link" href="/practitioners">Practitioner or wholesale inquiry <ArrowUpRight size={17}/></Link>
      </div>
      <form className="contact-form" aria-labelledby="contact-form-title" onSubmit={draftEmail} onChange={()=>setStatus("")} data-reveal>
        <div className="contact-form-heading"><span className="eyebrow">SEND A NOTE</span><h2 id="contact-form-title">A little help.<br/>A human connection.</h2></div>
        <label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Name" required maxLength={100}/></label>
        <label htmlFor="contact-email">Email address<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={200}/></label>
        <label htmlFor="contact-message">What’s on your mind?<textarea id="contact-message" name="message" placeholder="Tell us how we can help…" required maxLength={4000} rows={4}/></label>
        <button type="submit" className="button"><span>Open email draft</span><ArrowUpRight size={20}/></button>
        <p className="form-note">This opens your email app. Send the draft there to reach us. Prefer your browser? Use our <a href={`${store}/pages/contact`}>store contact form</a>.</p>
        <div role="status" aria-live="polite" className={status?"contact-status":""}>{status}</div>
      </form>
    </section>
    <section className="contact-support section-pad light-surface" aria-labelledby="contact-support-title">
      <div className="contact-support-heading" data-reveal><span className="eyebrow">WHATEVER BRINGS YOU HERE</span><h2 id="contact-support-title">We’ll help you<br/>find your next step.</h2></div>
      <div className="contact-reasons" data-reveal>
        <div><Fingerprint size={24} strokeWidth={1.4}/><span><strong>Find your Wedge.</strong>Get help choosing your size and starting point.</span></div>
        <div><PackageCheck size={24} strokeWidth={1.4}/><span><strong>Talk about an order.</strong>Questions about delivery, returns, or an existing purchase.</span></div>
        <div><MessageCircle size={24} strokeWidth={1.4}/><span><strong>Start a conversation.</strong>Product, press, partnership, or anything else.</span></div>
      </div>
    </section>
  </main></SiteShell>;
}

export function LearnPage(){return <SiteShell><main id="main"><InnerHero name="Video library" eyebrow="LEARN YOUR TOOL. LISTEN TO YOUR BODY." description="Learn what the psoas is, watch the original Body Wedge placement and technique, and explore videos on mobility and abdominal self-massage." image="learn-preparation.webp" imageAlt="Hands unrolling a graphite exercise mat on a sunlit stone floor" imageLabel="START WITH A LITTLE INTENTION" extra={<nav className="library-nav" aria-label="Video topics">{videoGroups.map(g=><a href={`#${g.id}`} key={g.id}>{g.name}</a>)}</nav>}>A LITTLE<br/><em>BODY KNOW-HOW.</em></InnerHero><section className="learn-body section-pad"><div className="learn-featured"><div className="ritual-photo desktop-flow-image-600"><img src={`${A}use-original.jpg`} alt="The Body Wedge demonstration" width="1280" height="720"/><VideoButton title="How to use your Body Wedge" className="large-play"><span className="play-circle"><Play fill="currentColor" size={25}/></span><span>PLAY THE DEMONSTRATION</span></VideoButton></div><div><span className="eyebrow">START HERE</span><h2>Get to know<br/>your Body Wedge.</h2><div className="mobile-flow-image mobile-flow-image-600 learn-mobile-inline"><img src={`${A}use-original.jpg`} alt="The Body Wedge demonstration" width="1280" height="720"/><VideoButton title="How to use your Body Wedge" className="large-play"><span className="play-circle"><Play fill="currentColor" size={25}/></span><span>PLAY THE DEMONSTRATION</span></VideoButton></div><p>See the tool in use. Start with this demonstration and the included product instructions before exploring the rest of the library.</p><p className="library-guidance">Video content is educational. Review the product’s safety guidance and speak with a qualified professional about your needs.</p></div></div>{videoGroups.map(g=><section className="video-group" id={g.id} key={g.id}><div className="video-group-heading"><h2>{g.name}</h2><span>{String(g.videos.length).padStart(2,"0")} VIDEOS</span></div><div className="video-grid">{g.videos.map(v=><VideoButton key={v.id} id={v.id} title={v.title} className="video-card"><span className="video-thumb"><img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy"/><span className="play-circle"><Play fill="currentColor" size={15}/></span></span><span className="video-card-title"><small>WATCH</small>{v.title}</span></VideoButton>)}</div></section>)}</section><CoreEducation compact/><NewsletterSection/></main></SiteShell>;}

export function JournalPage(){return <SiteShell><main id="main"><InnerHero name="The journal" eyebrow="READ. REFLECT. RECONNECT." description="Explore the Body Wedge archive: perspectives on the core, movement, and making more time for self-care." image="journal-lifestyle.png" imageAlt="The Body Wedge beside a journal in a sunlit movement studio" imageLabel="NOTES ON A LIFE IN MOTION">A BODY OF<br/><em>KNOWLEDGE.</em></InnerHero><section className="section-pad light-surface"><div className="journal-editorial-lead" data-reveal><img className="desktop-flow-image-600" src={`${A}approach-lifestyle.png`} alt="An intentional Body Wedge self-care ritual" width="1152" height="1440" loading="lazy"/><div><span className="eyebrow">THE PRACTICE OF PAYING ATTENTION</span><h2>Small moments.<br/>A more aware body.</h2><div className="mobile-flow-image mobile-flow-image-600 journal-mobile-inline"><img src={`${A}approach-lifestyle.png`} alt="An intentional Body Wedge self-care ritual" width="1152" height="1440" loading="lazy"/></div><p>The journal looks beyond the tool to the rituals, ideas, and everyday choices that keep life moving.</p><a className="text-link" href={`${store}/blogs/news`}>Enter the journal <ArrowUpRight size={18}/></a></div></div><div className="journal-grid">{articles.map((a,i)=><a className="journal-card" href={`${store}${a.href}`} key={a.href} data-reveal><span className="article-number">0{i+1}</span><h2>{a.title}</h2><p>{a.description}</p><div className="journal-card-bottom"><span>THE BODY WEDGE ARCHIVE / JULY 30, 2021</span><ArrowUpRight size={25}/></div></a>)}</div><div className="journal-archive"><p>More perspectives from The Body Wedge journal.</p><a className="text-link" href={`${store}/blogs/news?page=2`}>Explore the full archive <ArrowUpRight size={18}/></a></div></section><FinalCTA/></main></SiteShell>;}
