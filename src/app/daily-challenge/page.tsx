'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Calendar,
  Trophy,
  Star,
  CheckCircle,
  Lock,
  Flame,
} from 'lucide-react';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  points: number;
  completed: boolean;
  category: string;
  href: string;
}

export default function DailyChallengesPage() {
  const [currentStreak, setCurrentStreak] = useState(7);

  const dailyChallenges: Challenge[] = [
    {
      id: '1',
      title: 'Morning Vocabulary',
      description: 'Learn 10 new words',
      emoji: '📚',
      points: 50,
      completed: true,
      category: 'vocabulary',
      href: '/vocabulary',
    },
    {
      id: '2',
      title: 'Pronunciation Practice',
      description: 'Practice 5 words with 90%+ accuracy',
      emoji: '🎤',
      points: 40,
      completed: true,
      category: 'pronunciation',
      href: '/pronunciation',
    },
    {
      id: '3',
      title: 'AI Conversation',
      description: 'Chat with English Buddy for 5 minutes',
      emoji: '💬',
      points: 60,
      completed: false,
      category: 'conversation',
      href: '/conversation',
    },
    {
      id: '4',
      title: 'Story Time',
      description: 'Read and complete 1 story',
      emoji: '📖',
      points: 50,
      completed: false,
      category: 'reading',
      href: '/stories',
    },
    {
      id: '5',
      title: 'Game Master',
      description: 'Play any 2 learning games',
      emoji: '🎮',
      points: 40,
      completed: false,
      category: 'games',
      href: '/games',
    },
  ];

  const completedCount = dailyChallenges.filter((c) => c.completed).length;
  const totalPoints = dailyChallenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);

  const weeklyProgress = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: false },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Calendar className="w-12 h-12 text-blue-600" />
              Daily Challenges
            </h1>
            <p className="text-xl text-gray-600">
              Complete challenges to earn bonus points! 🎯
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="kid-card bg-gradient-to-br from-orange-400 to-red-500 text-white text-center"
          >
            <Flame className="w-12 h-12 mx-auto mb-3 fill-white" />
            <div className="text-5xl font-bold mb-2">{currentStreak}</div>
            <div className="text-xl">Day Streak 🔥</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="kid-card bg-gradient-to-br from-blue-400 to-purple-500 text-white text-center"
          >
            <CheckCircle className="w-12 h-12 mx-auto mb-3" />
            <div className="text-5xl font-bold mb-2">
              {completedCount}/{dailyChallenges.length}
            </div>
            <div className="text-xl">Completed Today</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="kid-card bg-gradient-to-br from-yellow-400 to-yellow-600 text-white text-center"
          >
            <Star className="w-12 h-12 mx-auto mb-3 fill-white" />
            <div className="text-5xl font-bold mb-2">{totalPoints}</div>
            <div className="text-xl">Points Earned</div>
          </motion.div>
        </div>

        {/* Weekly Progress */}
        <div className="kid-card mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            This Week's Progress
          </h3>
          <div className="grid grid-cols-7 gap-3">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="text-sm text-gray-600 mb-2">{day.day}</div>
                <div
                  className={`w-full h-16 rounded-xl flex items-center justify-center text-3xl ${
                    day.completed
                      ? 'bg-green-500'
                      : index === weeklyProgress.length - 1
                      ? 'bg-blue-200 border-4 border-blue-500 border-dashed'
                      : 'bg-gray-200'
                  }`}
                >
                  {day.completed ? '✓' : index === weeklyProgress.length - 1 ? '📅' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges List */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Today's Challenges
          </h3>

          <div className="space-y-4">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={challenge.completed ? '#' : challenge.href}>
                  <div
                    className={`kid-card flex items-center justify-between p-6 transition-all cursor-pointer ${
                      challenge.completed
                        ? 'bg-green-50 border-green-300 opacity-75'
                        : 'hover:scale-102 hover:shadow-2xl'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-6xl">{challenge.emoji}</div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-1">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-600 text-lg mb-2">
                          {challenge.description}
                        </p>
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Star className="w-5 h-5 fill-yellow-500" />
                          <span className="font-bold text-lg">
                            {challenge.points} points
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {challenge.completed ? (
                        <div className="bg-green-500 text-white p-4 rounded-2xl">
                          <CheckCircle className="w-12 h-12" />
                        </div>
                      ) : (
                        <button className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl">
                          Start →
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bonus Challenge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="kid-card bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center mt-8 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <Trophy className="w-16 h-16 text-yellow-300 fill-yellow-300 animate-bounce" />
          </div>
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-3xl font-bold mb-3">Weekly Bonus Challenge</h3>
          <p className="text-xl mb-4">
            Complete ALL daily challenges for 7 days in a row!
          </p>
          <div className="inline-block bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-2xl">
            Reward: 500 Bonus Points + Special Badge!
          </div>
          <div className="mt-4 text-lg">
            Current: {currentStreak}/7 days
          </div>
        </motion.div>

        {/* Tomorrow's Preview */}
        <div className="kid-card bg-gray-50 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-gray-500" />
            Tomorrow's Sneak Peek
          </h3>
          <p className="text-gray-600 text-lg">
            Come back tomorrow for fresh challenges and more points! 🌅
          </p>
          <div className="mt-4 flex gap-4">
            <span className="text-3xl">🎨</span>
            <span className="text-3xl">🎵</span>
            <span className="text-3xl">🌈</span>
            <span className="text-3xl">❓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
