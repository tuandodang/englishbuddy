'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface WordPair {
  word: string;
  emoji: string;
  matched: boolean;
}

export default function WordMatchPage() {
  const [pairs] = useState<WordPair[]>([
    { word: 'DOG', emoji: '🐕', matched: false },
    { word: 'CAT', emoji: '🐱', matched: false },
    { word: 'APPLE', emoji: '🍎', matched: false },
    { word: 'TREE', emoji: '🌳', matched: false },
    { word: 'SUN', emoji: '☀️', matched: false },
    { word: 'STAR', emoji: '⭐', matched: false },
    { word: 'BOOK', emoji: '📚', matched: false },
    { word: 'HEART', emoji: '❤️', matched: false },
  ]);

  const [matches, setMatches] = useState<WordPair[]>(
    pairs.map((p) => ({ ...p }))
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const words = matches.filter((p) => !p.matched).sort(() => Math.random() - 0.5);
  const emojis = matches.filter((p) => !p.matched).sort(() => Math.random() - 0.5);

  const handleWordClick = (word: string) => {
    if (selectedWord === word) {
      setSelectedWord(null);
      return;
    }
    setSelectedWord(word);

    if (selectedEmoji) {
      checkMatch(word, selectedEmoji);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
      return;
    }
    setSelectedEmoji(emoji);

    if (selectedWord) {
      checkMatch(selectedWord, emoji);
    }
  };

  const checkMatch = (word: string, emoji: string) => {
    const pair = pairs.find((p) => p.word === word && p.emoji === emoji);

    if (pair) {
      // Match!
      const newMatches = matches.map((m) =>
        m.word === word ? { ...m, matched: true } : m
      );
      setMatches(newMatches);
      setScore(score + 10);
      toast.success('Perfect match! +10 points! ⭐');

      if (newMatches.every((m) => m.matched)) {
        setShowConfetti(true);
        toast.success('You matched them all! 🎉');
      }
    } else {
      // No match
      toast.error('Not a match! Try again! 💪');
    }

    setSelectedWord(null);
    setSelectedEmoji(null);
  };

  const reset = () => {
    setMatches(pairs.map((p) => ({ ...p, matched: false })));
    setSelectedWord(null);
    setSelectedEmoji(null);
    setScore(0);
    setShowConfetti(false);
  };

  const allMatched = matches.every((m) => m.matched);

  return (
    <div className="min-h-screen py-8 px-4">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/games">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            🎴 Word Match
          </h1>

          <div className="kid-card flex items-center gap-2 bg-yellow-100">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-bold">{score}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="kid-card bg-blue-50 text-center mb-8">
          <p className="text-xl text-gray-700">
            Match the words with their emojis! Click a word and then its
            matching emoji.
          </p>
        </div>

        {!allMatched ? (
          <div className="grid grid-cols-2 gap-8">
            {/* Words Column */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Words
              </h3>
              {words.map((pair, index) => (
                <motion.button
                  key={pair.word}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleWordClick(pair.word)}
                  className={`kid-button w-full text-2xl py-6 transition-all ${
                    selectedWord === pair.word
                      ? 'bg-blue-500 text-white scale-105'
                      : 'bg-white hover:bg-blue-50'
                  }`}
                >
                  {pair.word}
                </motion.button>
              ))}
            </div>

            {/* Emojis Column */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Pictures
              </h3>
              {emojis.map((pair, index) => (
                <motion.button
                  key={pair.emoji}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleEmojiClick(pair.emoji)}
                  className={`kid-button w-full text-5xl py-6 transition-all ${
                    selectedEmoji === pair.emoji
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-white hover:bg-purple-50'
                  }`}
                >
                  {pair.emoji}
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="kid-card text-center"
          >
            <div className="text-9xl mb-6">🏆</div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              All Matched!
            </h2>
            <div className="text-7xl font-bold text-green-600 mb-6">
              {score} Points
            </div>
            <p className="text-2xl text-gray-700 mb-8">
              Perfect matching! You're amazing! ⭐
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Play Again
              </button>
              <Link href="/games">
                <button className="kid-button bg-white hover:bg-gray-100">
                  Back to Games
                </button>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Matched Pairs Display */}
        {!allMatched && matches.filter((m) => m.matched).length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Matched Pairs
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {matches
                .filter((m) => m.matched)
                .map((pair) => (
                  <motion.div
                    key={pair.word}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="kid-card bg-green-50 border-green-300 flex items-center gap-3 px-6 py-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-2xl font-bold text-gray-800">
                      {pair.word}
                    </span>
                    <span className="text-4xl">{pair.emoji}</span>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
