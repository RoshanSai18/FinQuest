import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';

const QuizModal = ({ quiz, levelColor, onClose, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
    
    // Mark quiz as completed
    if (onQuizComplete && quiz.moduleIndex !== undefined) {
      onQuizComplete(quiz.moduleIndex);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = quiz.questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const allAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  if (showResults) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const passed = percentage >= 70;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-dark via-dark-100 to-dark rounded-3xl p-8 border-2"
          style={{ borderColor: levelColor }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              {passed ? (
                <Trophy className="w-24 h-24 mx-auto" style={{ color: levelColor }} />
              ) : (
                <div className="text-6xl">📚</div>
              )}
            </motion.div>

            <h2 className="text-4xl font-bold text-white mb-4">
              {passed ? 'Congratulations! 🎉' : 'Keep Learning! 💪'}
            </h2>

            <div className="mb-6">
              <div className="text-6xl font-bold mb-2" style={{ color: levelColor }}>
                {percentage}%
              </div>
              <p className="text-white/80 text-lg">
                You scored {score} out of {quiz.questions.length}
              </p>
            </div>

            {passed ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
                <p className="text-green-400 font-semibold">
                  Excellent work! You&apos;ve mastered this module. 🌟
                </p>
              </div>
            ) : (
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                <p className="text-yellow-400 font-semibold">
                  Review the content and try again. You&apos;re getting there! 📖
                </p>
              </div>
            )}

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl font-bold text-dark transition-all"
              style={{ backgroundColor: levelColor }}
            >
              {passed ? 'Continue Learning' : 'Review Content'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl bg-gradient-to-br from-dark via-dark-100 to-dark rounded-3xl p-8 border-2"
        style={{ borderColor: levelColor }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2" style={{ borderColor: `${levelColor}40` }}>
          <div>
            <h2 className="text-2xl font-bold text-white">{quiz.title}</h2>
            <p className="text-sm text-white/60 mt-1">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex gap-1">
            {quiz.questions.map((_, index) => (
              <div
                key={index}
                className="h-2 flex-1 rounded-full transition-all"
                style={{
                  backgroundColor: index <= currentQuestion ? levelColor : 'rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">{currentQ.question}</h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion, index)}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-2'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{
                    borderColor: selectedAnswers[currentQuestion] === index ? levelColor : undefined,
                    backgroundColor: selectedAnswers[currentQuestion] === index ? `${levelColor}20` : 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold border-2"
                      style={{
                        borderColor: selectedAnswers[currentQuestion] === index ? levelColor : 'rgba(255,255,255,0.3)',
                        backgroundColor: selectedAnswers[currentQuestion] === index ? levelColor : 'transparent',
                        color: selectedAnswers[currentQuestion] === index ? '#0a0a0a' : 'white'
                      }}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            Previous
          </button>

          <div className="text-sm text-white/60">
            {Object.keys(selectedAnswers).length} / {quiz.questions.length} answered
          </div>

          {currentQuestion < quiz.questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isAnswered ? levelColor : 'rgba(255,255,255,0.1)',
                color: isAnswered ? '#0a0a0a' : 'white'
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: allAnswered ? levelColor : 'rgba(255,255,255,0.1)',
                color: allAnswered ? '#0a0a0a' : 'white'
              }}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizModal;
