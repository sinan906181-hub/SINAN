import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'text' | 'image' | 'project' | 'button'>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor position
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing dot with lighter spring
  const dotConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(mouseX, dotConfig);
  const dotY = useSpring(mouseY, dotConfig);

  useEffect(() => {
    // Check if device is touch-only
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
        setIsPointerDevice(false);
      } else {
        setIsPointerDevice(true);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listener for interactive hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') as 'text' | 'image' | 'project' | 'button';
        const text = cursorEl.getAttribute('data-cursor-text') || '';
        setCursorType(type || 'default');
        setCursorText(text);
        return;
      }

      // Default element detection
      if (target.closest('button, a, input, textarea, [role="button"]')) {
        setCursorType('button');
        setCursorText('');
      } else if (target.closest('h1, h2, h3, p, span.interactive-text')) {
        setCursorType('text');
        setCursorText('');
      } else if (target.closest('img, .image-interactive')) {
        setCursorType('image');
        setCursorText('VIEW');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isPointerDevice || !isVisible) return null;

  // Derive size, shape, and styles based on cursorType
  const getCursorProps = () => {
    switch (cursorType) {
      case 'image':
        return {
          size: 80,
          bg: 'rgba(163, 230, 53, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          text: cursorText || 'VIEW',
          textColor: '#050507',
          scale: 1,
          backdrop: 'blur(2px)',
        };
      case 'project':
        return {
          size: 90,
          bg: '#a3e635',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          text: cursorText || 'OPEN',
          textColor: '#000000',
          scale: 1,
          backdrop: 'none',
        };
      case 'button':
        return {
          size: 48,
          bg: 'rgba(163, 230, 53, 0.15)',
          border: '1.5px solid #a3e635',
          text: '',
          textColor: '#a3e635',
          scale: 1.1,
          backdrop: 'none',
        };
      case 'text':
        return {
          size: 32,
          bg: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(163, 230, 53, 0.4)',
          text: '',
          textColor: '#ffffff',
          scale: 1,
          backdrop: 'none',
        };
      default:
        return {
          size: 20,
          bg: 'transparent',
          border: '1px solid rgba(163, 230, 53, 0.5)',
          text: '',
          textColor: 'transparent',
          scale: 1,
          backdrop: 'none',
        };
    }
  };

  const currentProps = getCursorProps();

  return (
    <>
      {/* Outer Interactive Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999999] flex items-center justify-center rounded-full font-mono-code font-bold uppercase tracking-wider text-[11px] select-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: currentProps.size,
          height: currentProps.size,
          backgroundColor: currentProps.bg,
          border: currentProps.border,
          color: currentProps.textColor,
          boxShadow: cursorType === 'project' || cursorType === 'image' ? '0 0 25px rgba(163, 230, 53, 0.4)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {currentProps.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="tracking-widest font-black text-[10px]"
          >
            {currentProps.text}
          </motion.span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      {cursorType === 'default' && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[999999] w-1.5 h-1.5 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]"
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
};
