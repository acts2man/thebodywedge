"use client";

export function HeroStage({ paused, mobile = false }: { paused: boolean; mobile?: boolean }) {
  return <div
    className={`hero-stage ${mobile ? "hero-stage-mobile" : "hero-stage-desktop desktop-flow-image-850"}`}
    onPointerMove={e => {
      if (paused || e.pointerType === "touch") return;
      const r=e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--tilt-x", `${(e.clientY-r.top-r.height/2)/r.height*-4}deg`);
      e.currentTarget.style.setProperty("--tilt-y", `${(e.clientX-r.left-r.width/2)/r.width*5}deg`);
    }}
    onPointerLeave={e => {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    }}
  >
    <div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/>
    <div className="hero-art"><img src="/assets/black-original.png" alt="The Body Wedge’s original patented shape, with raised contact points and a curved rocker base" width="639" height="723" fetchPriority="high"/></div>
    <div className="hero-annotation annotation-top"><span className="annotation-tick"/><span>PATENTED FORM.<br/>PERSONAL FEEL.</span></div>
    <div className="hero-annotation annotation-bottom"><span className="annotation-cross">+</span><div><strong>2.65<span>oz</span></strong><span>LIGHT ON WEIGHT.<br/>BIG ON INTENTION.</span></div></div>
    <span className="stage-caption">THE BODY WEDGE / BLACK EDITION</span>
  </div>;
}
