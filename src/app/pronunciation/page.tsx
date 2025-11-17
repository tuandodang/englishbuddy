'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Volume2,
  Home,
  Star,
  RefreshCw,
  Trophy,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface Word {
  word: string;
  phonetic: string;
  emoji: string;
}

export default function PronunciationPage() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const recognitionRef = useRef<any>(null);

  const words: Word[] = [
    { word: 'Hello', phonetic: '/həˈloʊ/', emoji: '👋' },
    { word: 'Apple', phonetic: '/ˈæp.əl/', emoji: '🍎' },
    { word: 'Happy', phonetic: '/ˈhæp.i/', emoji: '😊' },
    { word: 'Sun', phonetic: '/sʌn/', emoji: '☀️' },
    { word: 'Book', phonetic: '/bʊk/', emoji: '📚' },
    { word: 'Water', phonetic: '/ˈwɔː.tər/', emoji: '💧' },
    { word: 'Friend', phonetic: '/frend/', emoji: '👫' },
    { word: 'Music', phonetic: '/ˈmjuː.zɪk/', emoji: '🎵' },
  ];

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const confidence = event.results[0][0].confidence;

        evaluatePronunciation(transcript, confidence);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
        toast.error('Could not hear you clearly. Try again! 🎤');
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const playWord = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.rate = 0.7; // Very slow for pronunciation practice
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setIsRecording(true);
      setScore(null);
      recognitionRef.current.start();
      toast.success('Listening... Say the word! 🎤');
    } else {
      toast.error('Speech recognition not supported in your browser');
    }
  };

  const evaluatePronunciation = (transcript: string, confidence: number) => {
    const targetWord = currentWord.word.toLowerCase();
    const spokenWord = transcript.trim();

    // Calculate similarity score
    let pronunciationScore = 0;

    if (spokenWord === targetWord) {
      // Perfect match
      pronunciationScore = Math.round(confidence * 100);
    } else if (spokenWord.includes(targetWord) || targetWord.includes(spokenWord)) {
      // Partial match
      pronunciationScore = Math.round(confidence * 70);
    } else {
      // Check phonetic similarity (basic)
      const similarity = calculateSimilarity(spokenWord, targetWord);
      pronunciationScore = Math.round(similarity * confidence * 100);
    }

    pronunciationScore = Math.min(100, Math.max(0, pronunciationScore));

    setScore(pronunciationScore);
    setAttempts(attempts + 1);

    if (pronunciationScore >= 80) {
      const points = pronunciationScore >= 90 ? 20 : 15;
      setTotalScore(totalScore + points);
      toast.success(`Great job! +${points} stars! ⭐`);

      if (pronunciationScore >= 95) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else if (pronunciationScore >= 60) {
      setTotalScore(totalScore + 10);
      toast('Good try! Keep practicing! 💪', { icon: '👍' });
    } else {
      toast('Try again! You can do it! 🌟', { icon: '💪' });
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const getEditDistance = (str1: string, str2: string): number => {
    const costs: number[] = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[str2.length] = lastValue;
    }
    return costs[str2.length];
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setScore(null);
    } else {
      toast.success('Amazing! You finished all words! 🎉');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const tryAgain = () => {
    setScore(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 95) return 'Perfect! 🌟';
    if (score >= 90) return 'Excellent! ⭐';
    if (score >= 80) return 'Great! 👍';
    if (score >= 70) return 'Good! 💪';
    if (score >= 60) return 'Nice try! 🙂';
    return 'Keep practicing! 💫';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="kid-card flex items-center gap-2 bg-yellow-100">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold">{totalScore}</span>
            </div>

            <div className="kid-card flex items-center gap-2 bg-blue-100">
              <Trophy className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold">
                {currentWordIndex + 1}/{words.length}
              </span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="kid-card">
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-9xl mb-6">{currentWord.emoji}</div>

                <h2 className="text-6xl font-bold text-gray-800 mb-4">
                  {currentWord.word}
                </h2>

                <p className="text-3xl text-gray-600 mb-8">{currentWord.phonetic}</p>

                <button
                  onClick={playWord}
                  className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2 mx-auto mb-8"
                >
                  <Volume2 className="w-6 h-6" />
                  <span className="text-xl">Listen</span>
                </button>

                {score === null ? (
                  <>
                    <button
                      onClick={startRecording}
                      disabled={isRecording}
                      className={`kid-button mx-auto flex items-center gap-3 ${
                        isRecording
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      }`}
                    >
                      <Mic className="w-8 h-8" />
                      <span className="text-2xl">
                        {isRecording ? 'Listening...' : 'Record Your Voice'}
                      </span>
                    </button>

                    <p className="text-gray-500 mt-4 text-lg">
                      {isRecording
                        ? 'Say the word now! 🎤'
                        : 'Click the button and say the word clearly'}
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <div className="kid-card bg-gradient-to-br from-purple-50 to-pink-50 p-8 mb-6">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Trophy className={`w-12 h-12 ${getScoreColor(score)}`} />
                        <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </div>
                      </div>

                      <p className="text-3xl font-bold text-gray-700 mb-2">
                        {getScoreMessage(score)}
                      </p>

                      {score >= 80 && (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="w-6 h-6" />
                          <span className="text-xl font-bold">Well Done!</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={tryAgain}
                        className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Try Again
                      </button>

                      <button
                        onClick={nextWord}
                        disabled={currentWordIndex === words.length - 1}
                        className="kid-button bg-gradient-to-r from-purple-500 to-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next Word →
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="kid-card text-center bg-blue-50">
            <div className="text-3xl font-bold text-blue-600">{attempts}</div>
            <div className="text-gray-600">Total Attempts</div>
          </div>

          <div className="kid-card text-center bg-green-50">
            <div className="text-3xl font-bold text-green-600">
              {attempts > 0 ? Math.round((totalScore / (attempts * 20)) * 100) : 0}%
            </div>
            <div className="text-gray-600">Avg. Accuracy</div>
          </div>

          <div className="kid-card text-center bg-purple-50">
            <div className="text-3xl font-bold text-purple-600">
              {currentWordIndex + 1}
            </div>
            <div className="text-gray-600">Words Practiced</div>
          </div>
        </div>
      </div>
    </div>
  );
}
