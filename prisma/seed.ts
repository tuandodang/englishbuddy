import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create vocabulary categories
  const animalsCategory = await prisma.vocabularyCategory.create({
    data: {
      name: 'Animals',
      description: 'Learn about different animals',
      icon: '🐾',
      order: 1,
    },
  });

  const foodCategory = await prisma.vocabularyCategory.create({
    data: {
      name: 'Food',
      description: 'Learn about different foods',
      icon: '🍎',
      order: 2,
    },
  });

  const natureCategory = await prisma.vocabularyCategory.create({
    data: {
      name: 'Nature',
      description: 'Learn about nature and weather',
      icon: '🌳',
      order: 3,
    },
  });

  // Create vocabulary words
  const vocabularyWords = [
    // Animals
    {
      categoryId: animalsCategory.id,
      word: 'Dog',
      definition: 'A friendly animal that barks and can be a pet',
      example: 'My dog loves to play fetch in the park.',
      imageUrl: '🐕',
      phonetic: '/dɔːɡ/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: animalsCategory.id,
      word: 'Cat',
      definition: 'A small furry animal that meows and likes to play',
      example: 'The cat is sleeping on the soft pillow.',
      imageUrl: '🐱',
      phonetic: '/kæt/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: animalsCategory.id,
      word: 'Bird',
      definition: 'An animal with wings that can fly in the sky',
      example: 'I saw a beautiful bird singing in the tree.',
      imageUrl: '🐦',
      phonetic: '/bɜːrd/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: animalsCategory.id,
      word: 'Elephant',
      definition: 'A very large animal with a long trunk',
      example: 'The elephant used its trunk to spray water.',
      imageUrl: '🐘',
      phonetic: '/ˈel.ɪ.fənt/',
      difficultyLevel: 'INTERMEDIATE',
    },

    // Food
    {
      categoryId: foodCategory.id,
      word: 'Apple',
      definition: 'A round fruit that is usually red, green, or yellow',
      example: 'I eat an apple every day for a healthy snack!',
      imageUrl: '🍎',
      phonetic: '/ˈæp.əl/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: foodCategory.id,
      word: 'Banana',
      definition: 'A long yellow fruit that monkeys love',
      example: 'I had a banana with my breakfast.',
      imageUrl: '🍌',
      phonetic: '/bəˈnæn.ə/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: foodCategory.id,
      word: 'Pizza',
      definition: 'A round food with cheese and toppings',
      example: 'We had pizza for dinner last night.',
      imageUrl: '🍕',
      phonetic: '/ˈpiːt.sə/',
      difficultyLevel: 'BEGINNER',
    },

    // Nature
    {
      categoryId: natureCategory.id,
      word: 'Sun',
      definition: 'The bright star in the sky that gives us light and warmth',
      example: 'The sun is shining brightly today!',
      imageUrl: '☀️',
      phonetic: '/sʌn/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: natureCategory.id,
      word: 'Tree',
      definition: 'A tall plant with a trunk, branches, and leaves',
      example: 'I climbed the big tree in our backyard.',
      imageUrl: '🌳',
      phonetic: '/triː/',
      difficultyLevel: 'BEGINNER',
    },
    {
      categoryId: natureCategory.id,
      word: 'Flower',
      definition: 'A colorful part of a plant that smells nice',
      example: 'I picked a beautiful flower for my mom.',
      imageUrl: '🌸',
      phonetic: '/ˈflaʊ.ər/',
      difficultyLevel: 'BEGINNER',
    },
  ];

  for (const word of vocabularyWords) {
    await prisma.vocabularyWord.create({ data: word });
  }

  // Create sample badges
  const badges = [
    {
      name: '7-Day Streak',
      description: 'Practice English for 7 days in a row',
      type: 'DAILY_STREAK',
      iconUrl: '🔥',
      requirement: 7,
    },
    {
      name: 'Vocabulary Master',
      description: 'Learn 100 new words',
      type: 'VOCABULARY_MASTER',
      iconUrl: '📚',
      requirement: 100,
    },
    {
      name: 'Pronunciation Pro',
      description: 'Score 90% or higher on 20 pronunciations',
      type: 'PRONUNCIATION_PRO',
      iconUrl: '🗣️',
      requirement: 20,
    },
    {
      name: 'Conversation King',
      description: 'Have 50 conversations with English Buddy',
      type: 'CONVERSATION_KING',
      iconUrl: '👑',
      requirement: 50,
    },
    {
      name: 'Perfect Score',
      description: 'Get 100% on any quiz',
      type: 'PERFECT_SCORE',
      iconUrl: '⭐',
      requirement: 1,
    },
    {
      name: 'Story Reader',
      description: 'Complete 10 stories',
      type: 'STORY_READER',
      iconUrl: '📖',
      requirement: 10,
    },
  ];

  for (const badge of badges) {
    await prisma.badge.create({ data: badge });
  }

  // Create sample stories
  const stories = [
    {
      title: 'The Friendly Dog',
      content:
        'Once upon a time, there was a friendly dog named Max. Max lived in a small house with his family. Every morning, Max would wake up early and wag his tail. He loved to play fetch in the park with his favorite red ball. Max was a very good dog and always listened to his family. All the children in the neighborhood loved Max because he was so friendly and fun to play with!',
      imageUrl: '🐕',
      difficultyLevel: 'BEGINNER',
      comprehensionQuestions: {
        create: [
          {
            question: "What is the dog's name?",
            options: ['Sam', 'Max', 'Buddy', 'Rex'],
            correctAnswer: 1,
          },
          {
            question: "What color is Max's favorite ball?",
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
    },
    {
      title: 'The Magic Apple Tree',
      content:
        "In a beautiful garden, there was a magic apple tree. This tree was special because its apples could talk! Every day, the apples would tell funny jokes and sing happy songs. A little girl named Lucy discovered the magic tree. She visited it every afternoon after school. The apples became her best friends. They taught her new English words and helped her with homework. Lucy was the happiest girl in the world!",
      imageUrl: '🍎',
      difficultyLevel: 'BEGINNER',
      comprehensionQuestions: {
        create: [
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
            question: "What is the girl's name?",
            options: ['Emma', 'Sarah', 'Lucy', 'Anna'],
            correctAnswer: 2,
          },
        ],
      },
    },
  ];

  for (const story of stories) {
    await prisma.story.create({ data: story });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📚 Created ${vocabularyWords.length} vocabulary words`);
  console.log(`🏆 Created ${badges.length} badges`);
  console.log(`📖 Created ${stories.length} stories`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
