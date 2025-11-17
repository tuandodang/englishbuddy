'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Star, ArrowLeft, Shuffle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface Word {
  word: string;
  hint: string;
  emoji: string;
}

export default function WordPuzzlePage() {
  const [words] = useState<Word[]>([
    { word: 'ELEPHANT', hint: 'Large animal with a trunk', emoji: '🐘' },
    { word: 'RAINBOW', hint: 'Colorful arch in the sky', emoji: '🌈' },
    { word: 'BUTTERFLY', hint: 'Beautiful flying insect', emoji: '🦋' },
    { word: 'MOUNTAIN', hint: 'Very tall landform', emoji: '🏔️' },
    { word: 'CHOCOLATE', hint: 'Sweet brown treat', emoji: '🍫' },
    { word: 'DINOSAUR', hint: 'Ancient giant reptile', emoji: '🦕' },
    { word: 'UMBRELLA', hint: 'Keeps you dry in rain', emoji: '☂️' },
    { word: 'BIRTHDAY', hint: 'Special day once a year', emoji: '🎂' },
  ]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    scrambleWord();
  }, [currentWordIndex]);

  const scrambleWord = () => {
    const letters = currentWord.word.split('');
    const scrambled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledLetters(scrambled);
    setSelectedLetters([]);
    setShowHint(false);
  };

  const handleLetterClick = (index: number) => {
    const letter = scrambledLetters[index];
    setSelectedLetters([...selectedLetters, letter]);
    setScrambledLetters(scrambledLetters.filter((_, i) => i !== index));
  };

  const handleSelectedLetterClick = (index: number) => {
    const letter = selectedLetters[index];
    setScrambledLetters([...scrambledLetters, letter]);
    setSelectedLetters(selectedLetters.filter((_, i) => i !== index));
  };

  const checkAnswer = () => {
    const userWord = selectedLetters.join('');

    if (userWord === currentWord.word) {
      const points = showHint ? 10 : 20;
      setScore(score + points);
      toast.success(`Correct! +${points} points! ⭐`);

      if (currentWordIndex === words.length - 1) {
        setShowConfetti(true);
        toast.success('You completed all puzzles! 🎉');
      } else {
        setTimeout(() => {
          setCurrentWordIndex(currentWordIndex + 1);
        }, 1500);
      }
    } else {
      toast.error('Not quite right! Try again! 💪');
    }
  };

  const useHint = () => {
    setShowHint(true);
    setHintsUsed(hintsUsed + 1);
    toast('Hint revealed! Worth 10 points now.', { icon: '💡' });
  };

  const reset = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setHintsUsed(0);
    setShowConfetti(false);
    scrambleWord();
  };

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
            🧩 Word Puzzle
          </h1>

          <div className="kid-card flex items-center gap-2 bg-yellow-100">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-2xl font-bold">{score}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Puzzle {currentWordIndex + 1} of {words.length}
            </span>
            <span>Hints used: {hintsUsed}</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentWordIndex + 1) / words.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="kid-card"
          >
            {/* Emoji and Hint */}
            <div className="text-center mb-8">
              <div className="text-9xl mb-4">{currentWord.emoji}</div>

              {showHint ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl text-gray-700 mb-4"
                >
                  Hint: {currentWord.hint}
                </motion.p>
              ) : (
                <button
                  onClick={useHint}
                  className="kid-button bg-yellow-100 hover:bg-yellow-200 flex items-center gap-2 mx-auto mb-4"
                >
                  <HelpCircle className="w-5 h-5" />
                  Show Hint
                </button>
              )}
            </div>

            {/* Selected Letters */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                Your Answer:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center min-h-[80px] p-4 bg-blue-50 rounded-2xl">
                {selectedLetters.length === 0 ? (
                  <span className="text-gray-400 text-xl">
                    Click letters below to build the word...
                  </span>
                ) : (
                  selectedLetters.map((letter, index) => (
                    <motion.button
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleSelectedLetterClick(index)}
                      className="w-16 h-16 bg-blue-500 text-white rounded-xl text-3xl font-bold hover:bg-blue-600 transition-all"
                    >
                      {letter}
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Scrambled Letters */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">
                Available Letters:
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {scrambledLetters.map((letter, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => handleLetterClick(index)}
                    className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-xl text-3xl font-bold hover:scale-110 transition-all shadow-lg"
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={scrambleWord}
                className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2"
              >
                <Shuffle className="w-5 h-5" />
                Shuffle
              </button>

              <button
                onClick={checkAnswer}
                disabled={selectedLetters.length !== currentWord.word.length}
                className="kid-button bg-gradient-to-r from-green-500 to-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Answer ✓
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Completion */}
        {currentWordIndex === words.length - 1 && showConfetti && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="kid-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center mt-8"
          >
            <div className="text-7xl mb-4">🏆</div>
            <h3 className="text-4xl font-bold mb-2">Puzzle Master!</h3>
            <p className="text-2xl mb-4">
              Final Score: {score} points
            </p>
            <button
              onClick={reset}
              className="kid-button bg-white text-orange-600 hover:bg-gray-100"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
