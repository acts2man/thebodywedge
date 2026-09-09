"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Feather, Fingerprint, Layers3, Minus, Plus, Play } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SiteShell, VideoButton, FAQList } from "@/components/bodywedge";
import { BuyDirect, CoreEducation, CustomerVoices } from "@/components/bodywedge-phase1";
import { products } from "@/lib/catalog";
import { checkoutUrl, SHOP_ORIGIN } from "@/lib/commerce";

function SizeGuide(){return <Dialog><DialogTrigger asChild><button className="size-guide-button">View size guide</button></DialogTrigger><DialogContent className="size-dialog"><DialogTitle>Find your fit</DialogTitle><DialogDescription>Compare The Body Wedge’s original sizing guidance. Ask the team if you’re unsure.</DialogDescription><img src="/assets/size-guide.png" alt="The original Body Wedge size chart" width="480" height="480"/><Link className="text-link" href="/contact">Help me choose <ArrowUpRight size={17}/></Link></DialogContent></Dialog>;}

export function ProductPage({handle}:{handle:string}){
  const product=products.find(p=>p.handle===handle)||products[0];
  const [variantId,setVariantId]=useState<string>(String(product.variants[0].id));
  const [quantity,setQuantity]=useState(1),[view,setView]=useState<"front"|"shape">("front");
  const variant=product.variants.find(v=>String(v.id)===variantId)||product.variants[0];
  const isKit=handle.includes("kit"),isPair=handle.includes("2-of");
  const color=variant.title.startsWith("Red")?"red":variant.title.startsWith("Blue")?"blue":"black";
  const front=isKit?"kit-original.png":color==="black"?"black-current.png":variant.title.includes("Extra")?`${color}-extra-firm.png`:`${color}-current.jpg`;
  const shape=isKit?front:`${color}-original.png`;
  const image=view==="shape"?shape:front;
  const total=(variant.price*quantity).toFixed(2),buyUrl=checkoutUrl(variant.id,quantity);
  const summary=isKit?"The original Body Wedge and a collection of complementary self-massage tools. Explore a broader range of options for your daily routine.":isPair?"Two original Body Wedges for shared routines or a second place to practice. Each has the same patented contours and curved rocker base.":"Purposeful contours for focused abdominal self-massage. Designed to target the psoas and deep core, with hand-inspired contact points and a gently curved rocker base.";
  function chooseVariant(id:string){setVariantId(id);setView("front");}
  const renderGallery=(className:string)=><div className={`product-gallery ${className}`}>
    <div className={`product-detail-art ${isKit?"kit":isPair?"pair":"single"}`}><span className="gallery-label">ORIGINAL BODY WEDGE / {view==="shape"?"THE PATENTED FORM":"PRODUCT DETAIL"}</span><img key={image} src={`/assets/${image}`} alt={`${product.title}, ${variant.title}${view==="shape"?", side profile":""}`} width="1024" height="1536" fetchPriority="high"/>{isPair&&<img className="second-wedge" src={`/assets/${image}`} alt="Second Wedge in the set" width="1024" height="1536"/>}</div>
    <div className="product-gallery-controls"><div className="product-thumbnails"><button aria-label="View product front" aria-pressed={view==="front"} onClick={()=>setView("front")}><img src={`/assets/${front}`} alt="" width="64" height="64"/></button>{!isKit&&<button aria-label="View patented shape" aria-pressed={view==="shape"} onClick={()=>setView("shape")}><img src={`/assets/${shape}`} alt="" width="64" height="64"/></button>}</div><VideoButton title="See how The Body Wedge is used" className="product-demo-link"><Play size={16}/><span>Watch the demonstration</span></VideoButton></div>
    <div className="product-education-note"><span className="eyebrow">KNOW YOUR TOOL BEFORE YOU BEGIN</span><p>Watch the original technique, read the included instructions, and review the <a href={`${SHOP_ORIGIN}/pages/disclaimer`}>product safety guidance</a>. Ask a qualified healthcare professional if you’re unsure whether abdominal self-massage is appropriate for you.</p></div>
  </div>;
  return <SiteShell><main id="main" className="phase-product-page">
    <div className="product-breadcrumbs light-surface"><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/shop">Shop</Link><span>/</span><span>{product.title}</span></div></div>
    <section className="product-detail" aria-labelledby="product-title">
      {renderGallery("desktop-flow-image-600")}
      <div className="product-details" id="choose-your-wedge">
        <span className="eyebrow">PATENTED PSOAS &amp; CORE SELF-MASSAGE</span><h1 id="product-title">{product.title}</h1>
        <div className="mobile-flow-image mobile-flow-image-600">{renderGallery("product-gallery-mobile")}</div>
        <div className="product-price" aria-live="polite">${variant.price.toFixed(2)} <span>USD{isPair?" / SET":""}</span></div><p className="product-summary">{summary}</p>
        <ul className="product-quick-points"><li><Check size={16}/>Original patented design</li><li><Check size={16}/>Product instructions included</li><li><Check size={16}/>Order directly from The Body Wedge</li></ul>
        <div className="variant-label"><span id="variant-label">Choose size &amp; density</span><SizeGuide/></div>
        <RadioGroup value={variantId} onValueChange={chooseVariant} aria-labelledby="variant-label" className="variant-options">{product.variants.map(v=><label className={`variant-option ${String(v.id)===variantId?"selected":""} ${!v.available?"unavailable":""}`} key={v.id} htmlFor={`variant-${v.id}`}><RadioGroupItem id={`variant-${v.id}`} value={String(v.id)}/><i className="variant-swatch" style={{background:v.title.startsWith("Red")?"#bc3f48":v.title.startsWith("Blue")?"#3c65b5":"#262b26"}}/><span>{v.title}</span><span>{v.available?`$${v.price.toFixed(0)}`:"Sold out"}</span></label>)}</RadioGroup>
        <p className="density-note">Size and firmness are separate choices. Extra Firm has a firmer feel; use the size guide and product instructions to choose. <Link href="/contact">Need a hand?</Link></p>
        {variant.available?<><div className="purchase-quantity"><label htmlFor="purchase-quantity">Quantity{isPair?" (sets)":""}</label><div><button type="button" aria-label="Decrease quantity" disabled={quantity<=1} onClick={()=>setQuantity(q=>Math.max(1,q-1))}><Minus size={17}/></button><input id="purchase-quantity" type="number" min="1" max="20" step="1" value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(20,Math.trunc(Number(e.target.value))||1)))}/><button type="button" aria-label="Increase quantity" disabled={quantity>=20} onClick={()=>setQuantity(q=>Math.min(20,q+1))}><Plus size={17}/></button></div></div><a className="button purchase-link" href={buyUrl}><span>Buy Now — ${total}</span><ArrowUpRight size={20}/></a></>:<><button className="button sold-out-button" disabled>Currently sold out</button><Link className="text-link" href="/contact">Ask about availability <ArrowUpRight size={17}/></Link></>}
        <p className="purchase-note">Secure checkout at TheBodyWedge.com. Prices are USD. Shipping, taxes, and final availability are confirmed at checkout.{isPair&&" For a mixed-size pair, confirm both choices with the team before ordering."}</p>
        <div className="purchase-policy-links"><a href={`${SHOP_ORIGIN}/pages/refund-policy`}>Returns policy</a><Link href="/contact">Product &amp; order help</Link></div>
        <div className="product-detail-specs"><span><Fingerprint size={18}/>Hand-inspired contours</span><span><Feather size={18}/>Lightweight foam</span><span><Layers3 size={18}/>Curved rocker base</span><span><Check size={18}/>Video education</span></div>
        <div className="product-extra"><h2>{isKit?"Inside the kit":"What’s included"}</h2>{isKit?<ul><li>One Body Wedge with manual</li><li>Foam block, small yoga mat, knotted rope, and foam roller</li><li>Golf, tennis, lacrosse, softball, and rubber baseball</li><li>Mini basketball and air pin</li></ul>:<p>{isPair?"Two Body Wedges in your selected option, with instructions.":"One Body Wedge in your selected size and density, with instructions."} Explore the <Link href="/learn">free video library</Link> for product education.</p>}</div>
        <div className="product-extra"><h2>Before you begin</h2><p>The Body Wedge supports self-massage and body awareness. It is not a treatment or cure, and abdominal self-massage is not suitable for everyone. Follow the <a href={`${SHOP_ORIGIN}/pages/disclaimer`}>full product safety guidance</a>.</p></div>
      </div>
    </section>
    <BuyDirect/><CustomerVoices/><CoreEducation compact/>
    <section className="faq-section section-pad"><div><span className="eyebrow">BUY WITH A LITTLE MORE CLARITY</span><h2>Good<br/><span>questions.</span></h2><Link href="/practitioners" className="text-link">Buying for a practice? <ArrowUpRight size={17}/></Link></div><FAQList short/></section>
    {variant.available&&<div className="mobile-buy-bar"><div><strong>${total} <small>USD</small></strong><span>{quantity} × {variant.title}</span></div><a href={buyUrl} className="button"><span>Buy Now</span><ArrowUpRight size={18}/></a></div>}
  </main></SiteShell>;
}
