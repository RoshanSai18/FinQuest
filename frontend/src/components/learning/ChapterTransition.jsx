import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Clock } from 'lucide-react';

const ChapterTransition = ({ chapter, onBack, onComplete }) => {
  const [currentLesson, setCurrentLesson] = useState(0);

  // Sample lesson content
  const lessons = [
    {
      title: 'Introduction',
      content: `Welcome to ${chapter.title}! In this module, you'll learn the essential concepts that will help you master this financial topic.`,
      duration: '5 min read'
    },
    {
      title: 'Core Concepts',
      content: 'Understanding the fundamentals is crucial. Let\'s break down the key principles step by step.',
      duration: '10 min read'
    },
    {
      title: 'Practical Examples',
      content: 'Now let\'s see how these concepts apply to real-world scenarios you might encounter.',
      duration: '8 min read'
    },
    {
      title: 'Quick Quiz',
      content: 'Test your knowledge with a quick quiz to reinforce what you\'ve learned!',
      duration: '5 min'
    }
  ];

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen bg-dark flex items-center justify-center p-8"
    >
      <div className="max-w-4xl w-full">
        {/* Chapter intro header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.6 }}
          >
            {chapter.icon}
          </motion.div>
          
          <h1 className="text-5xl font-extrabold mb-3 text-white">
            {chapter.title}
          </h1>
          
          <p className="text-xl text-gray-400 font-semibold mb-6">
            {chapter.subtitle}
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-400">
                Lesson {currentLesson + 1} of {lessons.length}
              </span>
              <span className="text-sm font-bold text-primary">
                {Math.round(((currentLesson + 1) / lessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentLesson + 1) / lessons.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Lesson content card */}
        <motion.div
          key={currentLesson}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 mb-8"
        >
          {/* Lesson header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-white mb-1">
                {lessons[currentLesson].title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                <Clock className="w-4 h-4" />
                <span>{lessons[currentLesson].duration}</span>
              </div>
            </div>
          </div>

          {/* Lesson content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-gray-300 leading-relaxed font-medium">
              {lessons[currentLesson].content}
            </p>
          </div>

          {/* Placeholder for actual content */}
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-gray-400 text-center font-semibold">
              📚 Lesson content will be loaded here
            </p>
          </div>
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to City
          </motion.button>

          <div className="flex gap-3">
            {currentLesson > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-bold"
              >
                Previous
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-dark transition-all font-bold"
            >
              {currentLesson === lessons.length - 1 ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Complete Module
                </>
              ) : (
                <>
                  Next Lesson
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterTransition;
