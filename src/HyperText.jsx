/* eslint-disable react/prop-types, react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HyperText = ({ 
  text, 
  className = '',
  animationSpeed = 50,
  sequential = false 
}) => {
  const [displayText, setDisplayText] = useState(text.split(''));
  const [isAnimating, setIsAnimating] = useState(false);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  useEffect(() => {
    if (isAnimating) return;

    const animate = () => {
      let iterations = 0;
      const maxIterations = sequential ? text.length : 10;

      const interval = setInterval(() => {
        setDisplayText((prev) =>
          prev.map((char, index) => {
            if (sequential) {
              if (index < iterations) {
                return text[index];
              }
            } else {
              if (Math.random() > 0.5 || iterations > maxIterations) {
                return text[index];
              }
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
        );

        iterations++;

        if (iterations > maxIterations) {
          clearInterval(interval);
          setDisplayText(text.split(''));
          setIsAnimating(false);
        }
      }, animationSpeed);

      return () => clearInterval(interval);
    };

    setIsAnimating(true);
    const cleanup = animate();

    return cleanup;
  }, [text, animationSpeed, sequential]);

  return (
    <span className={className}>
      {displayText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default HyperText;
