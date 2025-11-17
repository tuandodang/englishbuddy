'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  MessageCircle,
  Mic,
  Trophy,
  Star,
  Users,
  BookOpenCheck,
  Gamepad2,
  Calendar,
  TrendingUp,
  Flame,
  Award,
  GraduationCap,
} from 'lucide-react';
import { playClick, playWhoosh } from '@/lib/soundEffects';
import { BuddyMascot } from '@/components/BuddyMascot';

export default function HomePage() {
  const mainFeatures = [
    {
      icon: BookOpen,
      title: 'Learn Vocabulary',
      description: 'Discover new words with fun pictures and sounds!',
      href: '/vocabulary',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: Mic,
      title: 'Practice Speaking',
      description: 'Say words and get stars for your pronunciation!',
      href: '/pronunciation',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: MessageCircle,
      title: 'Chat with Buddy',
      description: 'Talk to your AI friend in English!',
      href: '/conversation',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: BookOpenCheck,
      title: 'Read Stories',
      description: 'Enjoy fun stories and answer questions!',
      href: '/stories',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: Gamepad2,
      title: 'Play Games',
      description: '6 fun learning games to master English!',
      href: '/games',
      color: 'from-orange-400 to-red-500',
      badge: 'NEW',
    },
    {
      icon: Calendar,
      title: 'Daily Challenges',
      description: 'Complete challenges and earn bonus points!',
      href: '/daily-challenge',
      color: 'from-cyan-400 to-blue-500',
      badge: 'NEW',
    },
  ];

  const secondaryFeatures = [
    {
      icon: Trophy,
      title: 'Your Progress',
      description: 'Badges & achievements',
      href: '/progress',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: TrendingUp,
      title: 'Leaderboard',
      description: 'Compete with friends',
      href: '/leaderboard',
      color: 'from-emerald-400 to-emerald-600',
      badge: 'NEW',
    },
    {
      icon: Users,
      title: 'Parent Dashboard',
      description: 'Track learning progress',
      href: '/parent',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      icon: GraduationCap,
      title: 'Classroom Mode',
      description: 'For teachers & schools',
      href: '/classroom',
      color: 'from-purple-500 to-purple-700',
      badge: 'NEW',
    },
    {
      icon: Award,
      title: 'AI Settings',
      description: 'Configure AI (OpenAI/Ollama/Mock)',
      href: '/settings',
      color: 'from-blue-500 to-cyan-500',
      badge: 'NEW',
    },
  ];

  const games = [
    { name: 'Spelling Bee', emoji: '🐝', href: '/games/spelling' },
    { name: 'Word Match', emoji: '🎴', href: '/games/word-match' },
    { name: 'Memory Cards', emoji: '🃏', href: '/games/memory' },
    { name: 'Word Puzzle', emoji: '🧩', href: '/games/word-puzzle' },
    { name: 'Listening', emoji: '👂', href: '/games/listening' },
    { name: 'Speed Typing', emoji: '⌨️', href: '/games/typing' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Welcome Mascot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <BuddyMascot mood="excited" size="large" message="Welcome! Let's learn English together! 🌟" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-bounce" />
            <h1 className="text-7xl font-bold text-transparent bg-clip-text animated-gradient">
              English Buddy
            </h1>
            <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 animate-bounce" />
          </div>
          <p className="text-4xl text-gray-700 font-bold mb-3">
            Learn English the Fun Way! 🎉
          </p>
          <p className="text-2xl text-gray-600 mb-8">
            AI-powered learning • Fun games • Real progress tracking
          </p>

          {/* Quick CTA */}
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/auth/signin">
              <button
                className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl px-12 py-8"
                onClick={() => {
                  playWhoosh();
                  playClick();
                }}
              >
                Start Learning Free! 🚀
              </button>
            </Link>
            <Link href="/daily-challenge">
              <button
                className="kid-button bg-gradient-to-r from-orange-400 to-red-500 text-white text-2xl px-12 py-8 flex items-center gap-3"
                onClick={() => {
                  playWhoosh();
                  playClick();
                }}
              >
                <Flame className="w-8 h-8 animate-bounce" />
                Daily Challenge
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Main Feature Cards */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            🎯 Core Learning Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={feature.href}>
                  <div
                    className="kid-card h-full hover:scale-105 transition-all cursor-pointer group relative"
                    onClick={playClick}
                  >
                    {feature.badge && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-base font-bold animate-pulse">
                        {feature.badge}
                      </div>
                    )}
                    <div
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:animate-bounce shadow-xl`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xl">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Games Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="kid-card bg-gradient-to-r from-purple-400 to-pink-400 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Gamepad2 className="w-10 h-10" />
                  Learning Games
                </h2>
                <p className="text-xl">6 exciting games to practice your English!</p>
              </div>
              <Link href="/games">
                <button className="kid-button bg-white text-purple-600 hover:bg-gray-100 text-xl px-6">
                  Play All Games →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {games.map((game, index) => (
                <Link key={game.name} href={game.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center hover:bg-white/40 transition-all cursor-pointer border-2 border-white/30 shadow-xl"
                    onClick={playClick}
                  >
                    <div className="text-7xl mb-3 hover:animate-bounce">{game.emoji}</div>
                    <div className="text-base font-bold">{game.name}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Secondary Features */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            📊 Track & Compete
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={feature.href}>
                  <div className="kid-card h-full hover:scale-105 transition-all cursor-pointer group relative" onClick={playClick}>
                    {feature.badge && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        {feature.badge}
                      </div>
                    )}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:animate-bounce shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-base">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-10">
            🌟 Why English Buddy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="kid-card bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-200"
            >
              <div className="text-7xl mb-3">📚</div>
              <div className="text-6xl font-bold text-blue-600 mb-3">500+</div>
              <div className="text-gray-700 font-bold text-lg">Words to Learn</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="kid-card bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-200"
            >
              <div className="text-7xl mb-3">🎮</div>
              <div className="text-6xl font-bold text-green-600 mb-3">20+</div>
              <div className="text-gray-700 font-bold text-lg">Fun Activities</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="kid-card bg-gradient-to-br from-purple-50 to-purple-100 border-4 border-purple-200"
            >
              <div className="text-7xl mb-3">🤖</div>
              <div className="text-6xl font-bold text-purple-600 mb-3">AI</div>
              <div className="text-gray-700 font-bold text-lg">Powered Chat</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -2 }}
              className="kid-card bg-gradient-to-br from-orange-50 to-orange-100 border-4 border-orange-200"
            >
              <div className="text-7xl mb-3">✅</div>
              <div className="text-6xl font-bold text-orange-600 mb-3">100%</div>
              <div className="text-gray-700 font-bold text-lg">Safe for Kids</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="kid-card bg-gradient-to-br from-blue-50 to-purple-50 text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Personalized Learning
            </h3>
            <p className="text-gray-600">
              AI adapts to your level and learning speed
            </p>
          </div>

          <div className="kid-card bg-gradient-to-br from-green-50 to-cyan-50 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Gamified Progress
            </h3>
            <p className="text-gray-600">
              Earn points, badges, and climb the leaderboard!
            </p>
          </div>

          <div className="kid-card bg-gradient-to-br from-yellow-50 to-orange-50 text-center">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Parent & Teacher Tools
            </h3>
            <p className="text-gray-600">
              Track progress with detailed analytics
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="kid-card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center border-8 border-white shadow-2xl"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-9xl mb-8"
          >
            🚀
          </motion.div>
          <h2 className="text-5xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-3xl mb-10">
            Join thousands of kids learning English the fun way!
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Link href="/auth/signin">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="kid-button bg-white text-purple-600 hover:bg-gray-100 text-3xl px-16 py-8 shadow-2xl"
                onClick={() => {
                  playWhoosh();
                  playClick();
                }}
              >
                Get Started Free! 🎉
              </motion.button>
            </Link>
          </div>
          <p className="text-xl mt-6 opacity-90">
            ✨ No credit card required • 100% Safe for kids • Free forever ✨
          </p>
        </motion.div>
      </div>
    </div>
  );
}
