/* eslint-disable no-unused-vars, react/no-unescaped-entities, react/prop-types */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Globe as GlobeIcon,
  Users,
  Sparkles,
  Play,
  CheckCircle,
  ChevronRight,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Layers,
  Zap,
} from 'lucide-react';
import './App.css';
import {
  ThemeToggle,
  Badge,
  GradientButton,
  ShineBorderButton,
  Card,
  Reveal,
  AnimatedCounter,
  TypingText,
  TextHighlight,
  ShineBorder,
  GradientText,
  Section,
} from './components/UIComponents';
import FinancialCalculator from './components/FinancialCalculator';
import FinancialCalculatorModal from './components/FinancialCalculatorModal';
import LoadingScreen from './components/LoadingScreen';
import CursorTrail from './components/CursorTrail';
import IconCloud from './components/magicui/icon-cloud';
import Globe from './Globe';
import { TiltCard } from './components/ui/tilt-card';
import { TubeLightNavBar } from './components/ui/tubelight-navbar';
import { triggerConfetti, smoothScrollTo } from './lib/utils';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('features');

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle auth form submission
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup') {
      triggerConfetti();
      setTimeout(() => {
        setIsAuthModalOpen(false);
      }, 2000);
    } else {
      setIsAuthModalOpen(false);
    }
  };

  const navLinks = [
    { name: 'Features', label: 'Features', href: '#features', icon: Sparkles },
    { name: 'How It Works', label: 'How It Works', href: '#how-it-works', icon: Zap },
    { name: 'Integrations', label: 'Integrations', href: '#integrations', icon: Layers },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {
      !isLoading && (
        <div className="min-h-screen bg-dark text-white">
          {/* ============================================================================ */}
          {/* NAVIGATION */}
          {/* ============================================================================ */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
              scrolled ? 'bg-dark/95 backdrop-blur-lg border-b border-white/10' : ''
            }`}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-center md:mr-4">
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Sparkles className="w-6 h-6 text-dark" />
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg"></div>
                  </div>
                  <span className="text-2xl font-bold tracking-tight">
                    <GradientText>FinQuest</GradientText>
                  </span>
                </motion.div>

                {/* Desktop Navigation - Combined Nav Items and Actions */}
                <div className="hidden md:flex items-center gap-6">
                  <TubeLightNavBar
                    items={navLinks}
                    activeItem={activeNavItem}
                    onItemClick={(item) => {
                      setActiveNavItem(item.name.toLowerCase().replace(/ /g, '-'));
                      smoothScrollTo(item.href.slice(1));
                    }}
                  />
                  
                  <ThemeToggle />
                  
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-gray-300 hover:text-white transition-colors font-medium px-4"
                  >
                    Log in
                  </button>
                  
                  <GradientButton
                    onClick={() => {
                      setAuthMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                  >
                    Get Started
                  </GradientButton>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden overflow-hidden"
                  >
                    <div className="py-4 space-y-4">
                      {navLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="block py-2 text-gray-300 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            smoothScrollTo(link.href.slice(1));
                            setIsMenuOpen(false);
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                      <div className="pt-4 space-y-3">
                        <button
                          onClick={() => {
                            setAuthMode('login');
                            setIsAuthModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-center py-2 text-gray-300"
                        >
                          Log in
                        </button>
                        <GradientButton
                          onClick={() => {
                            setAuthMode('signup');
                            setIsAuthModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full"
                        >
                          Get Started
                        </GradientButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* ============================================================================ */}
          {/* HERO SECTION */}
          {/* ============================================================================ */}
          <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
            <div className="hero-gradient absolute inset-0" />
            <RetroGrid className="absolute inset-0" />

            <div className="container mx-auto max-w-7xl relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 items-center">
                {/* Left Content */}
                <Reveal>
                  <div className="max-w-[560px] text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <Badge className="shadow-primary/20">
                        <Sparkles className="w-4 h-4 inline mr-2" />
                        AI-Powered Financial Planning
                      </Badge>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="font-bold mb-6"
                      style={{ 
                        fontSize: '68px', 
                        lineHeight: '1.08', 
                        letterSpacing: '-1px' 
                      }}
                    >
                      Master your money,{' '}
                      <span className="relative inline-block">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="gradient-text"
                        >
                          stress-free
                        </motion.span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/40" />
                      </span>
                    </motion.h1>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-gray-400 mb-8 max-w-[520px]"
                    >
                      Run thousands of financial scenarios, get AI-powered insights, and make
                      confident decisions before life's biggest moments
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 mb-6"
                    >
                      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                        <ShineBorderButton
                          onClick={() => {
                            setAuthMode('signup');
                            setIsAuthModalOpen(true);
                          }}
                          className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
                        >
                          Start Free Trial
                          <ArrowRight className="w-5 h-5 ml-2 inline" />
                        </ShineBorderButton>
                      </motion.div>

                      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                        <GradientButton 
                          variant="outline" 
                          className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-shadow"
                          onClick={() => setIsCalculatorModalOpen(true)}
                        >
                          <Play className="w-5 h-5 mr-2 inline" />
                          Test Demo
                        </GradientButton>
                      </motion.div>
                    </motion.div>

                    <p className="text-sm text-gray-500">
                      Don't wait! Spend your money smarter!
                    </p>
                  </div>
                </Reveal>

                {/* Right Content - Enhanced Phone Mockup */}
                <Reveal delay={0.3}>
                  <EnhancedPhoneMockup />
                </Reveal>
              </div>
            </div>
          </section>

          {/* ============================================================================ */}
          {/* FEATURES SECTION */}
          {/* ============================================================================ */}
          <Section id="features">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Everything you need to <GradientText>master money</GradientText>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Powerful features designed to help Indian households make better financial
                  decisions
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: 'What-If Simulator',
                  description:
                    'Run thousands of scenarios to see how job loss, market crashes, or life events impact your finances',
                },
                {
                  icon: Shield,
                  title: 'Bank-Grade Security',
                  description:
                    'AES-256 encryption, read-only access, and SOC 2 Type II compliance protect your data',
                },
                {
                  icon: Clock,
                  title: 'Real-Time Tracking',
                  description:
                    'Monitor your net worth, investments, and expenses live across all accounts',
                },
                {
                  icon: DollarSign,
                  title: 'Smart Budgeting',
                  description:
                    'AI automatically categorizes transactions and suggests optimizations to save more',
                },
                {
                  icon: TrendingUp,
                  title: 'AI-Powered Insights',
                  description:
                    'Get personalized recommendations from Gemini AI based on your unique financial situation',
                },
                {
                  icon: GlobeIcon,
                  title: 'Multi-Currency',
                  description:
                    'Track international investments and assets in 150+ currencies with real-time conversion',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <TiltCard className="p-8 h-full" tiltIntensity={8}>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          </Section>

          {/* ============================================================================ */}
          {/* HOW IT WORKS SECTION */}
          {/* ============================================================================ */}
          <Section id="how-it-works" className="bg-gradient-to-b from-dark via-dark-100 to-dark">
            {/* Centered Container with Max Width */}
            <div className="max-w-[1200px] mx-auto">
              <Reveal>
                <div className="text-center mb-12 md:mb-16">
                  <h2 
                    className="font-bold mb-5 leading-tight"
                    style={{ 
                      fontSize: 'clamp(36px, 5vw, 52px)', 
                      lineHeight: '1.15', 
                      letterSpacing: '-0.5px' 
                    }}
                  >
                    Get started in{' '}
                    <span className="relative inline-block">
                      <GradientText>3 simple steps</GradientText>
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 max-w-[650px] mx-auto leading-relaxed">
                    From signup to financial clarity in minutes. No complicated setup required.
                  </p>
                </div>
              </Reveal>

              {/* Cards Grid with Equal Heights */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[
                  {
                    step: '01',
                    icon: '🔗',
                    title: 'Connect your accounts',
                    description:
                      'Securely link your bank accounts, investments, and credit cards with read-only access. We never touch your money.',
                  },
                  {
                    step: '02',
                    icon: '▶️',
                    title: 'Run simulations',
                    description:
                      'Test thousands of scenarios — job loss, market crashes, major purchases. See how each decision impacts your future.',
                  },
                  {
                    step: '03',
                    icon: '💡',
                    title: 'Get personalized advice',
                    description:
                      'Receive AI-powered recommendations tailored to your goals. Make confident decisions backed by data.',
                  },
                ].map((item, index) => (
                  <Reveal key={index} delay={index * 0.1}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative h-full group"
                    >
                      {/* Step Number Badge - Aligned with Card Edge */}
                      <div className="absolute -top-3 -left-3 z-20">
                        <div 
                          className="w-12 h-12 rounded-full bg-primary text-dark font-bold text-lg flex items-center justify-center shadow-md transition-shadow duration-300 group-hover:shadow-lg"
                          style={{ boxShadow: '0 4px 12px rgba(200, 255, 0, 0.25)' }}
                        >
                          {item.step}
                        </div>
                      </div>

                      {/* Card Container */}
                      <div 
                        className="h-full p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 transition-all duration-300 group-hover:border-primary/40 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
                        tabIndex={0}
                        role="article"
                        aria-label={`Step ${item.step}: ${item.title}`}
                      >
                        {/* Icon Container - Standardized Size */}
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-2xl flex-shrink-0 transition-colors duration-300 group-hover:bg-primary/15">
                          {item.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-[22px] font-semibold mb-4 text-white leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-[16px] text-gray-300 leading-relaxed" style={{ lineHeight: '1.6' }}>
                          {item.description}
                        </p>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Section>

          {/* ============================================================================ */}
          {/* INTEGRATIONS / TECH STACK SECTION */}
          {/* ============================================================================ */}
          <Section id="integrations" className="bg-dark-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <Reveal>
                <div>
                  <Badge className="mb-6">
                    <GlobeIcon className="w-4 h-4 inline mr-2" />
                    Powered by cutting-edge technology
                  </Badge>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Built with the <GradientText>best tech stack</GradientText>
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    We leverage industry-leading technologies to deliver a fast, secure, and
                    reliable financial platform
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      'React 19',
                      'Vite',
                      'TailwindCSS',
                      'Framer Motion',
                      'Three.js',
                      'Python',
                      'TensorFlow',
                      'PostgreSQL',
                      'Redis',
                      'AWS',
                    ].map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Right Content - Icon Cloud */}
              <Reveal delay={0.3}>
                <IconCloud />
              </Reveal>
            </div>
          </Section>

          {/*  */}

          {/* ============================================================================ */}
          {/* CTA SECTION */}
          {/* ============================================================================ */}
          <Section className="bg-gradient-to-b from-dark via-dark-100 to-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
            
            <Reveal>
              <div className="text-center max-w-4xl mx-auto relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block mb-8"
                >
                  <div className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    
                  </div>
                </motion.div>

                {/* Heading */}
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Ready to take control of{' '}
                  <span className="block mt-2">
                    <GradientText>your financial future?</GradientText>
                  </span>
                </h2>

                {/* Subtext */}
                <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
                  Start running financial simulations today. See how prepared you are for life's
                  biggest decisions.
                </p>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setIsAuthModalOpen(true);
                      triggerConfetti();
                    }}
                    className="group relative px-12 py-6 text-xl font-bold bg-primary text-dark rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_0_40px_rgba(200,255,0,0.3)] hover:shadow-[0_0_60px_rgba(200,255,0,0.5)] flex items-center gap-3 mx-auto"
                  >
                    Start Your Free Trial
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Trust Text */}
                <p className="text-gray-500 mt-8 text-base">
                  No credit card required • Cancel anytime • 14-day free trial
                </p>
              </div>
            </Reveal>
          </Section>

          {/* ============================================================================ */}
          {/* FOOTER */}
          {/* ============================================================================ */}
          <footer className="relative border-t border-white/10 py-16 px-6 bg-dark">
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                {/* Brand Column */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-dark" />
                    </div>
                    <h3 className="text-2xl font-bold">FinQuest</h3>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-sm">
                    The financial operating system for modern Indian households.
                  </p>
                  <div className="flex gap-3">
                    {[
                      { Icon: Twitter, href: 'https://x.com/' },
                      { Icon: Linkedin, href: 'https://www.linkedin.com/' },
                      { Icon: Github, href: 'https://github.com/RoshanSai18/FinQuest', target: '_blank' },
                    ].map(({ Icon, href }, i) => (
                      <motion.a
                        key={i}
                        href={href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/30 flex items-center justify-center transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Product Column */}
                <div>
                  <h4 className="font-semibold mb-4 text-white">Product</h4>
                  <ul className="space-y-3">
                    {['Features', 'Pricing', 'Integrations', 'API'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group"
                        >
                          {item}
                          <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h4 className="font-semibold mb-4 text-white">Company</h4>
                  <ul className="space-y-3">
                    {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group"
                        >
                          {item}
                          <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Legal & Support Column */}
                <div>
                  <h4 className="font-semibold mb-4 text-white">Legal</h4>
                  <ul className="space-y-3 mb-6">
                    {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group"
                        >
                          {item}
                          <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold mb-4 text-white">Support</h4>
                  <ul className="space-y-3">
                    {['Help Center', 'Contact', 'Status', 'Changelog'].map((item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-primary transition-colors inline-flex items-center group"
                        >
                          {item}
                          <ChevronRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-400 text-sm">
                  © 2026 FinQuest. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-primary transition-colors">
                    Sitemap
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    Accessibility
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    GDPR
                  </a>
                </div>
              </div>
            </div>
          </footer>

          {/* ============================================================================ */}
{/* AUTH MODAL - FULL REPLACEMENT */}
{/* ============================================================================ */}
<AnimatePresence>
  {isAuthModalOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 z-[60] modal-backdrop bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-6"
      >
        <ShineBorder className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
              </h2>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-400 mb-6">
              {authMode === 'login'
                ? 'Log in to access your financial dashboard'
                : 'Create your account and start your free trial'}
            </p>

            {/* --- GOOGLE BUTTON (NEW) --- */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 px-4 rounded-xl mb-6 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-800 flex-1"></div>
              <span className="text-gray-500 text-sm font-medium">OR</span>
              <div className="h-px bg-gray-800 flex-1"></div>
            </div>
            {/* --------------------------- */}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              <GradientButton type="submit" className="w-full text-lg py-3 font-semibold rounded-xl mt-2">
                {authMode === 'login' ? 'Log In' : 'Create Account'}
              </GradientButton>
            </form>

            {/* Toggle Mode */}
            <p className="text-center text-gray-400 mt-6">
              {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-primary hover:text-primary-400 font-semibold transition-colors hover:underline"
              >
                {authMode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </ShineBorder>
      </motion.div>
    </>
  )}
</AnimatePresence>
</div>
      )

      {/* Financial Calculator Modal - Outside loading check */}
      <FinancialCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
      />
    
      {/* Cursor Trail Effect */}
      <CursorTrail />
    </>
  );
}


// RetroGrid component inline since it's simple
const RetroGrid = ({ className = '' }) => {
  return <div className={`absolute inset-0 retro-grid opacity-20 ${className}`} />;
};

// Enhanced Phone Mockup Component
const EnhancedPhoneMockup = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isScreenActive, setIsScreenActive] = useState(true);

  // Auto-slide between screens every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScreenActive(false);
      setTimeout(() => {
        setCurrentScreen((prev) => (prev + 1) % 2);
        setIsScreenActive(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Floating phone container */}
      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative max-w-sm mx-auto"
      >
        {/* Subtle glow behind phone */}
        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-[3rem] -z-10" />
        
        {/* Phone device with glowing border */}
        <div className="relative phone-mockup p-4 shadow-2xl shadow-primary/30 border-2 border-primary/40"
             style={{ transform: "perspective(1000px) rotateY(-2deg)", boxShadow: '0 0 40px rgba(200, 255, 0, 0.3), 0 0 80px rgba(200, 255, 0, 0.1)' }}>
          
          {/* Screen container with overflow hidden for sliding */}
          <div className="phone-screen overflow-hidden relative">
            <motion.div
              animate={{ x: currentScreen === 0 ? "0%" : "-50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
              style={{ width: '200%' }}
            >
              {/* Screen 1: Expense Tracker */}
              <div className="w-1/2 flex-shrink-0 p-6">
                <ExpenseTrackerScreen isActive={isScreenActive && currentScreen === 0} />
              </div>

              {/* Screen 2: Learning Platform */}
              <div className="w-1/2 flex-shrink-0 p-6">
                <LearningPlatformScreen isActive={isScreenActive && currentScreen === 1} />
              </div>
            </motion.div>
          </div>

          {/* Screen indicator dots */}
          <div className="flex gap-2 justify-center mt-4 pb-2">
            {[0, 1].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentScreen === index ? 1.2 : 1,
                  opacity: currentScreen === index ? 1 : 0.4,
                }}
                className="w-2 h-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Expense Tracker Screen Component
const ExpenseTrackerScreen = ({ isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.7 }}
      transition={{ duration: 0.5 }}
    >
      {/* Summary Section */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm mb-2">Monthly Expenses</p>
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: isActive ? 1 : 0.9 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-1"
        >
          ₹2,45,680
        </motion.h2>
        <p className="text-green-400 text-sm flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          -8.2% vs last month
        </p>
      </div>

      {/* Animated Bar Chart */}
      <div className="portfolio-card p-4 mb-6 h-32 flex items-end justify-between gap-2">
        {[70, 45, 85, 60, 90, 55, 75].map((height, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: isActive ? `${height}%` : "20%" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
            className="flex-1 bg-primary/30 rounded-t"
          />
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        {[
          { name: 'Food & Dining', value: '₹45K', percent: '18%', color: 'bg-primary' },
          { name: 'Transportation', value: '₹22K', percent: '9%', color: 'bg-primary/70' },
          { name: 'Shopping', value: '₹68K', percent: '28%', color: 'bg-primary/50' },
        ].map((category, i) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-1 h-8 ${category.color} rounded-full`} />
              <span className="text-gray-300">{category.name}</span>
            </div>
            <div className="text-right">
              <p className="font-semibold">{category.value}</p>
              <p className="text-gray-400 text-xs">{category.percent}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Learning Platform Screen Component
const LearningPlatformScreen = ({ isActive }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0.7 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Learn: Investing 101</h3>
          <span className="text-primary text-sm font-medium">75%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isActive ? "75%" : "0%" }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </motion.div>

      {/* Lesson Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="portfolio-card p-4 mb-4"
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">📚</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1">Diversification Strategy</h4>
            <p className="text-xs text-gray-400">5 min read • Chapter 3</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex-1 h-1.5 bg-primary rounded-full" />
          <div className="flex-1 h-1.5 bg-primary rounded-full" />
          <div className="flex-1 h-1.5 bg-primary/30 rounded-full" />
          <div className="flex-1 h-1.5 bg-white/10 rounded-full" />
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="grid grid-cols-2 gap-3 mb-4"
      >
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Completed</p>
          <p className="text-xl font-bold text-primary">12</p>
        </div>
        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400 mb-1">Streak</p>
          <p className="text-xl font-bold text-primary">7🔥</p>
        </div>
      </motion.div>

      {/* Quiz Section */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-3"
        >
          <p className="text-sm font-semibold text-gray-300">Quick Quiz:</p>
          <span className="text-xs text-gray-400">2/2</span>
        </motion.div>
        
        <div className="space-y-2">
          {[
            { id: 'a', text: 'Stocks only' },
            { id: 'b', text: 'Mix of stocks & bonds' },
          ].map((option, i) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                selectedOption === option.id
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-white/5 border-2 border-white/10 hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id ? 'border-primary' : 'border-gray-400'
                }`}>
                  {selectedOption === option.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                  )}
                </div>
                <span className={selectedOption === option.id ? 'text-white' : 'text-gray-300'}>
                  {option.text}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
          >
            <p className="text-xs text-primary flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Correct! Diversification reduces risk.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default App;
