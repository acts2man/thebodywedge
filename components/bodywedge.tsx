"use client";

import { useEffect, useRef, useState, createContext, useContext, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ArrowRight, ArrowDown, Play, Pause, Menu, Plus, Check, MoveUpRight, Feather, Fingerprint, RotateCcw, Layers3, Mail, Phone, Minus } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { products } from "@/lib/catalog";
import { BuyerContexts, BuyDirect, CustomerVoices, NewsletterSection, PractitionerStrip } from "@/components/bodywedge-phase1";

const MotionContext = createContext({ paused: false });
const A = "/assets/";
const shopOrigin = "https://thebodywedge.com";

export function SiteShell({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(preference.matches || localStorage.getItem("bodywedge-motion") === "off");
    const change = () => setPaused(preference.matches);
    preference.addEventListener("change", change);
    return () => preference.removeEventListener("change", change);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (paused) { nodes.forEach(n => n.classList.add("revealed")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); }
    }), { threshold: 0.08 });
    nodes.forEach(n => { if (n.getBoundingClientRect().top > window.innerHeight) n.classList.add("reveal-ready"); observer.observe(n); });
    return () => observer.disconnect();
  }, [pathname, paused]);
  function toggleMotion() { setPaused(p => { localStorage.setItem("bodywedge-motion", p ? "on" : "off"); return !p; }); }
  const nav = [["Home", "/"], ["The Wedge", "/products/the-body-wedge"], ["Our approach", "/about"], ["How to use", "/learn"], ["Journal", "/journal"], ["Practitioners", "/practitioners"], ["Contact", "/contact"]];
  return <MotionContext.Provider value={{ paused }}><div className="site-shell phase-one-site">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link className="wordmark brand-lockup" href="/" aria-label="The Body Wedge home"><img className="original-brand-logo" src="/assets/brand-logo.png" alt="The Body Wedge" width="260" height="218"/><span className="brand-lockup-copy" aria-hidden="true">THE BODY WEDGE</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label, href]) => <Link key={href} className={pathname === href ? "active" : ""} aria-current={pathname === href ? "page" : undefined} href={href}>{label}</Link>)}</nav>
      <div className="header-actions"><Link className="header-shop" href="/shop"><span>Shop Now</span> <ArrowUpRight size={17}/></Link>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetTrigger asChild><button className="menu-button" aria-label="Open navigation"><Menu size={24}/></button></SheetTrigger><SheetContent className="mobile-sheet"><SheetTitle>Explore The Body Wedge</SheetTitle><SheetDescription>Made for a life in motion.</SheetDescription><nav aria-label="Mobile navigation">{[...nav, ["Shop the collection", "/shop"], ["Questions", "/faq"]].map(([label, href]) => <Link onClick={() => setMenuOpen(false)} key={href} aria-current={pathname === href ? "page" : undefined} href={href}>{label}<ArrowUpRight size={20}/></Link>)}</nav></SheetContent></Sheet>
      </div>
    </header>
    {children}
    <footer className="site-footer">
      <div className="footer-top"><div><p className="eyebrow">A LITTLE SELF-CARE GOES A LONG WAY.</p><h2>Keep life<br/><span>moving.</span></h2><a className="text-link" href="mailto:info@thebodywedge.com">info@thebodywedge.com <ArrowUpRight size={18}/></a></div>
        <div className="footer-links"><div><p>Explore</p><Link href="/shop">The collection</Link><Link href="/about">Our approach</Link><Link href="/learn">Video library</Link><Link href="/journal">The journal</Link></div><div><p>Here to help</p><Link href="/faq">Common questions</Link><Link href="/contact">Contact us</Link><Link href="/practitioners">Practitioners &amp; wholesale</Link><a href={`${shopOrigin}/pages/refund-policy`}>Returns</a><a href="tel:8559334363">(855) 933-4363</a></div></div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">BODYWEDGE<span>®</span></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} The Body Wedge.</span><div><a href={`${shopOrigin}/pages/privacy-policy`}>Privacy</a><a href={`${shopOrigin}/pages/term-conditions`}>Terms</a><a href={`${shopOrigin}/pages/disclaimer`}>Disclaimer</a></div><div className="social-links"><a href="https://www.facebook.com/thebodywedge" aria-label="The Body Wedge on Facebook">Facebook</a><a href="https://www.instagram.com/thebodywedge/" aria-label="The Body Wedge on Instagram">Instagram</a><a href="https://www.youtube.com/channel/UC0aJpDyaXgirS2wCm3NxjIg" aria-label="The Body Wedge on YouTube">YouTube</a><button className="motion-toggle" onClick={toggleMotion} aria-pressed={!paused}>{paused ? <Play size={12}/> : <Pause size={12}/>}Motion {paused ? "off" : "on"}</button></div></div>
    </footer>
  </div></MotionContext.Provider>;
}

export function Action({ children, href, light = false, outline = false }: { children: ReactNode; href: string; light?: boolean; outline?: boolean }) {
  return <Link href={href} className={`button ${light ? "button-light" : ""} ${outline ? "button-outline" : ""}`}><span>{children}</span><ArrowUpRight size={19}/></Link>;
}

export function VideoButton({ id = "Te2u5TU-HfQ", title = "Meet The Body Wedge", children, className = "watch-button" }: { id?: string; title?: string; children?: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className={className}>{children || <><span className="play-circle"><Play size={15} fill="currentColor"/></span>See it in action</>}</button></DialogTrigger><DialogContent className="video-dialog"><DialogTitle>{title}</DialogTitle><DialogDescription>Original instructional video from The Body Wedge video library.</DialogDescription>{open && <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>}<a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="video-fallback">Watch on YouTube <ArrowUpRight size={15}/></a></DialogContent></Dialog>;
}

function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const { paused } = useContext(MotionContext);
  useEffect(() => {
    if (paused) { stage.current?.style.setProperty("--parallax", "0px"); return; }
    let frame = 0;
    const scroll = () => { if (!frame) frame = requestAnimationFrame(() => { stage.current?.style.setProperty("--parallax", `${Math.min(window.scrollY * .13, 110)}px`); frame = 0; }); };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, [paused]);
  return <section className="hero" ref={stage}>
    <div className="hero-topline"><span>THE PATENTED TOOL FOR ABDOMINAL SELF-MASSAGE</span><span>THE BODY WEDGE / DESIGNED AROUND YOU</span></div>
    <div className="hero-layout"><div className="hero-copy"><h1><span className="hero-line">DEEP CORE.</span><span className="hero-line"><em>DAILY CARE.</em></span></h1><p>The Body Wedge is a patented self-massage tool designed to target the psoas and deep abdominal muscles. A distinctive shape. A more focused way to make core care part of your day.</p><div className="hero-actions"><Action href="/products/the-body-wedge">Shop Now — from $40 USD</Action><VideoButton title="How The Body Wedge works"/></div><p className="hero-shopping-note">Size &amp; density options · Instructions included · Buy direct</p></div>
      <div className="hero-stage" onPointerMove={e => { if (paused || e.pointerType === "touch") return; const r=e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--tilt-x", `${(e.clientY-r.top-r.height/2)/r.height*-4}deg`); e.currentTarget.style.setProperty("--tilt-y", `${(e.clientX-r.left-r.width/2)/r.width*5}deg`); }} onPointerLeave={e => { e.currentTarget.style.setProperty("--tilt-x", "0deg"); e.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>
        <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
        <div className="hero-art"><img src={`${A}black-original.png`} alt="The Body Wedge’s original patented shape, with raised contact points and a curved rocker base" width="639" height="723" fetchPriority="high"/></div>
        <div className="hero-annotation annotation-top"><span className="annotation-tick"/><span>PATENTED FORM.<br/>PERSONAL FEEL.</span></div>
        <div className="hero-annotation annotation-bottom"><span className="annotation-cross">+</span><div><strong>2.65<span>oz</span></strong><span>LIGHT ON WEIGHT.<br/>BIG ON INTENTION.</span></div></div>
        <span className="stage-caption">THE BODY WEDGE / BLACK EDITION</span>
      </div>
    </div>
    <div className="hero-bottom"><a href="#discover" className="scroll-cue"><span><ArrowDown size={16}/></span>What makes it different?</a><span className="hero-signature">PSOAS · ABDOMINAL CORE · HIP / BACK CONNECTION</span></div>
  </section>;
}

function Marquee() { return <div className="marquee" aria-label="Release. Reset. Reconnect."><div className="marquee-track" aria-hidden="true">{[0,1,2,3].map(n => <span key={n}>RELEASE.<i>✳</i>RESET.<i>✳</i>RECONNECT.<i>✳</i></span>)}</div></div>; }

const featureData = [
  { title: "Hand-inspired contours.", subtitle: "A shape with purpose.", body: "Purposeful contours echo the fingertips and palm of a massage therapist, bringing a different approach to self-massage.", label: "HAND-INSPIRED CONTACT POINTS", icon: Fingerprint },
  { title: "A gentle rocker base.", subtitle: "Designed for focused contact.", body: "The curved rocker base allows gentle movement, while multiple contact points give you different ways to work with the tool.", label: "CURVED ROCKER BASE", icon: RotateCcw },
  { title: "Lightweight. Durable.", subtitle: "Core care that travels.", body: "Dense, lightweight foam keeps its shape. At just 2.65 ounces, the Body Wedge fits into the everyday, wherever you go.", label: "DENSE, LIGHTWEIGHT FOAM", icon: Feather },
];
function FeatureSection() {
  const [tab,setTab]=useState("0");
  return <section id="discover" className="feature-section section-pad"><div className="section-top" data-reveal><span className="eyebrow">01 / THE DIFFERENCE IS IN THE DETAILS</span><span className="section-note">THOUGHTFULLY SHAPED. BEAUTIFULLY SIMPLE.</span></div><div className="feature-heading" data-reveal><h2>Purposeful shape.<br/><span>Focused self-massage.</span></h2><div className="feature-positioning"><p>Hand-inspired contact points and a curved base set the Wedge apart from a foam roller, massage ball, or back stretcher. It’s designed specifically for abdominal self-massage, including the psoas.</p><p className="psoas-intro"><strong>New to the psoas?</strong> Pronounced “SO-as,” it connects your lower spine to your thigh bone and helps move your hips. <Link href="/about#understand-your-core">Understand your core <ArrowUpRight size={14}/></Link></p></div></div>
    <Tabs value={tab} onValueChange={setTab} className="feature-tabs"><TabsList className="feature-tab-list">{featureData.map((f,i) => <TabsTrigger key={f.title} value={String(i)} className="feature-trigger"><span>0{i+1}</span><strong>{f.title}</strong><Plus size={20}/></TabsTrigger>)}</TabsList><div className="feature-display" data-reveal><div className={`feature-product feature-angle-${tab}`}><span className="feature-word" aria-hidden="true">INTENTIONAL.</span><img src={`${A}black-original.png`} alt="Body Wedge showing its distinctive contours and curved base" width="639" height="723" loading="lazy"/><div className="measurement"><span/><i>FORM MEETS FUNCTION</i><span/></div></div><div className="feature-detail">{featureData.map((f,i)=><TabsContent key={f.title} value={String(i)} className="feature-panel"><f.icon size={34} strokeWidth={1.25}/><span className="eyebrow">{f.label}</span><h3>{f.subtitle}</h3><p>{f.body}</p><Link className="text-link" href="/products/the-body-wedge">Get to know your Wedge <ArrowUpRight size={18}/></Link></TabsContent>)}</div></div></Tabs>
  </section>;
}

function RitualSection() { return <section className="ritual-section section-pad"><div className="ritual-copy" data-reveal><span className="eyebrow">SEE THE ORIGINAL DEMONSTRATION</span><h2>Know the tool.<br/><span>Learn the technique.</span></h2><p>See how the Wedge is positioned and used before making it part of your routine.</p><div className="ritual-step"><span>01</span><div><h3>Get to know your Wedge.</h3><p>Start with the original how-to video and the instructions included with your tool.</p></div></div><div className="ritual-step"><span>02</span><div><h3>Understand placement.</h3><p>Watch the original demonstration for orientation and technique. Follow the instructions included with your Wedge.</p></div></div><div className="ritual-step"><span>03</span><div><h3>Choose your next step.</h3><p>Compare sizes and densities, and ask the team if you need help choosing.</p></div></div><Action href="/learn" outline>Watch all videos</Action></div><div className="ritual-visual" data-reveal><div className="ritual-photo"><img src={`${A}use-original.jpg`} alt="An original Body Wedge demonstration showing the tool in use on a mat" width="1280" height="720" loading="lazy"/><VideoButton className="large-play"><span className="play-circle"><Play fill="currentColor" size={24}/></span><span>WATCH THE ORIGINAL DEMONSTRATION</span></VideoButton></div><div className="ritual-caption"><span>PRESS PAUSE.<br/>COME BACK TO YOU.</span><MoveUpRight size={44} strokeWidth={1}/></div><p className="small-note">Follow the product instructions. Have a health condition or unsure if the Wedge is right for you? Speak with a qualified healthcare professional before use.</p></div></section>; }

const productInfo = [
  { name: "The original Wedge", kicker: "YOUR EVERYDAY ESSENTIAL", image: "black-original.png", copy: "The patented original. Three sizes, with Dense and selected Extra Firm options.", price: "From $40", type: "single" },
  { name: "Better together", kicker: "THE TWO-WEDGE SET", image: "blue-original.png", copy: "A two-Wedge set. Check the available options or ask about a mixed-size pair.", price: "$75", type: "pair" },
  { name: "The complete toolkit", kicker: "THE BODY WEDGE KIT", image: "kit-original.png", copy: "The Wedge plus additional self-massage tools. Currently sold out.", price: "$90", type: "kit" },
];
export function ProductGrid() { return <div className="product-grid">{productInfo.map((p,i)=><Link className="product-card" href={`/products/${products[i].handle}`} key={p.name} data-reveal><div className={`product-card-visual ${p.type}`}><span className="product-tag">{i===2?"CURRENTLY SOLD OUT":i===0?"THE ORIGINAL":"DOUBLE UP"}</span><img src={`${A}${p.image}`} alt={p.name} width={600} height={650} loading="lazy"/>{i===1&&<img className="pair-second" src={`${A}red-original.png`} alt="" width={600} height={650} loading="lazy"/>}<span className="product-arrow"><ArrowUpRight size={24}/></span></div><div className="product-card-details"><span className="eyebrow">{p.kicker}</span><div><h3>{p.name}</h3><span>{p.price}</span></div><p>{p.copy}</p></div></Link>)}</div>; }
function CollectionSection() {return <section className="collection-section section-pad"><div className="section-top" data-reveal><span className="eyebrow">03 / FIND YOUR EVERYDAY ESSENTIAL</span></div><div className="collection-heading" data-reveal><h2>Your body.<br/><span>Your Wedge.</span></h2><Link className="text-link" href="/shop">Shop Now <ArrowUpRight size={18}/></Link></div><ProductGrid/></section>;}

export const faqs = [
  {q:"What is the Body Wedge?",a:"The Body Wedge is a patented, lightweight foam self-massage tool. Its hand-inspired contours and curved rocker base are designed for targeted work around the abdominal and core muscles, including the psoas."},
  {q:"How do I choose the right Wedge?",a:"The original Wedge is available in Black (L/XL), Red (L), and Blue (S/M), with Dense and selected Extra Firm options. Use the original size guide on the product page, or contact the team for help choosing."},
  {q:"Where can I learn how to use it?",a:"Start with the original Body Wedge demonstration in our video library and the instructions included with the product. The library also includes videos about the psoas, mobility, and self-massage."},
  {q:"Is the Body Wedge suitable for everyone?",a:"No. The original product guidance identifies reasons not to use the Body Wedge, including pregnancy, hernias, aneurysms, certain abdominal conditions, and recovery from some surgeries. Review the full guidance and consult a qualified healthcare professional before use if you have a health condition or are unsure."},
  {q:"What comes in the complete kit?",a:"The kit includes one Body Wedge with a manual, a foam block, a small yoga mat, a knotted rope, a foam roller, a golf ball, a tennis ball, a lacrosse ball, an 11-inch softball, a rubber baseball, a mini basketball, and an air pin. The kit is currently listed as sold out."},
  {q:"Where will I complete my purchase?",a:"Buy Now takes your selected Wedge and quantity directly to TheBodyWedge.com’s Shopify checkout. Shipping, taxes, and final availability are confirmed there. The Body Wedge handles your order and support."},
  {q:"Do you ship to my country?",a:"Available delivery destinations and shipping rates are confirmed at checkout. Contact the team before ordering if your country is not listed. No international shipping or fulfillment option is guaranteed here."},
  {q:"Do you offer practitioner or wholesale purchasing?",a:"Practitioners and clinics can submit an inquiry about product education, quantities, and purchasing options. The team will confirm pricing and eligibility; submitting an inquiry does not create a wholesale account."},
  {q:"How can I reach the team?",a:"Email info@thebodywedge.com or call (855) 933-4363. The Body Wedge team is based in Chicago, Illinois."},
];
export function FAQList({short=false}: {short?:boolean}) {return <Accordion type="single" collapsible className="faq-list">{(short?faqs.slice(0,4):faqs).map((f,i)=><AccordionItem value={String(i)} key={f.q}><AccordionTrigger className="faq-question"><span className="faq-number">0{i+1}</span>{f.q}</AccordionTrigger><AccordionContent className="faq-answer">{f.a}{i===3&&<> <a href={`${shopOrigin}/pages/disclaimer`}>Read the full product disclaimer.</a></>}</AccordionContent></AccordionItem>)}</Accordion>;}
function FAQSection() {return <section className="faq-section section-pad"><div data-reveal><span className="eyebrow">04 / A LITTLE CLARITY</span><h2>Good<br/><span>questions.</span></h2><Link href="/faq" className="text-link">All your questions, answered <ArrowUpRight size={18}/></Link></div><div data-reveal><FAQList short/></div></section>;}
export function FinalCTA() {return <section className="final-cta section-pad"><div className="cta-orbits" aria-hidden="true"><span/><span/><span/></div><span className="eyebrow" data-reveal>LESS AUTO-PILOT. MORE YOU.</span><h2 data-reveal>RECLAIM<br/>YOUR <em>RHYTHM.</em></h2><Action href="/shop">Meet your new daily ritual</Action><span className="cta-footnote">THE BODY WEDGE. MADE FOR A LIFE IN MOTION.</span></section>;}
export function HomePage() {return <SiteShell><main id="main"><Hero/><BuyerContexts/><FeatureSection/><RitualSection/><CollectionSection/><BuyDirect/><CustomerVoices/><PractitionerStrip/><NewsletterSection/><FAQSection/></main></SiteShell>;}
