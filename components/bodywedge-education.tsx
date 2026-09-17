"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * Side view of the lower trunk: lumbar spine, pelvis, femur and the psoas running
 * between them. The point of the drawing is the crossing — the muscle starts at the
 * back (spine) and ends at the front-ish of the thigh, so the front is the side you
 * can actually reach it from.
 */
export function PsoasDiagram({ className = "" }: { className?: string }) {
  return <svg className={`psoas-diagram ${className}`} viewBox="104 12 312 502" role="img" aria-labelledby="psoas-diagram-title psoas-diagram-desc" focusable="false">
    <title id="psoas-diagram-title">Side view of the psoas muscle</title>
    <desc id="psoas-diagram-desc">A side view of the lower torso showing the psoas running from the lumbar spine, forward across the pelvis, to the top of the thigh bone. Point 1 marks the front of the abdomen, where the Body Wedge is used. Points 2 and 3 mark the lower back and hip, where tension is often noticed.</desc>
    <defs>
      <linearGradient id="psoas-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5f92ef"/><stop offset="55%" stopColor="#2e63d2"/><stop offset="100%" stopColor="#1f4aa6"/>
      </linearGradient>
      <linearGradient id="psoas-skin" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#dee6f2"/><stop offset="100%" stopColor="#eef3fa"/>
      </linearGradient>
    </defs>

    {/* orientation */}
    <g className="diagram-axis">
      <text x="164" y="35" textAnchor="start">BACK</text>
      <text x="360" y="35" textAnchor="end">FRONT</text>
      <path d="M154 30 H118"/><path d="M114 30 l9 -5 v10 z" className="axis-head"/>
      <path d="M370 30 H406"/><path d="M410 30 l-9 -5 v10 z" className="axis-head"/>
    </g>

    {/* trunk in profile, lower ribs to mid thigh: hollow at the waist, buttock behind,
        belly in front */}
    <path className="diagram-body" d="M160 62 L348 62 C364 108 366 148 360 196 C356 236 352 268 340 296 C328 322 318 336 306 352 C312 392 314 444 312 502 L188 502 C186 452 180 414 168 386 C146 356 138 330 142 302 C148 268 168 238 172 200 C176 156 168 106 160 62 Z"/>

    {/* lumbar spine: lordotic curve, vertebral bodies forward, spinous processes behind */}
    <g className="diagram-bone">
      <g transform="rotate(-6 220 100)"><rect x="200" y="86" width="42" height="28" rx="8"/><path d="M200 92 L168 84 L166 102 L200 108 Z"/></g>
      <g transform="rotate(-2 226 140)"><rect x="206" y="126" width="42" height="28" rx="8"/><path d="M206 132 L174 124 L172 142 L206 148 Z"/></g>
      <g transform="rotate(2 230 180)"><rect x="210" y="166" width="42" height="28" rx="8"/><path d="M210 172 L178 164 L176 182 L210 188 Z"/></g>
      <g transform="rotate(7 226 220)"><rect x="206" y="206" width="42" height="28" rx="8"/><path d="M206 212 L174 204 L172 222 L206 228 Z"/></g>
      <g transform="rotate(12 218 260)"><rect x="198" y="246" width="42" height="28" rx="8"/><path d="M198 252 L166 244 L164 262 L198 268 Z"/></g>
      {/* sacrum and coccyx */}
      <path d="M196 278 L238 288 L224 360 L184 342 Z"/>
      {/* innominate: iliac blade, pubic ramus, ischium */}
      <path d="M202 298 C200 246 244 224 296 240 C324 250 328 296 314 326 C302 350 268 362 244 354 C216 346 202 328 202 298 Z"/>
      <path d="M310 330 C322 342 324 362 316 374 L278 380 L272 356 Z"/>
      <path d="M244 358 C254 380 258 402 250 418 L224 412 C222 392 226 374 232 356 Z"/>
    </g>
    {/* femur: head, greater trochanter, shaft */}
    <g className="diagram-femur">
      <circle cx="262" cy="392" r="24"/>
      <path d="M238 382 C222 386 218 408 228 420 L254 414 Z"/>
      <path d="M250 412 C262 410 278 416 282 430 C292 468 296 494 298 502 L256 502 C252 472 248 442 240 420 Z"/>
    </g>

    {/* psoas major: down the front of the lumbar bodies, across the pelvic brim,
        then back to the lesser trochanter — it crosses the body to get there */}
    <path className="diagram-psoas" d="M236 96 C250 150 262 212 270 266 C276 306 278 338 275 362 C272 386 265 404 254 414 L244 402 C253 394 258 380 258 358 C258 328 252 288 243 244 C234 194 226 140 222 98 Z"/>
    <path className="diagram-psoas-fiber" d="M231 108 C245 160 256 216 263 266 C269 304 271 334 268 358"/>
    <path className="diagram-psoas-fiber" d="M226 106 C238 158 246 210 252 258 C257 294 259 326 257 352"/>
    {/* iliacus, sharing the same tendon */}
    <path className="diagram-iliacus" d="M248 282 C268 270 290 276 297 296 C302 316 290 336 271 344 C264 326 256 306 248 282 Z"/>

    {/* 1 — the front of the abdomen: where the Wedge works */}
    <path className="diagram-lead" d="M316 252 C302 262 292 268 282 272"/>
    <path className="diagram-lead-head" d="M274 275 l14 -8 l-2 12 z"/>
    <circle className="diagram-marker-front" cx="332" cy="248" r="22"/>
    <text className="diagram-marker-text" x="332" y="255" textAnchor="middle">1</text>

    {/* 2 — lower back, 3 — hip: where it is commonly noticed */}
    <circle className="diagram-marker-felt" cx="168" cy="228" r="20"/>
    <text className="diagram-marker-felt-text" x="168" y="235" textAnchor="middle">2</text>
    <circle className="diagram-marker-felt" cx="192" cy="368" r="20"/>
    <text className="diagram-marker-felt-text" x="192" y="375" textAnchor="middle">3</text>
  </svg>;
}

/** Standing vs seated: the same muscle, a much shorter distance to span. */
function HipFigure({ seated }: { seated: boolean }) {
  return <svg className="hip-figure" viewBox="0 0 200 276" role="img" aria-label={seated ? "A seated side view: the hip is closed and the psoas spans a short, folded distance" : "A standing side view: the hip is open and the psoas spans its full length"} focusable="false">
    {seated ? <>
      <rect className="hip-seat" x="72" y="150" width="110" height="13" rx="3"/>
      <rect className="hip-bone" x="72" y="30" width="34" height="90" rx="16"/>
      <rect className="hip-bone" x="86" y="118" width="84" height="26" rx="13"/>
      <rect className="hip-bone" x="146" y="136" width="24" height="84" rx="12"/>
      <circle className="hip-joint" cx="90" cy="130" r="19"/>
      <path className="hip-psoas" d="M98 44 C104 74 101 96 106 112 C111 126 119 132 128 136"/>
    </> : <>
      <rect className="hip-bone" x="83" y="30" width="34" height="90" rx="16"/>
      <rect className="hip-bone" x="90" y="126" width="26" height="86" rx="13"/>
      <rect className="hip-bone" x="94" y="206" width="24" height="64" rx="12"/>
      <circle className="hip-joint" cx="100" cy="130" r="19"/>
      <path className="hip-psoas" d="M109 44 C115 80 115 108 112 130 C111 141 110 148 108 154"/>
    </>}
  </svg>;
}

export function WorksFromTheFront({ compact = false }: { compact?: boolean }) {
  return <section className={`front-first section-pad ${compact ? "front-first-compact" : ""}`} id="works-from-the-front" aria-labelledby="front-first-heading">
    <div className="front-first-top" data-reveal>
      <span className="eyebrow">{compact ? "WHY THE FRONT?" : "01 / WHY YOU WORK FROM THE FRONT"}</span>
      <span className="section-note">THE PSOAS CROSSES FROM BACK TO FRONT</span>
    </div>

    <div className="front-first-lede" data-reveal>
      <h2 id="front-first-heading">Not another back stretcher.<br/><span>The Body Wedge works from the front.</span></h2>
      <div className="front-first-intro">
        <p>Most tools meet you at the back. You lie on them and press into the muscles you can already feel. The Body Wedge is built for the other side of the same structure.</p>
        <p>The psoas is the deepest muscle in your core. It starts at your lumbar spine, travels forward across the pelvis, and attaches to the top of your thigh bone. It crosses your body front to back — and the front of the abdomen is the only side you can reach it from.</p>
      </div>
    </div>

    <div className="front-first-anatomy" data-reveal>
      <figure className="anatomy-figure">
        <PsoasDiagram/>
        <figcaption>Psoas major in profile &mdash; spine to thigh bone.</figcaption>
      </figure>
      <ol className="anatomy-key">
        <li className="key-front"><span className="key-badge">1</span><div><h3>Where the Wedge works.</h3><p>The front. Lying face down over the Wedge, its hand-inspired contours reach in through the abdominal wall, along the line the psoas travels.</p></div></li>
        <li><span className="key-badge">2</span><div><h3>Where it&rsquo;s often noticed.</h3><p>The lower back. The psoas anchors to the lumbar vertebrae, so tension at the front is frequently felt behind.</p></div></li>
        <li><span className="key-badge">3</span><div><h3>And here.</h3><p>The hip. The muscle crosses the hip joint on its way to the thigh, which is why the two so often come up together.</p></div></li>
        <li className="key-note"><p>A foam roller rolls the surface. A back stretcher extends the spine. The Body Wedge is shaped for focused contact with the deep abdominal core.</p></li>
      </ol>
    </div>

    {!compact && <div className="front-first-chain" data-reveal>
      <div className="chain-heading"><span className="eyebrow">HOW IT GETS THAT WAY</span><h3>Movement builds it.<br/>Sitting shortens it.</h3></div>
      <div className="chain-figures">
        <figure><HipFigure seated={false}/><figcaption><strong>Standing &amp; walking</strong><span>Hip open. The psoas spans its full length.</span></figcaption></figure>
        <figure><HipFigure seated /><figcaption><strong>Sitting</strong><span>Hip closed. The same muscle, folded, for hours at a time.</span></figcaption></figure>
      </div>
      <ol className="chain-steps">
        <li><span>01</span><h4>We build it.</h4><p>Crawling, then standing, then walking. The psoas is how we first learn to lift a leg.</p></li>
        <li><span>02</span><h4>We move on it.</h4><p>Every step asks the psoas to draw the thigh and torso toward each other.</p></li>
        <li><span>03</span><h4>Then we sit.</h4><p>Desks, commutes, sofas. Careers ask for it, family life invites it — hours a day with the hip held closed.</p></li>
        <li><span>04</span><h4>We feel it elsewhere.</h4><p>The front stays short while the back and hips carry the difference. Which is usually where people start looking.</p></li>
      </ol>
      <p className="chain-close">So the Body Wedge starts where the chain starts. Front first.</p>
    </div>}

    <p className="front-first-note">This is education, not a diagnosis or a promise of relief. Abdominal self-massage is not right for everyone — learn the placement from the original demonstration and review the product safety guidance before you begin. <Link className="text-link" href="/learn">Watch the demonstration <ArrowUpRight size={14}/></Link></p>
  </section>;
}
