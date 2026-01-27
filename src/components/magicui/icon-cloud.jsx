import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const IconCloud = ({ iconSlugs = [], radius = 120 }) => {
  const containerRef = useRef(null);
  const iconsRef = useRef([]);

  // Default tech stack icons if none provided
  const defaultIcons = [
    'logos:react',
    'logos:vitejs',
    'logos:tailwindcss-icon',
    'skill-icons:threejs-dark',
    'logos:python',
    'logos:tensorflow',
    'logos:nodejs-icon',
    'logos:postgresql',
    'logos:redis',
    'logos:docker-icon',
    'logos:kubernetes',
    'logos:aws',
    'logos:typescript-icon',
    'logos:javascript',
    'logos:mongodb',
    'skill-icons:figma-dark',
  ];

  const icons = iconSlugs.length > 0 ? iconSlugs : defaultIcons;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const iconElements = iconsRef.current;

    // Position icons in 3D space
    const positionIcons = () => {
      iconElements.forEach((icon, index) => {
        if (!icon) return;

        const phi = Math.acos(-1 + (2 * index) / icons.length);
        const theta = Math.sqrt(icons.length * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
      });
    };

    positionIcons();

    // Rotation animation
    let angleX = 0;
    let angleY = 0;
    let animationId;

    const animate = () => {
      angleY += 0.005;
      angleX += 0.002;

      container.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad)`;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      angleY = mouseX * 0.0001;
      angleX = mouseY * 0.0001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [icons, radius]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
      <div
        ref={containerRef}
        className="relative w-full h-full preserve-3d"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {icons.map((icon, index) => (
          <div
            key={index}
            ref={(el) => (iconsRef.current[index] = el)}
            className="absolute left-1/2 top-1/2 -ml-8 -mt-8 transition-transform duration-300 hover:scale-125"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <Icon
              icon={icon}
              width={64}
              height={64}
              className="drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCloud;
