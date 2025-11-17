'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, Star, Trophy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface Word {
  word: string;
  hint: string;
  emoji: string;
}

export default function SpellingGamePage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const words: Word[] = [
    { word: 'APPLE', hint: 'A red or green fruit', emoji: '🍎' },
    { word: 'BANANA', hint: 'A long yellow fruit', emoji: '🍌' },
    { word: 'CAT', hint: 'A furry pet that meows', emoji: '🐱' },
    { word: 'DOG', hint: 'A pet that barks', emoji: '🐕' },
    { word: 'SUN', hint: 'Bright light in the sky', emoji: '☀️' },
    { word: 'BOOK', hint: 'You read this', emoji: '📚' },
    { word: 'TREE', hint: 'A tall plant with leaves', emoji: '🌳' },
    { word: 'WATER', hint: 'You drink this', emoji: '💧' },
    { word: 'HAPPY', hint: 'A feeling of joy', emoji: '😊' },
    { word: 'FRIEND', hint: 'Someone you like', emoji: '👫' },
  ];

  const currentWord = words[currentWordIndex];

  const playWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userInput.toUpperCase() === currentWord.word) {
      setScore(score + 10);
      toast.success('Perfect! +10 points! ⭐');

      if (currentWordIndex === words.length - 1) {
        setShowConfetti(true);
        setGameOver(true);
        toast.success('You won the game! 🎉');
      } else {
        setTimeout(() => {
          setCurrentWordIndex(currentWordIndex + 1);
          setUserInput('');
        }, 1000);
      }
    } else {
      setLives(lives - 1);
      toast.error('Try again! 💪');

      if (lives - 1 <= 0) {
        setGameOver(true);
        toast.error('Game Over! Try again! 🔄');
      }
      setUserInput('');
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setUserInput('');
    setScore(0);
    setLives(3);
    setGameOver(false);
    setShowConfetti(false);
  };

  if (gameOver) {
    return (
      <div className="min-h-screen py-8 px-4">
        {showConfetti && <Confetti />}
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="kid-card text-center"
          >
            <div className="text-9xl mb-6">
              {lives > 0 ? '🎉' : '💪'}
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              {lives > 0 ? 'You Win!' : 'Game Over!'}
            </h2>
            <div className="text-7xl font-bold text-blue-600 mb-6">
              {score} Points
            </div>
            <p className="text-2xl text-gray-700 mb-8">
              {lives > 0
                ? 'Amazing spelling! You got them all! ⭐'
                : 'Keep practicing! You can do better! 💫'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/games">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="kid-card flex items-center gap-2 bg-yellow-100">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold">{score}</span>
            </div>

            <div className="kid-card flex items-center gap-2 bg-red-100">
              <span className="text-2xl">
                {'❤️'.repeat(lives)}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="kid-card"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🐝 Spelling Bee
              </h2>
              <p className="text-xl text-gray-600">
                Word {currentWordIndex + 1} of {words.length}
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="text-9xl mb-6">{currentWord.emoji}</div>

              <button
                onClick={playWord}
                className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2 mx-auto mb-4"
              >
                <Volume2 className="w-6 h-6" />
                <span className="text-xl">Hear the Word</span>
              </button>

              <p className="text-2xl text-gray-700 mb-8">
                Hint: {currentWord.hint}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type the word here..."
                className="w-full p-6 rounded-2xl border-4 border-blue-200 focus:border-blue-400 focus:outline-none text-3xl text-center font-bold uppercase mb-6"
                autoFocus
              />

              <button
                type="submit"
                disabled={!userInput.trim()}
                className="kid-button w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer ✓
              </button>
            </form>

            <div className="mt-8 text-center">
              <div className="flex justify-center gap-2">
                {words.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full ${
                      index < currentWordIndex
                        ? 'bg-green-500'
                        : index === currentWordIndex
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
