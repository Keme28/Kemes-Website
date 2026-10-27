import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'cta' | 'view' | 'drag' | 'hidden'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the trailing ring
  const ringX = useSpring(mouseX, { damping: 26, stiffness: 280, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 26, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    // Check if touch device
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor hints
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'cta') {
          setCursorType('cta');
          setCursorText('▶');
          return;
        } else if (type === 'view') {
          setCursorType('view');
          setCursorText('VIEW');
          return;
        } else if (type === 'drag') {
          setCursorType('drag');
          setCursorText('DRAG');
          return;
        }
      }

      // Default interactive checks
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
      if (isInteractive) {
        setCursorType('cta');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorType('hidden');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      setCursorType('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" data-debug="framer: spring cursor">
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          backgroundColor: cursorType === 'cta' || cursorType === 'view' ? '#FF4F1F' : '#EFEAE0',
        }}
      />

      {/* Spring trailing ring / morphing badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: cursorType === 'view' || cursorType === 'drag' ? 56 : cursorType === 'cta' ? 36 : 28,
          height: cursorType === 'view' || cursorType === 'drag' ? 56 : cursorType === 'cta' ? 36 : 28,
          borderColor:
            cursorType === 'cta' || cursorType === 'view'
              ? 'rgba(255, 79, 31, 0.7)'
              : 'rgba(239, 234, 224, 0.28)',
          backgroundColor:
            cursorType === 'view' || cursorType === 'drag'
              ? 'rgba(12, 12, 13, 0.85)'
              : cursorType === 'cta'
              ? 'rgba(255, 79, 31, 0.12)'
              : 'transparent',
          scale: cursorType === 'hidden' ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[10px] font-semibold tracking-wider text-bone select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
};
