'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  Star,
  Home,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import { BuddyMascot, Encouragement } from '@/components/BuddyMascot';
import { playSuccess, playTryAgain, playCelebration, playClick, playStar } from '@/lib/soundEffects';

interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  example: string;
  imageUrl: string;
  phonetic: string;
}

export default function VocabularyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null);
  const [showEncouragement, setShowEncouragement] = useState<'correct' | 'incorrect' | 'complete' | 'start' | null>(null);

  // Sample vocabulary data (in production, fetch from API)
  const words: VocabularyWord[] = [
    {
      id: '1',
      word: 'Apple',
      definition: 'A round fruit that is usually red, green, or yellow',
      example: 'I eat an apple every day for a healthy snack!',
      imageUrl: '🍎',
      phonetic: '/ˈæp.əl/',
    },
    {
      id: '2',
      word: 'Dog',
      definition: 'A friendly animal that barks and can be a pet',
      example: 'My dog loves to play fetch in the park.',
      imageUrl: '🐕',
      phonetic: '/dɔːɡ/',
    },
    {
      id: '3',
      word: 'Sun',
      definition: 'The bright star in the sky that gives us light and warmth',
      example: 'The sun is shining brightly today!',
      imageUrl: '☀️',
      phonetic: '/sʌn/',
    },
    {
      id: '4',
      word: 'Book',
      definition: 'Pages with words and pictures that tell stories',
      example: 'I love reading my favorite book before bedtime.',
      imageUrl: '📚',
      phonetic: '/bʊk/',
    },
    {
      id: '5',
      word: 'Cat',
      definition: 'A small furry animal that meows and likes to play',
      example: 'The cat is sleeping on the soft pillow.',
      imageUrl: '🐱',
      phonetic: '/kæt/',
    },
  ];

  const currentWord = words[currentIndex];

  const playAudio = () => {
    // Use Web Speech API for pronunciation
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.8; // Slow speed for kids
    utterance.pitch = 1.1; // Slightly higher pitch
    speechSynthesis.speak(utterance);
    playClick(); // Add fun sound effect
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
      setQuizAnswer(null);
      playClick();
    } else {
      toast.success('Great job! You finished all words! 🎉');
      setShowConfetti(true);
      playCelebration();
      setShowEncouragement('complete');
      setTimeout(() => {
        setShowConfetti(false);
        setShowEncouragement(null);
      }, 5000);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
      setQuizAnswer(null);
      playClick();
    }
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    setQuizAnswer(isCorrect);
    if (isCorrect) {
      setScore(score + 10);
      playSuccess();
      playStar();
      toast.success('Correct! +10 points ⭐');
      setShowEncouragement('correct');
      setTimeout(() => {
        setShowEncouragement(null);
        nextWord();
      }, 2000);
    } else {
      playTryAgain();
      toast.error('Try again! 💪');
      setShowEncouragement('incorrect');
      setTimeout(() => {
        setShowEncouragement(null);
        nextWord();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {showConfetti && <Confetti />}
      {showEncouragement && (
        <Encouragement
          type={showEncouragement}
          onComplete={() => setShowEncouragement(null)}
        />
      )}

      <div className="container mx-auto max-w-4xl">
        {/* Mascot Welcome */}
        <div className="mb-6 flex justify-center">
          <BuddyMascot mood="excited" size="small" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2" onClick={playClick}>
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="kid-card flex items-center gap-2 bg-yellow-100 glow">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500 animate-pulse" />
              <span className="text-3xl font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => {
              setMode('learn');
              playClick();
            }}
            className={`kid-button text-2xl ${
              mode === 'learn'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl scale-110'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            📚 Learn Mode
          </button>
          <button
            onClick={() => {
              setMode('quiz');
              playClick();
            }}
            className={`kid-button text-2xl ${
              mode === 'quiz'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-2xl scale-110'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            🎯 Quiz Mode
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xl font-bold text-gray-700 mb-3">
            <span className="flex items-center gap-2">
              📖 Word {currentIndex + 1} of {words.length}
            </span>
            <span className="text-2xl text-purple-600">
              {Math.round(((currentIndex + 1) / words.length) * 100)}% 🎯
            </span>
          </div>
          <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner border-4 border-gray-300">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {mode === 'learn' ? (
              <div
                className="kid-card cursor-pointer perspective-1000 min-h-[400px]"
                onClick={() => setFlipped(!flipped)}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className={`${
                      flipped ? 'hidden' : 'block'
                    } text-center`}
                  >
                    <div className="text-9xl mb-6">{currentWord.imageUrl}</div>
                    <h2 className="text-5xl font-bold text-gray-800 mb-4">
                      {currentWord.word}
                    </h2>
                    <p className="text-2xl text-gray-600 mb-6">{currentWord.phonetic}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio();
                      }}
                      className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2 mx-auto"
                    >
                      <Volume2 className="w-6 h-6" />
                      Listen
                    </button>

                    <p className="text-gray-500 mt-8 text-lg">
                      Click card to see definition
                    </p>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`${
                      !flipped ? 'hidden' : 'block'
                    } text-center`}
                  >
                    <div className="text-6xl mb-6">{currentWord.imageUrl}</div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Definition</h3>
                    <p className="text-2xl text-gray-700 mb-6">
                      {currentWord.definition}
                    </p>

                    <div className="bg-blue-50 p-6 rounded-2xl">
                      <h4 className="text-xl font-bold text-gray-700 mb-2">
                        Example:
                      </h4>
                      <p className="text-xl text-gray-600 italic">
                        {currentWord.example}
                      </p>
                    </div>

                    <p className="text-gray-500 mt-8 text-lg">
                      Click card to go back
                    </p>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="kid-card min-h-[400px]">
                <div className="text-center">
                  <div className="text-9xl mb-6">{currentWord.imageUrl}</div>

                  <h3 className="text-3xl font-bold text-gray-800 mb-6">
                    What is this word?
                  </h3>

                  <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {[currentWord.word, 'Wrong Answer', 'Another Word', 'Not This']
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 2)
                      .map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(option === currentWord.word)}
                          disabled={quizAnswer !== null}
                          className={`kid-button text-2xl py-8 ${
                            quizAnswer === null
                              ? 'bg-white hover:bg-blue-50'
                              : option === currentWord.word
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                  </div>

                  {quizAnswer !== null && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-8 flex items-center justify-center gap-2"
                    >
                      {quizAnswer ? (
                        <>
                          <CheckCircle className="w-12 h-12 text-green-500" />
                          <span className="text-3xl font-bold text-green-500">
                            Correct!
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-12 h-12 text-red-500" />
                          <span className="text-3xl font-bold text-red-500">
                            Try Again!
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevWord}
            disabled={currentIndex === 0}
            className="kid-button bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-6 h-6" />
            Previous
          </button>

          <button
            onClick={nextWord}
            disabled={currentIndex === words.length - 1}
            className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
