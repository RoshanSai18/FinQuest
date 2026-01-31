import React, { useRef, useState, useEffect } from "react";

export const GlowingEffect = ({ 
  spread = 40, 
  glow = true, 
  disabled = false,
  proximity = 0,
  inactiveZone = 0,
  color = "#84cc16" // Default Neon Lime
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Attach listeners to the PARENT element so the glow tracks mouse over the card
  useEffect(() => {
    const div = divRef.current;
    if (!div || disabled) return;
    
    const parent = div.parentElement;
    if (!parent) return;

    // Force parent to be relative so absolute positioning works
    const parentStyle = window.getComputedStyle(parent);
    if (parentStyle.position === 'static') {
        parent.style.position = 'relative';
    }

    const handleMouseMove = (e) => {
      const rect = parent.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  if (!glow || disabled) return null;

  return (
    <div
      ref={divRef}
      className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
      style={{
        opacity,
        zIndex: 1, // Sits on top of background but below text
      }}
    >
      {/* 1. Background Glow (Subtle) */}
      <div 
        className="absolute inset-0 rounded-[inherit]"
        style={{
            background: `radial-gradient(${spread * 8}px circle at ${position.x}px ${position.y}px, ${color}15, transparent 60%)`,
        }}
      />

      {/* 2. Border Glow (Bright) */}
      {/* This uses a CSS mask to only show the glow on the border */}
      <div 
         className="absolute inset-0 rounded-[inherit]"
         style={{
            background: `radial-gradient(${spread * 5}px circle at ${position.x}px ${position.y}px, ${color}, transparent 50%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px", // THICKNESS OF THE GLOWING BORDER
         }}
       />
    </div>
  );
};
