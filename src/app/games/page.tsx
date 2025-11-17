'use client';

import { motion } from 'framer-motion';
import { Home, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function GamesPage() {
  const games = [
    {
      id: 'spelling',
      title: 'Spelling Bee',
      emoji: '🐝',
      description: 'Spell words correctly to win!',
      color: 'from-yellow-400 to-orange-500',
      href: '/games/spelling',
    },
    {
      id: 'word-match',
      title: 'Word Match',
      emoji: '🎴',
      description: 'Match words with pictures!',
      color: 'from-pink-400 to-pink-600',
      href: '/games/word-match',
    },
    {
      id: 'listening',
      title: 'Listening Challenge',
      emoji: '👂',
      description: 'Listen and choose the right word!',
      color: 'from-purple-400 to-purple-600',
      href: '/games/listening',
    },
    {
      id: 'word-puzzle',
      title: 'Word Puzzle',
      emoji: '🧩',
      description: 'Unscramble the letters!',
      color: 'from-green-400 to-green-600',
      href: '/games/word-puzzle',
    },
    {
      id: 'memory',
      title: 'Memory Cards',
      emoji: '🃏',
      description: 'Find matching pairs!',
      color: 'from-blue-400 to-blue-600',
      href: '/games/memory',
    },
    {
      id: 'typing',
      title: 'Speed Typing',
      emoji: '⌨️',
      description: 'Type words as fast as you can!',
      color: 'from-red-400 to-red-600',
      href: '/games/typing',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Gamepad2 className="w-12 h-12 text-purple-600" />
              Learning Games
            </h1>
            <p className="text-xl text-gray-600">
              Play fun games and learn English! 🎮
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={game.href}>
                <div className="kid-card hover:scale-105 transition-transform cursor-pointer h-full">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-5xl">{game.emoji}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    {game.title}
                  </h3>
                  <p className="text-gray-600 text-center text-lg">
                    {game.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="kid-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center mt-12"
        >
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-3xl font-bold mb-2">Daily Challenge</h3>
          <p className="text-xl mb-4">
            Complete all games today to earn a special badge!
          </p>
          <div className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-lg">
            3/6 Games Completed Today
          </div>
        </motion.div>
      </div>
    </div>
  );
}
