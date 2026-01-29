/* eslint-disable react-hooks/exhaustive-deps, react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { label: 'Initializing FinQuest', duration: 800 },
    { label: 'Loading AI Engine', duration: 1000 },
    { label: 'Preparing Simulations', duration: 900 },
    { label: 'Setting Up Dashboard', duration: 700 },
  ];

  useEffect(() => {
    let progressInterval;
    let stepTimeout;

    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    const startTime = Date.now();

    progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 300);
      }
    }, 50);

    const scheduleSteps = () => {
      let cumulativeDuration = 0;
      steps.forEach((step, index) => {
        cumulativeDuration += step.duration;
        setTimeout(() => {
          setCurrentStep(index + 1);
        }, cumulativeDuration);
      });
    };

    scheduleSteps();

    return () => {
      clearInterval(progressInterval);
      if (stepTimeout) clearTimeout(stepTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark"
    >
      {/* Logo or Brand */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-12"
      >
        <h1 className="text-6xl font-bold gradient-text">FinQuest</h1>
        <p className="text-center text-gray-400 mt-2">Financial Operating System</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-96 max-w-[90vw]">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Loading Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3"
            >
              {currentStep > index ? (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              ) : currentStep === index ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader className="w-5 h-5 text-primary flex-shrink-0" />
                </motion.div>
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-700 flex-shrink-0" />
              )}
              <span
                className={`text-sm transition-colors ${
                  currentStep >= index ? 'text-white' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-primary font-mono text-2xl font-bold"
        >
          {Math.round(progress)}%
        </motion.p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
