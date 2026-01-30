import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle, Lock, ChevronDown, ChevronUp, Video, FileText, ArrowLeft } from 'lucide-react';
import QuizModal from './QuizModal';

const CoursePlayer = ({ levelData, onBack, onProgressUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(0);
  const [activeChapter, setActiveChapter] = useState({ moduleIndex: 0, chapterIndex: 0 });
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  
  // Storage key for this level's progress
  const storageKey = `finquest_progress_level_${levelData.id}`;
  
  // Load completed videos from localStorage
  const [completedVideos, setCompletedVideos] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  // Track completed quizzes separately
  const quizStorageKey = `finquest_quiz_progress_level_${levelData.id}`;
  const [completedQuizzes, setCompletedQuizzes] = useState(() => {
    const saved = localStorage.getItem(quizStorageKey);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  // Save to localStorage whenever completedVideos changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...completedVideos]));
    
    // Calculate and update progress for this level
    if (onProgressUpdate) {
      const totalChapters = levelData.modules.reduce((sum, module) => 
        sum + (module.chapters?.length || 0), 0
      );
      const completedCount = completedVideos.size;
      const percentage = totalChapters > 0 ? (completedCount / totalChapters) * 100 : 0;
      
      onProgressUpdate(levelData.id, percentage, completedCount, totalChapters);
    }
  }, [completedVideos, levelData, onProgressUpdate, storageKey]);
  
  // Save completed quizzes to localStorage
  useEffect(() => {
    localStorage.setItem(quizStorageKey, JSON.stringify([...completedQuizzes]));
  }, [completedQuizzes, quizStorageKey]);

  const primaryColor = '#c8ff00';
  const levelColor = levelData.color || primaryColor;
  
  const handleVideoProgress = (e) => {
    const video = e.target;
    const chapterKey = `${activeChapter.moduleIndex}-${activeChapter.chapterIndex}`;
    const percentage = (video.currentTime / video.duration) * 100;
    
    // Mark as completed if watched 90% or more
    if (percentage >= 90 && !completedVideos.has(chapterKey)) {
      setCompletedVideos(prev => new Set([...prev, chapterKey]));
    }
  };
  
  const isModuleCompleted = (moduleIndex) => {
    const module = levelData.modules[moduleIndex];
    if (!module || !module.chapters) return false;
    
    return module.chapters.every((_, chapterIndex) => {
      const key = `${moduleIndex}-${chapterIndex}`;
      return completedVideos.has(key);
    });
  };
  
  const handleQuizComplete = (moduleIndex) => {
    setCompletedQuizzes(prev => new Set([...prev, moduleIndex]));
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'qa', label: 'Q&A' },
    { id: 'notes', label: 'Notes' },
    { id: 'announcements', label: 'Announcements' }
  ];

  const toggleModule = (index) => {
    setExpandedModule(expandedModule === index ? -1 : index);
  };

  const handleChapterClick = (moduleIndex, chapterIndex) => {
    setActiveChapter({ moduleIndex, chapterIndex });
  };

  const isChapterActive = (moduleIndex, chapterIndex) => {
    return activeChapter.moduleIndex === moduleIndex && activeChapter.chapterIndex === chapterIndex;
  };

  const getCurrentChapter = () => {
    const module = levelData.modules[activeChapter.moduleIndex];
    if (module && module.chapters) {
      return module.chapters[activeChapter.chapterIndex];
    }
    return null;
  };

  const currentChapter = getCurrentChapter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-dark"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-dark/95 backdrop-blur-xl border-b-2 flex items-center justify-between px-6 z-50" style={{ borderColor: `${levelColor}40` }}>
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Back to map"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{levelData.icon}</span>
            <div>
              <h1 className="text-lg font-bold text-white">{levelData.title}</h1>
              <p className="text-xs text-white/60">{levelData.subtitle}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="pt-16 h-full flex">
        {/* Left Side - Video Player / Notes (70%) */}
        <div className="w-[70%] flex flex-col border-r-2" style={{ borderColor: `${levelColor}40` }}>
          
          {/* Tabs at Top */}
          <div className="border-b-2" style={{ borderColor: `${levelColor}40` }}>
            <div className="flex gap-1 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-semibold transition-all relative ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: levelColor }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area - Video or Notes */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {/* Video View */}
              {activeTab === 'overview' && (
                <motion.div
                  key="video-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col"
                >
                  {/* Video Player */}
                  <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                    {currentChapter && currentChapter.videoUrl ? (
                      <video
                        key={currentChapter.videoUrl}
                        className="w-full h-full"
                        controls
                        controlsList="nodownload"
                        onTimeUpdate={handleVideoProgress}
                        onEnded={handleVideoProgress}
                      >
                        <source src={currentChapter.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark via-dark-100 to-dark">
                        <div className="text-center">
                          <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ 
                              backgroundColor: `${primaryColor}20`,
                              border: `2px solid ${primaryColor}`
                            }}
                          >
                            <Play className="w-10 h-10" style={{ color: primaryColor }} />
                          </div>
                          <p className="text-white/60">Video player ready</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chapter Title */}
                  <div className="p-6 bg-dark border-b-2" style={{ borderColor: `${levelColor}40` }}>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {currentChapter ? currentChapter.title : 'Select a chapter'}
                    </h2>
                    {currentChapter && currentChapter.duration && (
                      <p className="text-sm text-white/60">Duration: {currentChapter.duration}</p>
                    )}
                  </div>

                  {/* Overview Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">About This Level</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{levelData.description}</p>
                        <div 
                          className="inline-block px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ 
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor
                          }}
                        >
                          {levelData.theme}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notes Full Screen View */}
              {activeTab === 'notes' && currentChapter && (
                <motion.div
                  key="notes-view"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark overflow-y-auto"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="fixed top-20 right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border-2 transition-all backdrop-blur-sm"
                    style={{ borderColor: `${levelColor}40` }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  <div className="p-8">
                    {/* Chapter Header */}
                    <div className="mb-6 pb-6 border-b-2" style={{ borderColor: `${levelColor}40` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                          style={{ 
                            backgroundColor: `${levelColor}20`,
                            border: `2px solid ${levelColor}`
                          }}
                        >
                          📝
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">{currentChapter.title}</h2>
                          <p className="text-sm text-white/60 mt-1">Comprehensive Study Notes</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes Content */}
                    {currentChapter.notes ? (
                      <div 
                        className="text-white leading-relaxed"
                        style={{ 
                          fontSize: '16px',
                          lineHeight: '1.8'
                        }}
                        dangerouslySetInnerHTML={{ __html: currentChapter.notes }}
                      />
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-white/60 text-lg">No notes available for this chapter.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Q&A View */}
              {activeTab === 'qa' && (
                <motion.div
                  key="qa-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <p className="text-white/60 text-lg">Q&A section coming soon...</p>
                  </div>
                </motion.div>
              )}

              {/* Announcements View */}
              {activeTab === 'announcements' && (
                <motion.div
                  key="announcements-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">📢</div>
                    <p className="text-white/60 text-lg">No announcements yet.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Course Content Sidebar (30%) */}
        <div className="w-[30%] bg-dark/50 flex flex-col">
          <div className="p-6 border-b-2" style={{ borderColor: `${levelColor}40` }}>
            <h2 className="text-lg font-bold text-white">Course Content</h2>
            <p className="text-sm text-white/60 mt-1">
              {levelData.modules.length} modules • {levelData.modules.reduce((acc, m) => acc + m.chapters.length, 0)} chapters
            </p>
          </div>

          {/* Scrollable Module List */}
          <div className="flex-1 overflow-y-auto">
            {levelData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border-b-2" style={{ borderColor: `${levelColor}20` }}>
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">
                      Module {moduleIndex + 1}: {module.title}
                    </h3>
                    <p className="text-xs text-white/60">
                      {module.chapters.length} chapters • {module.quiz ? '1 quiz' : 'No quiz'}
                    </p>
                  </div>
                  {expandedModule === moduleIndex ? (
                    <ChevronUp className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  )}
                </button>

                {/* Module Content */}
                <AnimatePresence>
                  {expandedModule === moduleIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {/* Chapters */}
                      {module.chapters.map((chapter, chapterIndex) => (
                        <button
                          key={chapterIndex}
                          onClick={() => handleChapterClick(moduleIndex, chapterIndex)}
                          className={`w-full p-3 pl-8 flex items-center gap-3 hover:bg-white/5 transition-colors text-left ${
                            isChapterActive(moduleIndex, chapterIndex) 
                              ? 'bg-white/10' 
                              : ''
                          }`}
                        >
                          <Video 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ 
                              color: isChapterActive(moduleIndex, chapterIndex) 
                                ? levelColor 
                                : 'rgba(255,255,255,0.4)' 
                            }}
                          />
                          <span 
                            className={`text-sm flex-1 ${
                              isChapterActive(moduleIndex, chapterIndex)
                                ? 'font-semibold text-white'
                                : 'text-white/70'
                            }`}
                          >
                            {chapter.title}
                          </span>
                          {chapter.duration && (
                            <span className="text-xs text-white/40">{chapter.duration}</span>
                          )}
                          {completedVideos.has(`${moduleIndex}-${chapterIndex}`) && (
                            <CheckCircle className="w-4 h-4" style={{ color: levelColor }} />
                          )}
                        </button>
                      ))}

                      {/* Quiz */}
                      {module.quiz && (
                        <button
                          onClick={() => {
                            if (isModuleCompleted(moduleIndex)) {
                              setSelectedQuiz({ ...module.quiz, moduleIndex });
                              setShowQuiz(true);
                            }
                          }}
                          disabled={!isModuleCompleted(moduleIndex)}
                          className={`w-full p-3 pl-8 flex items-center gap-3 transition-colors text-left ${
                            isModuleCompleted(moduleIndex) 
                              ? 'hover:bg-white/5 cursor-pointer' 
                              : 'opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <FileText 
                            className="w-4 h-4 flex-shrink-0" 
                            style={{ color: isModuleCompleted(moduleIndex) ? levelColor : 'rgba(255,255,255,0.3)' }}
                          />
                          <span className="text-sm text-white/70 flex-1">{module.quiz.title}</span>
                          {completedQuizzes.has(moduleIndex) ? (
                            <CheckCircle className="w-4 h-4" style={{ color: levelColor }} />
                          ) : isModuleCompleted(moduleIndex) ? (
                            <span className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4 text-white/30" />
                          )}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && selectedQuiz && (
          <QuizModal 
            quiz={selectedQuiz} 
            levelColor={levelColor} 
            onClose={() => {
              setShowQuiz(false);
              setSelectedQuiz(null);
            }}
            onQuizComplete={handleQuizComplete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CoursePlayer;
