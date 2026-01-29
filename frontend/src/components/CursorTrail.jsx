import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CursorTrail - Creates a minimalistic green glow effect that follows the cursor
 */
const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pointer-events-none fixed z-[9999] mix-blend-screen"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {/* Main glow */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(200, 255, 0, 0.15) 0%, rgba(200, 255, 0, 0.08) 30%, rgba(200, 255, 0, 0) 70%)',
              filter: 'blur(20px)',
            }}
          />
          {/* Inner bright spot */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(200, 255, 0, 0.25) 0%, rgba(200, 255, 0, 0) 70%)',
              filter: 'blur(8px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CursorTrail;
