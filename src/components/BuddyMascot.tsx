'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface BuddyMascotProps {
  message?: string;
  mood?: 'happy' | 'excited' | 'encouraging' | 'celebrate' | 'thinking';
  showMessage?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const moodMessages = {
  happy: [
    "You're doing great! 🌟",
    "Keep it up, superstar! ⭐",
    "I'm so proud of you! 💖",
    "You're amazing! 🎉",
  ],
  excited: [
    "Wow! That's awesome! 🚀",
    "You're on fire! 🔥",
    "Incredible job! ✨",
    "Fantastic! 🌈",
  ],
  encouraging: [
    "Don't worry, you can do it! 💪",
    "Try again, I believe in you! 🌟",
    "Practice makes perfect! 🎯",
    "You're learning so much! 📚",
  ],
  celebrate: [
    "HOORAY! You did it! 🎊",
    "You're a champion! 🏆",
    "Perfect! Amazing work! ⭐⭐⭐",
    "WOW! You're brilliant! 🌟",
  ],
  thinking: [
    "Hmm, let me think... 🤔",
    "That's interesting! 💭",
    "Good question! 🧠",
    "Let's figure this out! 🔍",
  ],
};

const mascotEmojis = {
  happy: '😊',
  excited: '🤩',
  encouraging: '🤗',
  celebrate: '🎉',
  thinking: '🤔',
};

export function BuddyMascot({
  message,
  mood = 'happy',
  showMessage = true,
  size = 'medium',
}: BuddyMascotProps) {
  const [currentMessage, setCurrentMessage] = useState(
    message || moodMessages[mood][0]
  );
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!message) {
      const messages = moodMessages[mood];
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [mood, message]);

  const sizeClasses = {
    small: 'text-4xl',
    medium: 'text-6xl',
    large: 'text-8xl',
  };

  const messageSizes = {
    small: 'text-base',
    medium: 'text-xl',
    large: 'text-2xl',
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', bounce: 0.5 }}
      className="flex flex-col items-center gap-4"
    >
      {/* Mascot Character */}
      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }
            : { y: [0, -10, 0] }
        }
        transition={
          mood === 'celebrate'
            ? { duration: 0.8, repeat: 2 }
            : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
        className={`${sizeClasses[size]} cursor-pointer hover:scale-110 transition-transform`}
      >
        {mascotEmojis[mood]}
      </motion.div>

      {/* Message Bubble */}
      {showMessage && isVisible && (
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
          className="mascot-bubble max-w-sm"
        >
          <p className={`${messageSizes[size]} font-bold text-gray-800 text-center`}>
            {currentMessage}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

interface EncouragementProps {
  type: 'correct' | 'incorrect' | 'try-again' | 'complete' | 'start';
  onComplete?: () => void;
}

export function Encouragement({ type, onComplete }: EncouragementProps) {
  const encouragements = {
    correct: {
      emojis: ['🌟', '⭐', '✨', '🎉', '🎊', '💫'],
      messages: [
        'Perfect! You got it! 🎉',
        'Amazing! Keep going! ⭐',
        'Fantastic work! 🌟',
        'You're a star! ✨',
        'Brilliant! Love it! 💖',
      ],
      mood: 'celebrate' as const,
    },
    incorrect: {
      emojis: ['💪', '🌈', '🌟', '⭐'],
      messages: [
        "That's okay! Try again! 💪",
        'Learning is fun! Keep going! 🌈',
        'Almost there! You can do it! ⭐',
        "Don't give up! You're doing great! 🌟",
      ],
      mood: 'encouraging' as const,
    },
    'try-again': {
      emojis: ['🎯', '💡', '🚀', '✨'],
      messages: [
        "Let's try this together! 🎯",
        'I know you can do it! 💡',
        'Ready for another try? 🚀',
        'You got this! ✨',
      ],
      mood: 'encouraging' as const,
    },
    complete: {
      emojis: ['🏆', '👑', '🥇', '🎖️', '⭐'],
      messages: [
        'You completed it! Champion! 🏆',
        'All done! You're amazing! 👑',
        'Perfect score! Superstar! 🥇',
        'Mission complete! Awesome! 🎖️',
      ],
      mood: 'celebrate' as const,
    },
    start: {
      emojis: ['🚀', '🌟', '✨', '💫'],
      messages: [
        "Let's learn together! 🚀",
        'Ready to have fun? 🌟',
        "Let's go on an adventure! ✨",
        'Time to shine! 💫',
      ],
      mood: 'excited' as const,
    },
  };

  const config = encouragements[type];
  const message = config.messages[Math.floor(Math.random() * config.messages.length)];

  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="text-center">
        {/* Emoji burst */}
        <div className="relative">
          {config.emojis.map((emoji, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                x: Math.cos((index * 360) / config.emojis.length) * 100,
                y: Math.sin((index * 360) / config.emojis.length) * 100,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute top-0 left-0 text-6xl"
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        {/* Message */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
          className="kid-card bg-gradient-to-br from-yellow-200 to-yellow-400 mt-20"
        >
          <BuddyMascot message={message} mood={config.mood} size="large" />
        </motion.div>
      </div>
    </motion.div>
  );
}
