import React, { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  className?: string;
}

export const GridBackground: React.FC<GridBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates in canvas pixels
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const SPACING = 30; // Grid dot spacing
    const INFLUENCE_RADIUS = 160;

    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
    }

    let dots: Dot[] = [];

    const initDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            alpha: (r % 2 === 0 && c % 2 === 0) ? 0.22 : 0.08,
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initDots();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        loop();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const loop = () => {
      if (!isVisible) return;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const SPRING = 0.08;
      const FRICTION = 0.82;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];

        // Interaction with mouse
        if (mouse.active) {
          const dx = mouse.x - d.x;
          const dy = mouse.y - d.y;
          const dist = Math.hypot(dx, dy);

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            // Push dots away gently or pull slightly with ripple
            const force = (1 - dist / INFLUENCE_RADIUS) * 12;
            const angle = Math.atan2(dy, dx);
            d.vx -= Math.cos(angle) * force * 0.15;
            d.vy -= Math.sin(angle) * force * 0.15;
          }
        }

        // Spring back to base position
        const springX = (d.baseX - d.x) * SPRING;
        const springY = (d.baseY - d.y) * SPRING;

        d.vx = (d.vx + springX) * FRICTION;
        d.vy = (d.vy + springY) * FRICTION;

        d.x += d.vx;
        d.y += d.vy;

        // Draw dot
        const distFromCenter = mouse.active ? Math.hypot(mouse.x - d.x, mouse.y - d.y) : 999;
        const proximityBoost = distFromCenter < INFLUENCE_RADIUS ? (1 - distFromCenter / INFLUENCE_RADIUS) * 0.35 : 0;

        ctx.fillStyle = `rgba(239, 234, 224, ${Math.min(1, d.alpha + proximityBoost)})`;
        ctx.beginPath();
        const radius = proximityBoost > 0.15 ? 1.4 : 1.0;
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      data-debug="canvas: 2d ripple"
    />
  );
};
