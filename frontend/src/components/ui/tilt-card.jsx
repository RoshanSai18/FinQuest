import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlowingEffect } from './glowing-effect';

/**
 * TiltCard - A card with 3D tilt effect and mouse-tracking glow
 * Uses FinQuest's lime green (#c8ff00) color scheme
 */
const TiltCard = ({ 
  children, 
  className,
  tiltIntensity = 10,
  glowEnabled = true,
  glowSpread = 40,
  glowProximity = 64,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation based on mouse position
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -tiltIntensity;
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * tiltIntensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Glowing effect overlay */}
      {glowEnabled && (
        <GlowingEffect
          spread={glowSpread}
          glow={true}
          disabled={false}
          proximity={glowProximity}
          inactiveZone={0.01}
          borderWidth={2}
        />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export { TiltCard };
