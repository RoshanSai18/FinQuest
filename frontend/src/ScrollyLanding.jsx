/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollyLanding = () => {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="gradient-text">Transform</span>
          <br />
          Your Financial Future
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Navigate life's biggest financial decisions with confidence using AI-powered simulations
          and personalized insights designed for modern Indian households
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-gray-500 text-sm">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
};

export default ScrollyLanding;
