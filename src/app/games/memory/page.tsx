'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Star, Trophy, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

interface Card {
  id: number;
  word: string;
  emoji: string;
  type: 'word' | 'emoji';
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGamePage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const wordPairs = [
    { word: 'DOG', emoji: '🐕' },
    { word: 'CAT', emoji: '🐱' },
    { word: 'APPLE', emoji: '🍎' },
    { word: 'SUN', emoji: '☀️' },
    { word: 'BOOK', emoji: '📚' },
    { word: 'TREE', emoji: '🌳' },
    { word: 'STAR', emoji: '⭐' },
    { word: 'HEART', emoji: '❤️' },
  ];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    wordPairs.forEach((pair, index) => {
      gameCards.push({
        id: index * 2,
        word: pair.word,
        emoji: pair.emoji,
        type: 'word',
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: index * 2 + 1,
        word: pair.word,
        emoji: pair.emoji,
        type: 'emoji',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setScore(0);
    setGameWon(false);
    setShowConfetti(false);
  };

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length >= 2) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].isMatched) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      checkMatch(newFlipped);
    }
  };

  const checkMatch = (flipped: number[]) => {
    const [first, second] = flipped;
    const card1 = cards[first];
    const card2 = cards[second];

    if (card1.word === card2.word && card1.type !== card2.type) {
      // Match!
      setTimeout(() => {
        const newCards = [...cards];
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setMatches(matches + 1);
        setScore(score + 20);
        setFlippedCards([]);
        toast.success('Match! +20 points! ⭐');

        if (matches + 1 === wordPairs.length) {
          setGameWon(true);
          setShowConfetti(true);
          toast.success('You won! 🎉');
        }
      }, 500);
    } else {
      // No match
      setTimeout(() => {
        const newCards = [...cards];
        newCards[first].isFlipped = false;
        newCards[second].isFlipped = false;
        setCards(newCards);
        setFlippedCards([]);
      }, 1000);
    }
  };

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
            🃏 Memory Match
          </h1>

          <div className="flex items-center gap-4">
            <div className="kid-card flex items-center gap-2 bg-yellow-100">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-2xl font-bold">{score}</span>
            </div>

            <button
              onClick={initializeGame}
              className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
          <div className="kid-card text-center bg-blue-50">
            <div className="text-3xl font-bold text-blue-600">{moves}</div>
            <div className="text-gray-600">Moves</div>
          </div>
          <div className="kid-card text-center bg-green-50">
            <div className="text-3xl font-bold text-green-600">
              {matches}/{wordPairs.length}
            </div>
            <div className="text-gray-600">Matches</div>
          </div>
        </div>

        {/* Game Board */}
        {gameWon ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="kid-card text-center max-w-2xl mx-auto"
          >
            <div className="text-9xl mb-6">🏆</div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              You Won!
            </h2>
            <div className="text-7xl font-bold text-green-600 mb-6">
              {score} Points
            </div>
            <p className="text-2xl text-gray-700 mb-4">
              Moves: {moves}
            </p>
            <p className="text-xl text-gray-600 mb-8">
              {moves <= wordPairs.length * 1.5
                ? 'Perfect memory! ⭐'
                : moves <= wordPairs.length * 2
                ? 'Great job! 👍'
                : 'Good effort! Keep practicing! 💪'}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={initializeGame}
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
        ) : (
          <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleCardClick(index)}
                className={`kid-card aspect-square flex items-center justify-center cursor-pointer text-5xl font-bold transition-all ${
                  card.isMatched
                    ? 'bg-green-100 border-green-400 opacity-50'
                    : card.isFlipped
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-gradient-to-br from-purple-200 to-blue-200 hover:scale-105'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    initial={{ rotateY: 90 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.type === 'emoji' ? card.emoji : card.word}
                  </motion.div>
                ) : (
                  <span className="text-6xl">?</span>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
