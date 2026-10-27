import React, { useEffect, useState } from 'react';

export const DebugOverlay: React.FC = () => {
  const [isDebug, setIsDebug] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in form elements
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'd' || e.key === 'D') {
        setIsDebug((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isDebug) {
      document.documentElement.classList.add('debug-view');
    } else {
      document.documentElement.classList.remove('debug-view');
    }
  }, [isDebug]);

  // Simple FPS counter during debug
  useEffect(() => {
    if (!isDebug) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, [isDebug]);

  if (!isDebug) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9995] rounded border border-signal bg-graphite/90 px-3 py-2 font-mono text-[11px] text-bone shadow-signal-glow backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-signal animate-pulse" />
        <span className="font-semibold text-signal uppercase">SYS: DEBUG_VIEW ACTIVE</span>
        <span className="text-mist">·</span>
        <span className="text-mist">{fps} FPS</span>
      </div>
      <div className="mt-1 text-[10px] text-mist/90">
        Inspecting node graph internals. Press <kbd className="rounded bg-white/10 px-1 text-bone">D</kbd> to exit.
      </div>
    </div>
  );
};
