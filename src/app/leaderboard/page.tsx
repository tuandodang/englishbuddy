'use client';

import { motion } from 'framer-motion';
import { Home, Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  avatar: string;
  streak: number;
  badge: string;
}

export default function LeaderboardPage() {
  // Sample data (in production, fetch from API)
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Emma Star', points: 2850, avatar: '👧', streak: 15, badge: '👑' },
    { rank: 2, name: 'Jack Champion', points: 2680, avatar: '👦', streak: 12, badge: '🏆' },
    { rank: 3, name: 'Sophie Bright', points: 2520, avatar: '👱‍♀️', streak: 10, badge: '⭐' },
    { rank: 4, name: 'Liam Swift', points: 2340, avatar: '👨', streak: 8, badge: '🎯' },
    { rank: 5, name: 'Olivia Rose', points: 2180, avatar: '👩', streak: 7, badge: '🌟' },
    { rank: 6, name: 'Noah Wise', points: 2050, avatar: '👦', streak: 6, badge: '📚' },
    { rank: 7, name: 'Ava Smart', points: 1920, avatar: '👧', streak: 5, badge: '💡' },
    { rank: 8, name: 'Ethan Quick', points: 1850, avatar: '👨', streak: 4, badge: '⚡' },
    { rank: 9, name: 'Mia Clever', points: 1750, avatar: '👱‍♀️', streak: 3, badge: '🎨' },
    { rank: 10, name: 'Lucas Ace', points: 1680, avatar: '👦', streak: 2, badge: '🎮' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Medal className="w-8 h-8 text-amber-600" />;
    return <span className="text-2xl font-bold text-gray-600">#{rank}</span>;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'from-gray-300 to-gray-400 text-gray-800';
    if (rank === 3) return 'from-amber-400 to-amber-600 text-white';
    return 'from-white to-gray-50';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-500" />
              Leaderboard
            </h1>
            <p className="text-xl text-gray-600">
              Top English learners this week! 🌟
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-8 justify-center">
          <button className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            This Week
          </button>
          <button className="px-6 py-3 rounded-xl font-bold bg-white hover:bg-gray-100">
            This Month
          </button>
          <button className="px-6 py-3 rounded-xl font-bold bg-white hover:bg-gray-100">
            All Time
          </button>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mt-12"
          >
            <div className="kid-card bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800">
              <Medal className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <div className="text-6xl mb-3">{leaderboard[1].avatar}</div>
              <h3 className="text-xl font-bold mb-2">{leaderboard[1].name}</h3>
              <div className="text-3xl font-bold mb-2">
                {leaderboard[1].points}
              </div>
              <div className="text-sm">points</div>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="kid-card bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
              <Crown className="w-20 h-20 mx-auto mb-4 fill-white animate-bounce" />
              <div className="text-8xl mb-3">{leaderboard[0].avatar}</div>
              <h3 className="text-2xl font-bold mb-2">{leaderboard[0].name}</h3>
              <div className="text-5xl font-bold mb-2">
                {leaderboard[0].points}
              </div>
              <div className="text-lg">points</div>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="kid-card bg-gradient-to-br from-amber-400 to-amber-600 text-white">
              <Medal className="w-16 h-16 mx-auto mb-4 text-amber-800" />
              <div className="text-6xl mb-3">{leaderboard[2].avatar}</div>
              <h3 className="text-xl font-bold mb-2">{leaderboard[2].name}</h3>
              <div className="text-3xl font-bold mb-2">
                {leaderboard[2].points}
              </div>
              <div className="text-sm">points</div>
            </div>
          </motion.div>
        </div>

        {/* Rest of Leaderboard */}
        <div className="space-y-3">
          {leaderboard.slice(3).map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 3) * 0.05 }}
              className={`kid-card flex items-center justify-between p-6 bg-gradient-to-r ${getRankColor(
                entry.rank
              )}`}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-16">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="text-5xl">{entry.avatar}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {entry.name}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      {entry.points} pts
                    </span>
                    <span className="flex items-center gap-1">
                      🔥 {entry.streak} day streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-4xl">{entry.badge}</div>
            </motion.div>
          ))}
        </div>

        {/* Your Rank (Sample) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="kid-card bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center mt-8"
        >
          <h3 className="text-2xl font-bold mb-2">Your Rank</h3>
          <div className="flex items-center justify-center gap-6">
            <div className="text-4xl font-bold">#15</div>
            <div className="text-5xl">👦</div>
            <div>
              <div className="text-3xl font-bold">1,580 points</div>
              <div className="text-lg">Keep learning to climb higher! 📈</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link href="/vocabulary">
            <button className="kid-button bg-gradient-to-r from-green-500 to-green-600 text-white text-xl">
              <TrendingUp className="w-6 h-6 inline mr-2" />
              Start Learning to Earn Points!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
