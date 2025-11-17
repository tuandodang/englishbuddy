'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface Question {
  word: string;
  options: string[];
  correctIndex: number;
}

export default function ListeningChallengePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions: Question[] = [
    {
      word: 'Apple',
      options: ['Apple', 'Orange', 'Banana', 'Grape'],
      correctIndex: 0,
    },
    {
      word: 'Elephant',
      options: ['Tiger', 'Lion', 'Elephant', 'Giraffe'],
      correctIndex: 2,
    },
    {
      word: 'Beautiful',
      options: ['Wonderful', 'Beautiful', 'Amazing', 'Fantastic'],
      correctIndex: 1,
    },
    {
      word: 'Rainbow',
      options: ['Sunshine', 'Moonlight', 'Rainbow', 'Starlight'],
      correctIndex: 2,
    },
    {
      word: 'Butterfly',
      options: ['Dragonfly', 'Firefly', 'Butterfly', 'Ladybug'],
      correctIndex: 2,
    },
    {
      word: 'Chocolate',
      options: ['Vanilla', 'Strawberry', 'Chocolate', 'Caramel'],
      correctIndex: 2,
    },
  ];

  const current = questions[currentQuestion];

  const playWord = () => {
    const utterance = new SpeechSynthesisUtterance(current.word);
    utterance.rate = 0.7;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Auto-play on mount and question change
    setTimeout(() => playWord(), 500);
  }, [currentQuestion]);

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return;

    setAnswered(true);

    if (selectedIndex === current.correctIndex) {
      setScore(score + 15);
      toast.success('Correct! +15 points! ⭐');

      if (currentQuestion === questions.length - 1) {
        setShowConfetti(true);
        toast.success('Perfect listening! 🎉');
      }
    } else {
      toast.error('Try again next time! 💪');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
      }
    }, 2000);
  };

  const reset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setShowConfetti(false);
  };

  const isGameComplete = currentQuestion === questions.length - 1 && answered;

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
            👂 Listening Challenge
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
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {!isGameComplete ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="kid-card"
            >
              <div className="text-center mb-12">
                <div className="text-9xl mb-8">👂</div>

                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Listen and choose the correct word!
                </h3>

                <button
                  onClick={playWord}
                  className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-3 mx-auto"
                >
                  <Volume2 className="w-8 h-8" />
                  <span className="text-2xl">Play Word</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {current.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`kid-button text-2xl py-8 transition-all ${
                      !answered
                        ? 'bg-white hover:bg-blue-50'
                        : index === current.correctIndex
                        ? 'bg-green-500 text-white'
                        : answered &&
                          index !== current.correctIndex &&
                          'bg-gray-200 opacity-50'
                    } disabled:cursor-not-allowed`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="kid-card text-center"
          >
            <div className="text-9xl mb-6">
              {score >= questions.length * 10 ? '🏆' : '👍'}
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Challenge Complete!
            </h2>
            <div className="text-7xl font-bold text-blue-600 mb-6">
              {score} / {questions.length * 15}
            </div>
            <p className="text-2xl text-gray-700 mb-8">
              {score >= questions.length * 12
                ? 'Perfect listening! Amazing! ⭐'
                : score >= questions.length * 8
                ? 'Great job! Keep it up! 👍'
                : 'Good try! Practice more! 💪'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="kid-button bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Try Again
              </button>
              <Link href="/games">
                <button className="kid-button bg-white hover:bg-gray-100">
                  Back to Games
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
