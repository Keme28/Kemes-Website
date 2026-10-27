import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../content/site';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bioContainerRef = useRef<HTMLDivElement | null>(null);
  const underlineRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const bioContainer = bioContainerRef.current;
    if (!section || !bioContainer) return;

    const ctx = gsap.context(() => {
      // 1. Background color scrub: Graphite (#0C0C0D) -> Bone (#EFEAE0)
      gsap.to(section, {
        backgroundColor: '#EFEAE0',
        color: '#0C0C0D',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 20%',
          scrub: 0.6,
        },
      });

      // 2. Word by word opacity scrub from 15% to 100%
      const wordElements = bioContainer.querySelectorAll('.scrub-word');
      if (wordElements.length > 0) {
        gsap.fromTo(
          wordElements,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: bioContainer,
              start: 'top 70%',
              end: 'bottom 65%',
              scrub: 0.5,
            },
          }
        );
      }

      // 3. Hand-drawn SVG underlines self-drawing on scroll
      underlineRefs.current.forEach((path) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: path,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Split bio text into paragraphs and words with markup for key phrases
  const paragraphs = [
    {
      text: "Hi! I’m Ukeme, a full-stack developer and AI automation specialist who got tired of doing boring and repetitive work (Why do I have to start checking my Gmail and respond when I'm trying to work on a website?).",
      highlight: "boring and repetitive work",
    },
    {
      text: "So I started building the systems that do it for me and for my websites too, and then I'm like, \"Hold on! Others could benefit from this too!\"",
      highlight: "systems that do it for me",
    },
    {
      text: "I design and ship web apps end-to-end. Then I automate everything around them: the forms that route themselves, the reports that write themselves, the follow-ups I have to create a reminder for? Most of my work lives in the gap between “this should be automatic” and “somehow it still isn’t.”",
      highlight: "this should be automatic",
    },
    {
      text: "I’m based in Lagos, I’ve been building for 2 years, and I care about work that is not system-reliant.",
      highlight: "not system-reliant",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      data-debug="gsap: bone scrub"
    >
      {/* Top Section Node Header */}
      <div className="mx-auto max-w-7xl border-b border-black/10 pb-4 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative rounded px-2.5 py-1 bg-black/5 border border-black/15 font-mono text-[11px] uppercase tracking-widest text-black/70">
            <span className="node-port node-port-left !bg-white !border-black/40" />
            <span className="node-port node-port-right !bg-white !border-black/40" />
            <span className="text-signal font-semibold mr-1.5">// NODE: ABOUT 02</span>
            <span>HUMAN_SPECIFICATION</span>
          </div>
          <span className="hidden sm:inline font-mono text-[11px] text-black/50">
            PAPER_MODE: CALIBRATED (BONE #EFEAE0)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-black/60">
          <span>PROPORTION: 70% HUMAN · 30% MACHINE</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Portrait + Engineering Spec Sheet (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
          {/* Portrait in Node-Shaped Frame */}
          <div className="relative w-full max-w-sm mx-auto lg:mx-0 rounded-[3px] bg-white/70 border border-black/15 p-2.5 shadow-xl crop-mark crop-mark-tl crop-mark-br group">
            {/* 4 Node Ports */}
            <span className="node-port node-port-top !bg-white !border-black/40" />
            <span className="node-port node-port-bottom !bg-white !border-black/40" />
            <span className="node-port node-port-left !bg-white !border-black/40" />
            <span className="node-port node-port-right !bg-white !border-black/40" />

            {/* Photo Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-black/10">
              <img
                src={siteConfig.profile.avatar}
                alt={siteConfig.profile.fullName}
                className="w-full h-full object-cover object-[center_12%] filter grayscale contrast-105 brightness-95 transition-all duration-700 ease-out group-hover:filter-none group-hover:scale-105"
              />

              {/* Monospace bottom label on photo */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] text-white px-2.5 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10">
                <span>SPEC // {siteConfig.profile.displayName.toUpperCase()}</span>
                <span className="text-signal font-semibold">VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Numbered Spec Sheet */}
          <div className="rounded-[3px] bg-white/60 border border-black/15 p-5 shadow-sm space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-black/10 pb-2">
              <span className="text-[10px] uppercase tracking-wider text-black/50 font-semibold">
                // SYSTEM TELEMETRY &amp; SPEC SHEET
              </span>
              <span className="text-[10px] text-signal font-bold">2026_INDEX</span>
            </div>

            <div className="divide-y divide-black/10">
              {siteConfig.bio.specSheet.map((spec) => (
                <div key={spec.index} className="py-2.5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-black/60 shrink-0">
                    <span className="text-signal font-bold">({spec.index})</span>
                    <span className="uppercase text-[11px]">{spec.label}</span>
                  </div>
                  <span className="text-right text-black/90 font-medium text-[11px] max-w-[240px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Handwritten Margin Note 1 */}
          <div className="flex items-center gap-2 font-hand text-2xl text-black/80 rotate-[-3deg] pl-2 select-none">
            <span className="text-signal text-xl">✎</span>
            <span>“Zero patience for busywork.”</span>
          </div>
        </div>

        {/* Right Column: Editorial Bio with Word Scrubbing (7 cols) */}
        <div ref={bioContainerRef} className="lg:col-span-7 space-y-10 lg:pl-6 relative">
          {/* Header of Bio */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-signal font-semibold">
              // CHAPTER 01: THE PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-black leading-[1.08]">
              Machines should execute.<br />
              <span className="italic text-black/80">Humans should invent &amp; decide.</span>
            </h2>
          </div>

          {/* Word Scrubbing Body */}
          <div className="space-y-8 font-sans text-lg sm:text-xl lg:text-2xl leading-relaxed text-black font-normal">
            {paragraphs.map((p, pIdx) => {
              const words = p.text.split(' ');
              return (
                <p key={pIdx} className="relative">
                  {words.map((word, wIdx) => {
                    const isKeyPhrase = p.highlight && word.toLowerCase().includes(p.highlight.split(' ')[0].toLowerCase());
                    return (
                      <span
                        key={wIdx}
                        className="scrub-word inline-block mr-[0.28em] transition-opacity duration-75"
                        style={{ opacity: 0.15 }}
                      >
                        {word}
                      </span>
                    );
                  })}

                  {/* Hand-drawn SVG underline on key highlight */}
                  {p.highlight && (
                    <span className="block mt-1">
                      <svg
                        className="w-48 sm:w-64 h-3 text-signal pointer-events-none"
                        viewBox="0 0 240 12"
                        fill="none"
                      >
                        <path
                          ref={(el) => (underlineRefs.current[pIdx] = el)}
                          d="M 2 8 Q 60 2 120 7 Q 180 12 238 6"
                          stroke="#FF4F1F"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}
                </p>
              );
            })}
          </div>

          {/* Handwritten Margin Notes in Right Column */}
          <div className="pt-8 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-6 select-none">
            <div className="font-hand text-2xl text-black/85 rotate-[2deg]">
              <span className="text-signal text-lg mr-1">✦</span>
              <span>Code runs while I sleep.</span>
              <p className="font-mono text-[10px] text-black/50 mt-1 uppercase tracking-wider">
                [AUTONOMOUS TRIAGE ENGINE]
              </p>
            </div>

            <div className="font-hand text-2xl text-black/85 rotate-[-2deg]">
              <span className="text-signal text-lg mr-1">✦</span>
              <span>Taste over boilerplate.</span>
              <p className="font-mono text-[10px] text-black/50 mt-1 uppercase tracking-wider">
                [ENGINEERING EXCELLENCE]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
