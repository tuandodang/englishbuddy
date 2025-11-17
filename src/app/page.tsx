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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" />
            <h1 className="text-6xl font-bold text-transparent bg-clip-text animated-gradient">
              English Buddy
            </h1>
            <Star className="w-12 h-12 text-yellow-400 fill-yellow-400 animate-bounce" />
          </div>
          <p className="text-3xl text-gray-700 font-bold mb-2">
            Learn English the Fun Way! 🎉
          </p>
          <p className="text-xl text-gray-600 mb-6">
            AI-powered learning • Fun games • Real progress tracking
          </p>

          {/* Quick CTA */}
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <button className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl px-8">
                Start Learning Free! 🚀
              </button>
            </Link>
            <Link href="/daily-challenge">
              <button className="kid-button bg-gradient-to-r from-orange-400 to-red-500 text-white text-xl px-8 flex items-center gap-2">
                <Flame className="w-6 h-6" />
                Daily Challenge
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Main Feature Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🎯 Core Learning Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="kid-card h-full hover:scale-105 transition-transform cursor-pointer group relative">
                    {feature.badge && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        {feature.badge}
                      </div>
                    )}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:animate-bounce`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{feature.description}</p>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {games.map((game, index) => (
                <Link key={game.name} href={game.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer"
                  >
                    <div className="text-5xl mb-2">{game.emoji}</div>
                    <div className="text-sm font-bold">{game.name}</div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Secondary Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📊 Track & Compete
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {secondaryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="kid-card h-full hover:scale-105 transition-transform cursor-pointer group relative">
                    {feature.badge && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {feature.badge}
                      </div>
                    )}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:animate-bounce`}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            🌟 Why English Buddy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="kid-card bg-blue-50">
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700 font-semibold">Words to Learn</div>
            </div>
            <div className="kid-card bg-green-50">
              <div className="text-5xl font-bold text-green-600 mb-2">20+</div>
              <div className="text-gray-700 font-semibold">Fun Activities</div>
            </div>
            <div className="kid-card bg-purple-50">
              <div className="text-5xl font-bold text-purple-600 mb-2">AI</div>
              <div className="text-gray-700 font-semibold">Powered Chat</div>
            </div>
            <div className="kid-card bg-orange-50">
              <div className="text-5xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-700 font-semibold">Safe for Kids</div>
            </div>
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
          className="kid-card bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-center"
        >
          <div className="text-7xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-2xl mb-8">
            Join thousands of kids learning English the fun way!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <button className="kid-button bg-white text-purple-600 hover:bg-gray-100 text-2xl px-10 py-6">
                Get Started Free! 🎉
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
