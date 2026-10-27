import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../content/site';
import { useLenis } from './SmoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenCv: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCv }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleLine1Ref = useRef<HTMLSpanElement | null>(null);
  const titleLine2Ref = useRef<HTMLSpanElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const pulseRef = useRef<HTMLDivElement | null>(null);
  const handNoteRef = useRef<HTMLDivElement | null>(null);
  const arrowSvgRef = useRef<SVGSVGElement | null>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line reveal timeline using house expo.out easing
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        [titleLine1Ref.current, titleLine2Ref.current],
        { y: '100%', opacity: 0, rotateX: -15 },
        { y: '0%', opacity: 1, rotateX: 0, stagger: 0.12, delay: 0.2 }
      );

      tl.fromTo(
        portraitRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.1 },
        '-=0.8'
      );

      tl.fromTo(
        handNoteRef.current,
        { opacity: 0, scale: 0.8, rotate: -12 },
        { opacity: 1, scale: 1, rotate: -6, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Animate hand-drawn arrow stroke
      if (arrowSvgRef.current) {
        const path = arrowSvgRef.current.querySelector('path');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: 'power2.inOut',
            delay: 1.1,
          });
        }
      }

      // Continuous animated glowing data pulse along the scroll wire
      if (pulseRef.current) {
        gsap.to(pulseRef.current, {
          y: 70,
          repeat: -1,
          duration: 1.8,
          ease: 'power1.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      data-debug="gsap: hero split"
    >
      {/* Top Node Tag */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-ink hairline-border font-mono text-[11px] uppercase tracking-widest text-mist">
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />
            <span className="text-signal font-semibold mr-1.5">// TRIGGER:01</span>
            <span>INITIALIZE_CAREER</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-mist/60">
            GRAPH_STATUS: ARMED &amp; READY
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-mist">
          <span className="h-1.5 w-1.5 rounded-full bg-phosphor shadow-phosphor-glow" />
          <span className="text-bone">SYSTEM OPERATIONAL</span>
        </div>
      </div>

      {/* Main Hero Grid (12-column layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Editorial Display Typography (7-8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Role Line in JetBrains Mono */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-6 bg-signal" />
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-signal font-semibold">
              {siteConfig.profile.title}
            </p>
          </div>

          {/* Colossal Name in Instrument Serif */}
          <div className="overflow-hidden">
            <h1 className="font-serif fluid-hero-name font-normal text-bone leading-[0.88] tracking-tight">
              <span ref={titleLine1Ref} className="block overflow-hidden">
                Ukemeobong
              </span>
              <span ref={titleLine2Ref} className="block italic text-bone/90 overflow-hidden">
                Uduak Umo-Udofia
              </span>
            </h1>
          </div>

          {/* Headline Positioning Statement */}
          <div className="pt-2 max-w-2xl space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-bone tracking-tight font-normal italic">
              “{siteConfig.positioning.headline}”
            </h2>
            <p className="font-sans text-sm sm:text-base text-mist leading-relaxed max-w-xl">
              {siteConfig.positioning.support}
            </p>
          </div>

          {/* Interactive Action Node Triggers */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('#about')}
              className="group relative flex items-center gap-3 rounded bg-signal px-6 py-3 font-mono text-xs font-semibold tracking-wider text-white shadow-signal-glow transition-all duration-300 hover:scale-[1.02] active:scale-95"
              data-cursor="cta"
            >
              <span className="node-port node-port-left !bg-white" />
              <span className="node-port node-port-right !bg-white" />
              <span>EXPLORE WORKFLOW</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>

            <button
              onClick={onOpenCv}
              className="group relative flex items-center gap-2.5 rounded bg-ink px-5 py-3 font-mono text-xs text-bone hairline-border transition-all duration-200 hover:border-white/30 hover:bg-white/[0.04]"
              data-cursor="cta"
            >
              <span className="text-signal">📄</span>
              <span>VIEW MY CV</span>
              <span className="text-[10px] text-mist group-hover:text-signal">↓</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-2 rounded bg-ink/40 hairline-border font-mono text-[11px] text-mist">
              <span>📍 {siteConfig.profile.location}</span>
              <span className="text-white/20">|</span>
              <span>{siteConfig.profile.yearsOfExperience} yrs exp</span>
            </div>
          </div>
        </div>

        {/* Right Column: Node-shaped Cutout Portrait with Handwritten Annotation */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
          {/* Handwritten Annotation in Caveat with Arrow */}
          <div
            ref={handNoteRef}
            className="absolute -top-12 -left-6 sm:-left-12 z-20 flex flex-col items-center pointer-events-none select-none"
          >
            <span className="font-hand text-2xl sm:text-3xl text-bone tracking-wide drop-shadow-md">
              hi, that's me
            </span>
            <svg
              ref={arrowSvgRef}
              className="w-14 h-12 text-signal -rotate-12 mt-1"
              viewBox="0 0 60 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 10 10 Q 35 15 45 40 M 35 38 L 45 40 L 48 28" />
            </svg>
          </div>

          {/* Node Cutout Portrait Box */}
          <div
            ref={portraitRef}
            className="group relative w-64 sm:w-72 lg:w-80 aspect-[4/5] rounded-[3px] bg-ink hairline-border p-2.5 crop-mark crop-mark-tl crop-mark-br shadow-2xl transition-all duration-500 hover:border-signal/50"
            data-debug="gsap: portrait node"
          >
            {/* 4 Node Ports on sides */}
            <span className="node-port node-port-top" />
            <span className="node-port node-port-bottom" />
            <span className="node-port node-port-left" />
            <span className="node-port node-port-right" />

            {/* Inner frame with Duotone to Color Image */}
            <div className="relative w-full h-full overflow-hidden rounded-[2px] bg-graphite">
              <img
                src={siteConfig.profile.avatar}
                alt={siteConfig.profile.fullName}
                onError={(e) => {
                  // Fallback to secondary photo if needed
                  const target = e.target as HTMLImageElement;
                  if (target.src !== siteConfig.profile.avatarFallback) {
                    target.src = siteConfig.profile.avatarFallback;
                  }
                }}
                className="w-full h-full object-cover object-[center_12%] filter grayscale contrast-110 sepia-[0.18] brightness-95 transition-all duration-700 ease-out group-hover:filter-none group-hover:scale-105"
              />

              {/* Engineering node scan line overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom tag inside portrait */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] text-bone/80 px-2 py-1 rounded bg-graphite/70 backdrop-blur-sm hairline-border">
                <span>ID: {siteConfig.profile.displayName.toUpperCase()}</span>
                <span className="text-signal">NODE_PRIMARY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue: Vertical Wire with Traveling Signal Pulse */}
      <div className="relative pt-8 flex flex-col items-center">
        <button
          onClick={() => scrollTo('#about')}
          className="group flex flex-col items-center gap-2 font-mono text-[11px] text-mist hover:text-signal transition-colors"
          data-cursor="cta"
        >
          <span className="tracking-widest uppercase">SCROLL TO EXECUTE</span>
          
          {/* Hairline SVG wire with animated pulse dot */}
          <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
            <div
              ref={pulseRef}
              className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-transparent via-signal to-transparent shadow-[0_0_8px_#FF4F1F]"
            />
          </div>
          <span className="text-xs transition-transform group-hover:translate-y-1">↓</span>
        </button>
      </div>
    </section>
  );
};
