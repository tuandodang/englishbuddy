'use client';

import { motion } from 'framer-motion';
import {
  Home,
  Trophy,
  Star,
  Flame,
  Award,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export default function ProgressPage() {
  const badges = [
    {
      id: 1,
      name: '7-Day Streak',
      emoji: '🔥',
      description: 'Practice for 7 days in a row',
      earned: true,
      date: '2 days ago',
    },
    {
      id: 2,
      name: 'Vocabulary Master',
      emoji: '📚',
      description: 'Learn 100 new words',
      earned: true,
      date: '1 week ago',
    },
    {
      id: 3,
      name: 'Perfect Score',
      emoji: '⭐',
      description: 'Get 100% on any quiz',
      earned: true,
      date: '3 days ago',
    },
    {
      id: 4,
      name: 'Pronunciation Pro',
      emoji: '🗣️',
      description: 'Score 90%+ on 20 pronunciations',
      earned: false,
      progress: 15,
      total: 20,
    },
    {
      id: 5,
      name: 'Conversation King',
      emoji: '👑',
      description: 'Have 50 conversations with Buddy',
      earned: false,
      progress: 32,
      total: 50,
    },
    {
      id: 6,
      name: 'Story Reader',
      emoji: '📖',
      description: 'Complete 10 stories',
      earned: false,
      progress: 7,
      total: 10,
    },
  ];

  const stats = [
    {
      icon: Star,
      label: 'Total Points',
      value: '1,850',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: Flame,
      label: 'Current Streak',
      value: '7 days',
      color: 'from-orange-400 to-red-600',
    },
    {
      icon: Trophy,
      label: 'Badges Earned',
      value: '3/6',
      color: 'from-purple-400 to-purple-600',
    },
    {
      icon: Target,
      label: 'Words Learned',
      value: '247',
      color: 'from-blue-400 to-blue-600',
    },
  ];

  const recentActivity = [
    {
      type: 'vocabulary',
      title: 'Completed Vocabulary Quiz',
      points: 50,
      time: '2 hours ago',
      icon: '📚',
    },
    {
      type: 'pronunciation',
      title: 'Perfect Pronunciation',
      points: 30,
      time: '5 hours ago',
      icon: '🎤',
    },
    {
      type: 'conversation',
      title: 'Chatted with Buddy',
      points: 40,
      time: 'Yesterday',
      icon: '💬',
    },
    {
      type: 'story',
      title: 'Read "The Magic Tree"',
      points: 60,
      time: '2 days ago',
      icon: '📖',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-500" />
              Your Progress
            </h1>
            <p className="text-xl text-gray-600">
              See your achievements and keep learning!
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="kid-card text-center"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-gray-600 mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-8 h-8 text-purple-600" />
            Your Badges
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`kid-card ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-70'
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-7xl mb-4 ${
                      badge.earned ? '' : 'grayscale opacity-50'
                    }`}
                  >
                    {badge.emoji}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {badge.name}
                  </h3>

                  <p className="text-gray-600 mb-4">{badge.description}</p>

                  {badge.earned ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Star className="w-5 h-5 fill-green-600" />
                      <span className="font-bold">Earned {badge.date}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>
                          {badge.progress}/{badge.total}
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                          style={{
                            width: `${
                              ((badge.progress || 0) / (badge.total || 1)) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            Recent Activity
          </h2>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="kid-card flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{activity.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600">{activity.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-xl">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  <span className="font-bold text-xl text-yellow-600">
                    +{activity.points}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Motivational Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="kid-card bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center mt-12"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold mb-2">Keep Going!</h3>
          <p className="text-xl">
            You're doing amazing! Practice every day to unlock more badges! 🌟
          </p>
        </motion.div>
      </div>
    </div>
  );
}
