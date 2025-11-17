'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Volume2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Story {
  id: string;
  title: string;
  emoji: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

export default function StoriesPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isReading, setIsReading] = useState(true);

  const stories: Story[] = [
    {
      id: '1',
      title: 'The Friendly Dog',
      emoji: '🐕',
      content:
        'Once upon a time, there was a friendly dog named Max. Max lived in a small house with his family. Every morning, Max would wake up early and wag his tail. He loved to play fetch in the park with his favorite red ball. Max was a very good dog and always listened to his family. All the children in the neighborhood loved Max because he was so friendly and fun to play with!',
      questions: [
        {
          question: 'What is the dog\'s name?',
          options: ['Sam', 'Max', 'Buddy', 'Rex'],
          correctAnswer: 1,
        },
        {
          question: 'What color is Max\'s favorite ball?',
          options: ['Blue', 'Green', 'Red', 'Yellow'],
          correctAnswer: 2,
        },
        {
          question: 'Where does Max like to play?',
          options: ['Beach', 'School', 'Park', 'Forest'],
          correctAnswer: 2,
        },
      ],
    },
    {
      id: '2',
      title: 'The Magic Apple Tree',
      emoji: '🍎',
      content:
        'In a beautiful garden, there was a magic apple tree. This tree was special because its apples could talk! Every day, the apples would tell funny jokes and sing happy songs. A little girl named Lucy discovered the magic tree. She visited it every afternoon after school. The apples became her best friends. They taught her new English words and helped her with homework. Lucy was the happiest girl in the world!',
      questions: [
        {
          question: 'What makes the apple tree special?',
          options: [
            'It is very tall',
            'Its apples can talk',
            'It has many leaves',
            'It grows fast',
          ],
          correctAnswer: 1,
        },
        {
          question: 'What is the girl\'s name?',
          options: ['Emma', 'Sarah', 'Lucy', 'Anna'],
          correctAnswer: 2,
        },
        {
          question: 'When does Lucy visit the tree?',
          options: [
            'Every morning',
            'Every afternoon',
            'Every night',
            'Every weekend',
          ],
          correctAnswer: 1,
        },
      ],
    },
    {
      id: '3',
      title: 'The Sunny Day Adventure',
      emoji: '☀️',
      content:
        'It was a bright and sunny day. Tom and his sister Emma decided to go on an adventure. They packed sandwiches, water, and a map. First, they walked through the green forest. They saw beautiful birds and colorful butterflies. Then they climbed a small hill and could see the whole town! At the top, they had a picnic and enjoyed the wonderful view. It was the best day ever!',
      questions: [
        {
          question: 'What was the weather like?',
          options: ['Rainy', 'Sunny', 'Cloudy', 'Snowy'],
          correctAnswer: 1,
        },
        {
          question: 'Who went on the adventure with Tom?',
          options: ['His brother', 'His friend', 'His sister Emma', 'His dog'],
          correctAnswer: 2,
        },
        {
          question: 'What did they do at the top of the hill?',
          options: [
            'Played games',
            'Took photos',
            'Had a picnic',
            'Went swimming',
          ],
          correctAnswer: 2,
        },
      ],
    },
  ];

  const readStory = (story: Story) => {
    const utterance = new SpeechSynthesisUtterance(story.content);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedStory) return;

    const isCorrect =
      answerIndex === selectedStory.questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      toast.success('Correct! Great job! ⭐');
    } else {
      toast.error('Not quite! Try reading again! 📖');
    }

    if (currentQuestion < selectedStory.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setIsReading(true);
  };

  const selectNewStory = () => {
    setSelectedStory(null);
    resetQuiz();
  };

  if (!selectedStory) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-2">
                📖 Story Time
              </h1>
              <p className="text-xl text-gray-600">
                Read fun stories and answer questions!
              </p>
            </div>

            <Link href="/">
              <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Home
              </button>
            </Link>
          </div>

          {/* Story Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedStory(story)}
                className="kid-card cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">{story.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600">
                    {story.questions.length} questions
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round(
      (score / selectedStory.questions.length) * 100
    );

    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="kid-card text-center"
          >
            <div className="text-9xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>

            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Quiz Complete!
            </h2>

            <div className="text-8xl font-bold text-blue-600 mb-6">
              {score}/{selectedStory.questions.length}
            </div>

            <p className="text-3xl text-gray-700 mb-8">
              {percentage >= 80
                ? 'Amazing! You understood the story! ⭐'
                : percentage >= 60
                ? 'Good job! Keep practicing! 💪'
                : 'Try reading again! You can do it! 🌟'}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="kid-button bg-white hover:bg-gray-100"
              >
                Read Again
              </button>
              <button
                onClick={selectNewStory}
                className="kid-button bg-gradient-to-r from-purple-500 to-purple-600 text-white"
              >
                Choose Another Story
              </button>
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
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={selectNewStory}
            className="kid-button bg-white hover:bg-gray-100"
          >
            ← Back
          </button>

          <div className="flex items-center gap-2 kid-card bg-purple-100">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span className="font-bold text-xl">
              {isReading ? 'Reading' : `Question ${currentQuestion + 1}`}
            </span>
          </div>

          <div className="w-24" />
        </div>

        {isReading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="kid-card"
          >
            <div className="text-center mb-8">
              <div className="text-9xl mb-4">{selectedStory.emoji}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                {selectedStory.title}
              </h2>

              <button
                onClick={() => readStory(selectedStory)}
                className="kid-button bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center gap-2 mx-auto mb-8"
              >
                <Volume2 className="w-6 h-6" />
                Listen to Story
              </button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-3xl mb-8">
              <p className="text-2xl leading-relaxed text-gray-800">
                {selectedStory.content}
              </p>
            </div>

            <button
              onClick={() => setIsReading(false)}
              className="kid-button bg-gradient-to-r from-purple-500 to-purple-600 text-white mx-auto flex items-center gap-2"
            >
              Start Quiz →
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="kid-card"
          >
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>
                  Question {currentQuestion + 1} of{' '}
                  {selectedStory.questions.length}
                </span>
                <span>Score: {score}</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / selectedStory.questions.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {selectedStory.questions[currentQuestion].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {selectedStory.questions[currentQuestion].options.map(
                (option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="kid-button bg-white hover:bg-blue-50 text-left text-xl p-6"
                  >
                    <span className="font-bold text-blue-600 mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
