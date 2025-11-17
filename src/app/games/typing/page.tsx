'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Timer, Zap } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

export default function TypingGamePage() {
  const [words] = useState([
    'cat', 'dog', 'sun', 'moon', 'tree', 'book', 'apple', 'water',
    'happy', 'smile', 'friend', 'family', 'school', 'play', 'learn',
    'star', 'cloud', 'flower', 'music', 'dance', 'sing', 'jump'
  ]);

  const [currentWord, setCurrentWord] = useState('');
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            if (wordsTyped >= 15) {
              setShowConfetti(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, wordsTyped]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setWordsTyped(0);
    setTimeLeft(60);
    setShowConfetti(false);
    getNewWord();
    inputRef.current?.focus();
  };

  const getNewWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setInput(value);

    if (value === currentWord) {
      const points = currentWord.length * 2;
      setScore(score + points);
      setWordsTyped(wordsTyped + 1);
      toast.success(`+${points} points!`, { duration: 1000 });
      getNewWord();
    }
  };

  const wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60) || 0;

  return (
    <div className="min-h-screen py-8 px-4">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/games">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
            ⌨️ Speed Typing
          </h1>

          <div className="kid-card flex items-center gap-2 bg-yellow-100">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-bold">{score}</span>
          </div>
        </div>

        {!gameStarted || gameOver ? (
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="kid-card text-center"
          >
            {gameOver ? (
              <>
                <div className="text-9xl mb-6">
                  {wordsTyped >= 20 ? '🏆' : wordsTyped >= 15 ? '⭐' : '👍'}
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mb-4">
                  Time's Up!
                </h2>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <div className="kid-card bg-blue-50">
                    <div className="text-4xl font-bold text-blue-600">
                      {wordsTyped}
                    </div>
                    <div className="text-gray-600">Words Typed</div>
                  </div>
                  <div className="kid-card bg-purple-50">
                    <div className="text-4xl font-bold text-purple-600">
                      {wpm}
                    </div>
                    <div className="text-gray-600">WPM</div>
                  </div>
                </div>
                <div className="text-7xl font-bold text-green-600 mb-6">
                  {score} Points
                </div>
                <p className="text-2xl text-gray-700 mb-8">
                  {wordsTyped >= 20
                    ? 'Lightning fast! Amazing! ⚡'
                    : wordsTyped >= 15
                    ? 'Great typing speed! ⭐'
                    : wordsTyped >= 10
                    ? 'Good job! Keep practicing! 👍'
                    : 'Keep trying! You can do it! 💪'}
                </p>
              </>
            ) : (
              <>
                <div className="text-9xl mb-6">⌨️</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  Speed Typing Challenge
                </h2>
                <p className="text-2xl text-gray-600 mb-8">
                  Type as many words as you can in 60 seconds!
                </p>
              </>
            )}

            <button
              onClick={startGame}
              className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Game Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="kid-card text-center bg-red-50">
                <Timer className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-4xl font-bold text-red-600">
                  {timeLeft}s
                </div>
              </div>
              <div className="kid-card text-center bg-blue-50">
                <div className="text-4xl font-bold text-blue-600">
                  {wordsTyped}
                </div>
                <div className="text-gray-600">Words</div>
              </div>
              <div className="kid-card text-center bg-purple-50">
                <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-4xl font-bold text-purple-600">
                  {wpm}
                </div>
                <div className="text-gray-600 text-sm">WPM</div>
              </div>
            </div>

            {/* Typing Area */}
            <div className="kid-card">
              <motion.div
                key={currentWord}
                initial={{ scale: 1.2, color: '#3b82f6' }}
                animate={{ scale: 1, color: '#1f2937' }}
                className="text-center mb-8"
              >
                <h3 className="text-7xl font-bold text-gray-800 mb-8 tracking-wider">
                  {currentWord}
                </h3>
              </motion.div>

              <div className="max-w-2xl mx-auto">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="w-full p-8 rounded-2xl border-4 border-blue-300 focus:border-blue-500 focus:outline-none text-4xl text-center font-bold"
                  placeholder="Start typing..."
                  autoComplete="off"
                  autoFocus
                />

                {/* Visual feedback */}
                <div className="mt-6 flex justify-center gap-2">
                  {currentWord.split('').map((char, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold ${
                        input[index] === char
                          ? 'bg-green-500 text-white'
                          : input[index]
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {char}
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-center text-gray-500 mt-8 text-lg">
                Type the word exactly as shown above!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
