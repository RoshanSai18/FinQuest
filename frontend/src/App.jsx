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

      {!isLoading && (
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
              <div className="flex items-center justify-between">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <Reveal>
                  <div className="text-center lg:text-left">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Badge pulse className="mb-6">
                        <Sparkles className="w-4 h-4 inline mr-2" />
                        AI-Powered Financial Planning
                      </Badge>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                    >
                      Master your money,{' '}
                      <TextHighlight>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          className="gradient-text"
                        >
                          stress-free
                        </motion.span>
                      </TextHighlight>
                    </motion.h1>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl text-gray-400 mb-8 max-w-2xl"
                    >
                      Run thousands of financial scenarios, get AI-powered insights, and make
                      confident decisions before life's biggest moments
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                      <ShineBorderButton
                        onClick={() => {
                          setAuthMode('signup');
                          setIsAuthModalOpen(true);
                        }}
                        className="text-lg px-8 py-4"
                      >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </ShineBorderButton>

                      <GradientButton 
                        variant="outline" 
                        className="text-lg px-8 py-4"
                        onClick={() => setIsCalculatorModalOpen(true)}
                      >
                        <Play className="w-5 h-5 mr-2 inline" />
                        Test Demo
                      </GradientButton>
                    </motion.div>

                    <p className="text-sm text-gray-500 mt-6">
                      No credit card required • 14-day free trial • Cancel anytime
                    </p>
                  </div>
                </Reveal>

                {/* Right Content - Phone Mockup */}
                <Reveal delay={0.3}>
                  <div className="relative">
                    <div className="phone-mockup p-4 max-w-sm mx-auto">
                      <div className="phone-screen p-6">
                        {/* Portfolio Overview */}
                        <div className="mb-6">
                          <p className="text-gray-400 text-sm mb-2">Total Portfolio</p>
                          <h2 className="text-4xl font-bold mb-1">₹4,52,847</h2>
                          <p className="text-green-400 text-sm flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            +12.4% today
                          </p>
                        </div>

                        {/* Chart Placeholder */}
                        <div className="portfolio-card p-4 mb-6 h-32 flex items-end justify-between gap-2">
                          {[40, 65, 45, 80, 60, 90, 70].map((height, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className="flex-1 bg-primary/30 rounded-t"
                            />
                          ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-4 gap-2 mb-6">
                          {['Invest', 'Pay', 'Save', 'Goals'].map((action) => (
                            <button
                              key={action}
                              className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs"
                            >
                              {action}
                            </button>
                          ))}
                        </div>

                        {/* Holdings */}
                        <div className="space-y-3">
                          {[
                            { name: 'Nifty 50', value: '₹1.2L', change: '+5.2%' },
                            { name: 'Gold ETF', value: '₹85K', change: '+2.1%' },
                            { name: 'Mutual Funds', value: '₹1.8L', change: '+8.4%' },
                          ].map((holding) => (
                            <div
                              key={holding.name}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-gray-300">{holding.name}</span>
                              <div className="text-right">
                                <p className="font-semibold">{holding.value}</p>
                                <p className="text-green-400 text-xs">{holding.change}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
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
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Get started in <GradientText>3 simple steps</GradientText>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  From signup to financial clarity in minutes. No complicated setup required.
                </p>
              </div>
            </Reveal>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <Reveal key={index} delay={index * 0.15}>
                  <div className="relative">
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -left-4 z-20">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="w-12 h-12 rounded-full bg-primary text-dark font-bold text-lg flex items-center justify-center shadow-lg shadow-primary/50"
                      >
                        {item.step}
                      </motion.div>
                    </div>

                    {/* Card with Tilt Effect */}
                    <TiltCard className="p-8 h-full group" tiltIntensity={6}>
                      {/* Icon */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 text-3xl border border-primary/20 group-hover:border-primary/40 transition-colors">
                        {item.icon}
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>

                      {/* Hover Arrow */}
                      {index < 2 && (
                        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/30 group-hover:text-primary transition-colors z-20">
                          <ChevronRight className="w-8 h-8" />
                        </div>
                      )}
                    </TiltCard>
                  </div>
                </Reveal>
              ))}
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

          {/* ============================================================================ */}
          {/* 3D GLOBE SECTION */}
          {/* ============================================================================ */}
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <Globe />
              </Reveal>

              <Reveal delay={0.3}>
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    <GradientText>Global reach,</GradientText> local expertise
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    While we're built for Indian households, FinQuest supports international
                    investments, multi-currency tracking, and global market analysis
                  </p>
                  <div className="space-y-4">
                    {[
                      '150+ currencies supported',
                      'Real-time forex conversion',
                      'International stock markets',
                      'NRI-friendly features',
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </Section>

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
                    Join 50,000+ users
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
                      { Icon: Twitter, href: '#' },
                      { Icon: Linkedin, href: '#' },
                      { Icon: Github, href: '#' },
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
                  © 2026 FinQuest. Built with ❤️ in India. All rights reserved.
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
          {/* AUTH MODAL */}
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
                  className="fixed inset-0 z-[60] modal-backdrop"
                />

                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="fixed inset-0 z-[70] flex items-center justify-center p-6"
                >
                  <ShineBorder className="w-full max-w-md">
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold">
                          {authMode === 'login' ? 'Welcome Back' : 'Get Started'}
                        </h2>
                        <button
                          onClick={() => setIsAuthModalOpen(false)}
                          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>

                      <p className="text-gray-400 mb-8">
                        {authMode === 'login'
                          ? 'Log in to access your financial dashboard'
                          : 'Create your account and start your free trial'}
                      </p>

                      {/* Form */}
                      <form onSubmit={handleAuthSubmit} className="space-y-6">
                        {authMode === 'signup' && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="John Doe"
                              className="form-input w-full px-4 py-3 rounded-lg"
                            />
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              required
                              placeholder="you@example.com"
                              className="form-input w-full pl-12 pr-4 py-3 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Password</label>
                          <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="form-input w-full px-4 py-3 rounded-lg"
                          />
                        </div>

                        <GradientButton type="submit" className="w-full text-lg py-3">
                          {authMode === 'login' ? 'Log In' : 'Create Account'}
                        </GradientButton>
                      </form>

                      {/* Toggle Mode */}
                      <p className="text-center text-gray-400 mt-6">
                        {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                        <button
                          onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                          className="text-primary hover:underline"
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
      )}

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

export default App;
