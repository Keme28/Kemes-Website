import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { siteConfig } from '../content/site';

interface IntroGateProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const IntroGate: React.FC<IntroGateProps> = ({ onComplete, forcePlay = false }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [typedCommand, setTypedCommand] = useState('');
  const [checksVisible, setChecksVisible] = useState<number>(0);
  const [isReadyToRun, setIsReadyToRun] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Check session storage
    if (!forcePlay) {
      const played = sessionStorage.getItem('has_executed_intro');
      if (played === 'true') {
        setIsOpen(false);
        onComplete();
        return;
      }
    }

    let isMounted = true;
    const commandText = siteConfig.intro.command;
    let charIndex = 0;

    // Type command line character by character
    const typeInterval = setInterval(() => {
      if (!isMounted) return;
      if (charIndex <= commandText.length) {
        setTypedCommand(commandText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Sequentially reveal checks
        const checkCount = siteConfig.intro.checks.length;
        let currentCheck = 0;
        const checkInterval = setInterval(() => {
          if (!isMounted) return;
          currentCheck++;
          setChecksVisible(currentCheck);
          if (currentCheck >= checkCount) {
            clearInterval(checkInterval);
            setTimeout(() => {
              if (isMounted) setIsReadyToRun(true);
            }, 300);
          }
        }, 320);
      }
    }, 45);

    // Escape key listener to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Auto-advance failsafe at 4.2 seconds
    const autoTimeout = setTimeout(() => {
      if (isMounted && isOpen) {
        setIsReadyToRun(true);
      }
    }, 4000);

    return () => {
      isMounted = false;
      clearInterval(typeInterval);
      clearTimeout(autoTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forcePlay, onComplete]);

  const handleRun = () => {
    setIsExpanding(true);
    sessionStorage.setItem('has_executed_intro', 'true');

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 45,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.inOut',
        onComplete: () => {
          setIsOpen(false);
          onComplete();
        },
      });
    } else {
      setTimeout(() => {
        setIsOpen(false);
        onComplete();
      }, 500);
    }
  };

  const skipIntro = () => {
    sessionStorage.setItem('has_executed_intro', 'true');
    setIsOpen(false);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-graphite text-bone overflow-hidden select-none"
        data-debug="gsap: intro gate"
      >
        {/* Subtle grid backing inside intro */}
        <div className="absolute inset-0 bg-[radial-gradient(#1f1f23_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        {/* Skip intro link in upper right */}
        <div className="absolute top-6 right-8 z-20">
          <button
            onClick={skipIntro}
            className="font-mono text-xs text-mist hover:text-signal transition-colors flex items-center gap-1.5"
            data-cursor="cta"
          >
            <span>{siteConfig.intro.skipText}</span>
            <span className="text-[10px] text-mist/60">[ESC]</span>
          </button>
        </div>

        {/* Center Terminal Box */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-6">
          {/* Header of node window */}
          <div className="rounded-t border border-white/10 bg-ink/90 px-4 py-2.5 flex items-center justify-between font-mono text-[11px] text-mist">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-signal" />
              <span className="text-bone tracking-wider font-semibold">TERMINAL // SYSTEM BOOT</span>
            </div>
            <span className="text-mist/70">ENV: PROD · WAT UTC+1</span>
          </div>

          {/* Terminal Body */}
          <div
            className="rounded-b border-x border-b border-white/10 bg-graphite/95 p-6 font-mono text-sm shadow-2xl relative"
            aria-live="polite"
            aria-atomic="true"
          >
            {/* Terminal typed command */}
            <div className="flex items-center gap-2 text-mist">
              <span className="text-signal">&gt;</span>
              <span className="text-bone font-medium tracking-wide">{typedCommand}</span>
              <span className="inline-block h-4 w-2 bg-signal animate-pulse" />
            </div>

            {/* Checks list */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
              {siteConfig.intro.checks.map((check, idx) => {
                const isChecked = checksVisible > idx;
                return (
                  <div
                    key={check}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      isChecked ? 'opacity-100 translate-y-0 text-bone' : 'opacity-0 translate-y-1 text-mist'
                    }`}
                  >
                    <span className="text-phosphor font-bold shadow-phosphor-glow">✓</span>
                    <span className="tracking-wide uppercase text-[11px]">{check}</span>
                  </div>
                );
              })}
            </div>

            {/* Glowing RUN Signal Button */}
            <div className="relative mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isReadyToRun ? 1 : 0.25,
                  scale: isReadyToRun ? 1 : 0.95,
                }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <div className="relative inline-flex items-center justify-center">
                  {/* Handwritten Annotation in Caveat with Arrow */}
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.9 }}
                    animate={{
                      opacity: isReadyToRun ? 1 : 0,
                      y: isReadyToRun ? 0 : -6,
                      scale: isReadyToRun ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="absolute -top-12 -left-10 sm:-left-16 z-20 flex flex-col items-center pointer-events-none select-none"
                  >
                    <span className="font-hand text-2xl sm:text-3xl text-bone tracking-wide drop-shadow-md -rotate-6">
                      click here
                    </span>
                    <svg
                      className="w-12 h-10 text-signal -rotate-12 mt-0.5"
                      viewBox="0 0 60 50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 12 10 Q 32 15 42 38 M 32 36 L 42 38 L 45 26" />
                    </svg>
                  </motion.div>

                  <button
                    ref={buttonRef}
                    disabled={!isReadyToRun || isExpanding}
                    onClick={handleRun}
                    className="group relative flex items-center justify-center gap-3 rounded bg-signal px-8 py-3.5 font-mono text-xs font-bold tracking-widest text-white shadow-signal-glow transition-all duration-300 hover:scale-[1.03] active:scale-95 disabled:pointer-events-none"
                    data-cursor="cta"
                  >
                    {/* Port dots on button */}
                    <span className="node-port node-port-left !bg-white" />
                    <span className="node-port node-port-right !bg-white" />

                    <span className="tracking-widest">RUN WORKFLOW</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </motion.div>
              <span className="mt-3 font-mono text-[10px] text-mist/60 tracking-wider">
                NODE_ID: TRIGGER_01 · AUTORUN READY
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
