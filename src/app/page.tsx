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
  BookOpenCheck
} from 'lucide-react';

export default function HomePage() {
  const features = [
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
      icon: Trophy,
      title: 'Your Progress',
      description: 'See your badges and achievements!',
      href: '/progress',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: Users,
      title: 'Parent Dashboard',
      description: 'Track learning progress',
      href: '/parent',
      color: 'from-indigo-400 to-indigo-600',
    },
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
          <p className="text-2xl text-gray-700 font-semibold">
            Learn English the Fun Way! 🎉
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Play games, learn words, and talk to your AI friend!
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="kid-card h-full hover:scale-105 transition-transform cursor-pointer group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:animate-bounce`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 kid-card">
            <div>
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Words to Learn</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-4xl font-bold text-green-600">20+</div>
              <div className="text-gray-600">Fun Activities</div>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <div className="text-4xl font-bold text-purple-600">AI</div>
              <div className="text-gray-600">Powered Chat</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
