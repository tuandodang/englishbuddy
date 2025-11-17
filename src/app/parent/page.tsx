'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Clock,
  Award,
  BookOpen,
  Mic,
  MessageCircle,
  Star,
  Target,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState('Emma');

  // Sample data (in production, fetch from API)
  const progressData = [
    { date: 'Mon', score: 75 },
    { date: 'Tue', score: 82 },
    { date: 'Wed', score: 78 },
    { date: 'Thu', score: 88 },
    { date: 'Fri', score: 92 },
    { date: 'Sat', score: 85 },
    { date: 'Sun', score: 95 },
  ];

  const activityData = [
    { name: 'Vocabulary', value: 35 },
    { name: 'Pronunciation', value: 25 },
    { name: 'Conversation', value: 20 },
    { name: 'Stories', value: 20 },
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 25 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 20 },
    { day: 'Thu', minutes: 35 },
    { day: 'Fri', minutes: 40 },
    { day: 'Sat', minutes: 15 },
    { day: 'Sun', minutes: 28 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  const stats = [
    {
      icon: Clock,
      label: 'Total Time',
      value: '12h 30m',
      change: '+15%',
      color: 'from-blue-400 to-blue-600',
    },
    {
      icon: BookOpen,
      label: 'Words Learned',
      value: '247',
      change: '+23',
      color: 'from-green-400 to-green-600',
    },
    {
      icon: Star,
      label: 'Total Points',
      value: '1,850',
      change: '+120',
      color: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: Target,
      label: 'Avg. Accuracy',
      value: '87%',
      change: '+5%',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  const recentBadges = [
    { name: '7-Day Streak', emoji: '🔥', date: '2 days ago' },
    { name: 'Vocabulary Master', emoji: '📚', date: '5 days ago' },
    { name: 'Perfect Score', emoji: '⭐', date: '1 week ago' },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Parent Dashboard
            </h1>
            <p className="text-gray-600">Track your child's learning progress</p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Child Selector */}
        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedChild('Emma')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedChild === 'Emma'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              👧 Emma (Age 8)
            </button>
            <button
              onClick={() => setSelectedChild('Jack')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                selectedChild === 'Jack'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              👦 Jack (Age 10)
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="kid-card"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-bold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Progress Chart */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Weekly Progress
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Distribution */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Activity Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={activityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Spent Chart */}
        <div className="kid-card mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-600" />
            Weekly Time Spent (Minutes)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minutes" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Achievements & Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Badges */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-600" />
              Recent Badges
            </h3>
            <div className="space-y-4">
              {recentBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
                >
                  <div className="text-4xl">{badge.emoji}</div>
                  <div>
                    <h4 className="font-bold text-gray-800">{badge.name}</h4>
                    <p className="text-sm text-gray-600">{badge.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="kid-card">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Skills Breakdown
            </h3>
            <div className="space-y-4">
              {[
                { skill: 'Vocabulary', level: 85, icon: BookOpen, color: 'bg-blue-500' },
                { skill: 'Pronunciation', level: 78, icon: Mic, color: 'bg-green-500' },
                { skill: 'Conversation', level: 90, icon: MessageCircle, color: 'bg-purple-500' },
                { skill: 'Reading', level: 82, icon: BookOpen, color: 'bg-yellow-500' },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-800">
                        {item.skill}
                      </span>
                    </div>
                    <span className="font-bold text-gray-800">{item.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="kid-card mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💡 Recommendations
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Emma is doing great with vocabulary! Consider increasing conversation practice.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Pronunciation scores are improving steadily. Keep up the daily practice!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Current streak: 7 days! Encourage her to maintain this momentum.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
