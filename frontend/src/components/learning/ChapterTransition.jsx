import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, BookOpen, Clock } from 'lucide-react';

const ChapterTransition = ({ module, onReturn }) => {
  if (!module) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full h-full flex items-center justify-center p-8"
    >
      <div className="max-w-3xl w-full">
        {/* Return Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onReturn}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 transition-all backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-bold">Back to City</span>
        </motion.button>

        {/* Chapter Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl"
        >
          {/* Module Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6 text-center"
          >
            {module.icon}
          </motion.div>

          {/* Module Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent"
          >
            {module.title}
          </motion.h1>

          {/* Module Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-center text-gray-300 font-semibold mb-8"
          >
            {module.description}
          </motion.p>

          {/* Module Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mb-10 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-base font-semibold">5 Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-base font-semibold">~30 mins</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="group relative px-8 py-4 text-lg font-extrabold bg-primary text-dark rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/40 hover:shadow-primary/60 flex items-center justify-center gap-3">
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Start Learning
            </button>

            <button className="px-8 py-4 text-lg font-bold bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-primary/50 rounded-xl transition-all backdrop-blur-sm">
              View Syllabus
            </button>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-bold text-primary">Ready to begin</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterTransition;
