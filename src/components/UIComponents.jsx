/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '../lib/utils';

// ============================================================================
// TYPING TEXT COMPONENT - Typewriter effect with animated cursor
// ============================================================================
export const TypingText = ({ 
  text, 
  className = '', 
  speed = 50,
  delay = 0,
  onComplete 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
  }, [delay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      <span className={cn(
        'inline-block w-[2px] h-[1em] ml-1 bg-primary',
        showCursor ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-100'
      )} />
    </span>
  );
};

// ============================================================================
// TEXT HIGHLIGHT COMPONENT - Animated underline/highlight effect
// ============================================================================
export const TextHighlight = ({ 
  children, 
  className = '', 
  highlightColor = 'bg-primary',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      {children}
      <motion.span
        className={cn('absolute bottom-0 left-0 h-[3px] w-full', highlightColor)}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />
    </span>
  );
};

// ============================================================================
// SHINE BORDER COMPONENT - Glowing animated border wrapper
// ============================================================================
export const ShineBorder = ({ 
  children, 
  className = '',
  borderRadius = '16px',
  borderWidth = '2px',
  duration = 3,
  color = '#c8ff00'
}) => {
  return (
    <div 
      className={cn('relative', className)}
      style={{
        borderRadius,
        padding: borderWidth,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        backgroundSize: '200% 100%',
        animation: `shine ${duration}s linear infinite`,
      }}
    >
      <div 
        className="relative z-10 h-full w-full bg-dark"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth})` }}
      >
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// THEME TOGGLE COMPONENT - Dark/Light mode toggle
// ============================================================================
export const ThemeToggle = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'relative p-2 rounded-full transition-all duration-300',
        'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-primary" />
      ) : (
        <Moon className="w-5 h-5 text-primary" />
      )}
    </button>
  );
};

// ============================================================================
// SPOTLIGHT COMPONENT - Focal spotlight effect container
// ============================================================================
export const Spotlight = ({ children, className = '' }) => {
  return (
    <div className={cn('spotlight group relative overflow-hidden', className)}>
      {children}
    </div>
  );
};

// ============================================================================
// GLOWING CARD COMPONENT - Card with glow effects
// ============================================================================
export const GlowingCard = ({ 
  children, 
  className = '',
  glowColor = 'rgba(200, 255, 0, 0.3)' 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'relative overflow-hidden rounded-xl glass-morphism',
        'transition-transform duration-300 hover:scale-105',
        className
      )}
      style={{
        boxShadow: `0 0 20px ${glowColor}`,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ============================================================================
// BLUR TEXT COMPONENT - Text blur animation
// ============================================================================
export const BlurText = ({ text, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {text}
    </motion.div>
  );
};

// ============================================================================
// RETRO GRID COMPONENT - Retro grid background pattern
// ============================================================================
export const RetroGrid = ({ className = '' }) => {
  return (
    <div className={cn('absolute inset-0 retro-grid opacity-20', className)} />
  );
};

// ============================================================================
// SHINE BORDER BUTTON - Button with shine border effect
// ============================================================================
export const ShineBorderButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative px-6 py-3 rounded-lg font-semibold',
        'bg-gradient-to-r from-primary to-primary-600',
        'text-dark transition-all duration-300',
        'hover:shadow-[0_0_30px_rgba(200,255,0,0.5)]',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'overflow-hidden group',
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 shine-effect opacity-0 group-hover:opacity-100" />
    </button>
  );
};

// ============================================================================
// GRADIENT BUTTON - Button with gradient background
// ============================================================================
export const GradientButton = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  disabled = false 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-600 text-dark',
    secondary: 'bg-gradient-to-r from-gray-700 to-gray-900 text-white',
    outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-dark',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-6 py-3 rounded-lg font-semibold',
        'transition-all duration-300',
        'hover:scale-105 active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'btn-primary',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

// ============================================================================
// REVEAL COMPONENT - Scroll-triggered reveal animation with persistent state
// ============================================================================
export const Reveal = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { 
          opacity: 0, 
          ...directions[direction] 
        },
        visible: { 
          opacity: 1, 
          x: 0, 
          y: 0 
        },
      }}
      transition={{ 
        duration, 
        delay,
        ease: 'easeOut' 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ANIMATED COUNTER - Number counter with animation
// ============================================================================
export const AnimatedCounter = ({ 
  end, 
  duration = 2, 
  suffix = '',
  prefix = '',
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(end * percentage));
        
        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn('stat-number', className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// ============================================================================
// BADGE COMPONENT - Animated badge with pulse effect
// ============================================================================
export const Badge = ({ 
  children, 
  className = '',
  variant = 'default',
  pulse = false 
}) => {
  const variants = {
    default: 'bg-primary text-dark',
    secondary: 'bg-gray-700 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-dark',
    error: 'bg-red-500 text-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold',
        variants[variant],
        pulse && 'animate-pulse-glow',
        className
      )}
    >
      {children}
    </span>
  );
};

// ============================================================================
// SKELETON LOADER - Loading skeleton component
// ============================================================================
export const Skeleton = ({ className = '', width, height }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-700 rounded',
        className
      )}
      style={{ width, height }}
    />
  );
};

// ============================================================================
// CARD COMPONENT - Reusable card container
// ============================================================================
export const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={cn(
        'rounded-xl glass-morphism p-6',
        hover && 'transition-transform duration-300 hover:scale-105',
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================================================
// SECTION CONTAINER - Consistent section spacing
// ============================================================================
export const Section = ({ children, className = '', id }) => {
  return (
    <section 
      id={id}
      className={cn('py-24 px-6', className)}
    >
      <div className="container mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
};

// ============================================================================
// GRADIENT TEXT - Text with gradient color
// ============================================================================
export const GradientText = ({ children, className = '' }) => {
  return (
    <span className={cn('gradient-text', className)}>
      {children}
    </span>
  );
};
