"use client";

import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  availableDensities, availableSizes, densityInfo, findOption, sizeInfo, sizeOrder,
  type DensityKey, type SizeKey, type WedgeOption,
} from "@/lib/wedge-options";

export function SizeGuide() {
  return <Dialog><DialogTrigger asChild><button className="size-guide-button">View size guide</button></DialogTrigger>
    <DialogContent className="size-dialog">
      <DialogTitle>Two choices, in order</DialogTitle>
      <DialogDescription>Step 1 is your size, and the colour tells you which is which. Step 2 is how firm the foam is.</DialogDescription>
      <ol className="size-dialog-steps">
        <li><span className="size-dialog-step">1</span><div><strong>Choose your size by height.</strong>
          <ul>{sizeOrder.map(key =>
            <li key={key}><i style={{ background: sizeInfo[key].swatch }}/><b>{sizeInfo[key].name}</b> — {sizeInfo[key].height} · {sizeInfo[key].torso.toLowerCase()}</li>)}
          </ul></div></li>
        <li><span className="size-dialog-step">2</span><div><strong>Choose your density by weight.</strong>
          <ul className="size-dialog-density">
            <li><b>Standard</b> — the original dense foam, up to a 250 lb weight limit.</li>
            <li><b>Extra Firm</b> — more supportive foam, ideal for 250 lbs and above.</li>
          </ul></div></li>
      </ol>
      <img src="/assets/size-guide.png" alt="The original Body Wedge size chart, comparing the Small/Medium, Medium/Large and X-Large wedges" width="480" height="480"/>
      <Link className="text-link" href="/contact">Still unsure? Ask the team <ArrowUpRight size={17}/></Link>
    </DialogContent>
  </Dialog>;
}

export function WedgeSelector({ options, size, density, onSize, onDensity }: {
  options: WedgeOption[];
  size: SizeKey;
  density: DensityKey;
  onSize: (size: SizeKey) => void;
  onDensity: (density: DensityKey) => void;
}) {
  const sizes = availableSizes(options), densities = availableDensities(options);
  const selected = findOption(options, size, density);
  const soldOutSize = (key: SizeKey) => options.filter(o => o.size === key).every(o => !o.available);

  return <div className="wedge-selector">
    <section className="selector-step" aria-labelledby="step-size">
      <div className="step-head">
        <span className="step-number">1</span>
        <div><h2 id="step-size">Choose your size</h2><p>The colour is the size. Go by your height and how long your torso is.</p></div>
        <SizeGuide/>
      </div>
      <RadioGroup value={size} onValueChange={value => onSize(value as SizeKey)} aria-labelledby="step-size" className="size-options">
        {sizes.map(key => { const info = sizeInfo[key]; const active = key === size; return (
          <label key={key} htmlFor={`size-${key}`} data-size={key} className={`size-option ${active ? "selected" : ""} ${soldOutSize(key) ? "unavailable" : ""}`}>
            <RadioGroupItem id={`size-${key}`} value={key} className="sr-only-control"/>
            <span className="size-option-art" style={{ ["--swatch" as string]: info.swatch }}>
              <img src={`/assets/${info.image}`} alt="" width="220" height="250" loading="lazy"/>
            </span>
            <span className="size-option-copy">
              <span className="size-option-title"><i className="size-dot" style={{ background: info.swatch }}/>{info.name}</span>
              <span className="size-option-height">{info.height}</span>
              <span className="size-option-torso">{info.torso}</span>
            </span>
            <span className="size-option-state">{soldOutSize(key) ? "Sold out" : active ? <><Check size={15}/>Selected</> : "Select"}</span>
          </label>
        ); })}
      </RadioGroup>
    </section>

    <section className="selector-step" aria-labelledby="step-density">
      <div className="step-head">
        <span className="step-number">2</span>
        <div><h2 id="step-density">Choose your density</h2><p>Same shape, same size. Extra Firm is the more supportive foam.</p></div>
      </div>
      <RadioGroup value={density} onValueChange={value => onDensity(value as DensityKey)} aria-labelledby="step-density" className="density-options">
        {densities.map(key => { const info = densityInfo[key]; const option = findOption(options, size, key); const active = key === density; return (
          <label key={key} htmlFor={`density-${key}`} className={`density-option ${active ? "selected" : ""} ${!option ? "unavailable" : ""}`}>
            <RadioGroupItem id={`density-${key}`} value={key} disabled={!option} className="sr-only-control"/>
            <span className="density-option-head"><strong>{info.name}</strong><span>{option ? `$${option.price.toFixed(0)}` : "—"}</span></span>
            <span className="density-option-foam">{info.foam}</span>
            <span className="density-option-weight">{info.weight}</span>
            <span className="density-option-detail">{option ? info.detail : `Not offered in ${sizeInfo[size].name} yet. Available in ${sizeOptionsWithDensity(options, key).map(k => sizeInfo[k].name).join(" and ")}.`}</span>
            {option && !option.available && <span className="density-option-tag">Sold out</span>}
          </label>
        ); })}
      </RadioGroup>
      <p className="density-note">The 250 lb weight limit applies to the standard wedges. If you&rsquo;re at or above it, start with Extra Firm. <Link href="/contact">Need a hand?</Link></p>
    </section>

    <p className="selector-summary" aria-live="polite">
      <span className="eyebrow">YOUR WEDGE</span>
      <span className="selector-summary-line">
        <i className="size-dot" style={{ background: sizeInfo[size].swatch }}/>
        <strong>{sizeInfo[size].name}</strong><span className="sep">·</span><strong>{densityInfo[density].name}</strong>
        {selected && <span className="selector-summary-price">${selected.price.toFixed(2)}</span>}
      </span>
      <span className="selector-summary-note"><Info size={14}/>Ships as &ldquo;{selected?.title || `${sizeInfo[size].name} ${densityInfo[density].name}`}&rdquo; — the original product name.</span>
    </p>
  </div>;
}

function sizeOptionsWithDensity(options: WedgeOption[], density: DensityKey) {
  return availableSizes(options.filter(o => o.density === density));
}
