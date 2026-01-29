/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, TrendingUp, Shield } from 'lucide-react';
import { Badge, Card, Reveal } from './components/UIComponents';

const AnoAI = () => {
  const features = [
    {
      icon: Brain,
      title: 'Gemini AI Powered',
      description: 'Advanced AI models analyze your financial patterns and predict optimal strategies',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Machine learning algorithms forecast market trends and personalize recommendations',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared. AI processing happens securely',
    },
  ];

  return (
    <div className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 retro-grid opacity-10" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <Badge pulse className="mb-4">
              <Sparkles className="w-4 h-4 inline mr-2" />
              AI Technology
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Meet <span className="gradient-text">Ano AI</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your personal AI financial advisor powered by Google's Gemini. 
              Get intelligent insights, personalized recommendations, and predictive analysis.
            </p>
          </div>
        </Reveal>

        {/* AI Visualization */}
        <Reveal delay={0.2} className="mb-16">
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur-3xl" />
            <Card className="relative p-8 md:p-12 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="inline-block mb-6"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-dark" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Ask Ano Anything</h3>
              <p className="text-gray-400 mb-6">
                "Should I invest in mutual funds or real estate?"
                <br />
                "How can I reduce my tax liability?"
                <br />
                "What's my retirement readiness score?"
              </p>
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-primary font-mono text-sm">
                  🤖 AI is typing
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ...
                  </motion.span>
                </span>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={index} delay={0.3 + index * 0.1}>
                <Card hover className="p-6 h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Stats */}
        <Reveal delay={0.6} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'AI Models', value: '10+' },
              { label: 'Data Points', value: '1M+' },
              { label: 'Accuracy', value: '98%' },
              { label: 'Response Time', value: '<2s' },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-white/5">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AnoAI;
