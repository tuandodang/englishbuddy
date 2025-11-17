# 🌟 English Buddy - Complete Interactive English Learning Platform

![English Buddy](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)

**English Buddy** is a comprehensive web application designed to help children aged 5-12 learn English through interactive activities, AI-powered conversations, engaging games, and gamified progress tracking. Perfect for kids, parents, and teachers!

---

## ✨ Complete Feature Set

### 🎯 Core Learning Features

#### 📚 Vocabulary Learning
- Interactive flashcards with emojis and audio
- **Learn Mode**: Flip cards to reveal definitions and examples
- **Quiz Mode**: Multiple-choice questions with instant feedback
- Web Speech API for pronunciation
- Progress tracking with points and streaks
- 500+ words across multiple categories

#### 🗣️ Pronunciation Practice
- Advanced speech recognition technology
- Real-time pronunciation scoring (accuracy, fluency, pronunciation)
- AI-powered feedback and encouragement
- Multiple difficulty levels (Beginner → Advanced)
- Star-based reward system
- Practice with 8+ common words

#### 💬 AI Conversation Buddy
- Child-safe AI chatbot powered by **GPT-4o-mini**
- Three conversation modes:
  - **Daily Conversation**: Casual chatting
  - **Situation Practice**: Real-world scenarios (shopping, classroom)
  - **Vocabulary-Based**: Practice new words
- Voice input (speech recognition) + text input
- Text-to-speech responses
- Real-time AI responses
- Safe content filtering

#### 📖 Story Reading Mode
- 3+ interactive illustrated stories
- Read-along mode with AI narration
- Comprehension quizzes with multiple-choice questions
- Difficulty levels for different age groups
- Progress tracking and scoring
- Engaging encouragement based on performance

### 🎮 Learning Games (6 Games)

#### 🐝 Spelling Bee
- Listen to words and spell them correctly
- 10 words per round
- Lives system (3 hearts)
- Points based on word difficulty
- Audio hints available

#### 🎴 Word Match
- Match words with their corresponding emojis
- Drag-and-drop or click interface
- 8 word pairs
- Instant feedback on matches
- Perfect for visual learners

#### 🃏 Memory Cards
- Classic memory matching game
- Match words with pictures
- 16 cards (8 pairs)
- Move counter and timer
- Performance-based scoring

#### 🧩 Word Puzzle
- Unscramble letters to form words
- 8 challenging puzzles
- Hint system available
- Shuffle feature
- Progressive difficulty

#### 👂 Listening Challenge
- Listen and choose the correct word
- 6 questions per round
- Audio playback controls
- Multiple choice format
- Perfect for auditory learners

#### ⌨️ Speed Typing
- Type words as fast as you can
- 60-second timed challenge
- WPM (words per minute) calculator
- Real-time visual feedback
- Leaderboard integration

### 📊 Progress & Competition

#### 🏆 Progress Tracking
- Comprehensive badge system (6+ badges)
- Points and streak tracking
- Recent activity feed
- Skill breakdown charts
- Motivational messages and rewards

#### 📈 Leaderboard
- Weekly, monthly, and all-time rankings
- Top 10 learners showcase
- Personal rank display
- Points and streak competition
- Climb the ranks!

#### 📅 Daily Challenges
- 5 new challenges every day
- Bonus points for completion
- 7-day streak tracking
- Weekly mega-challenge
- Special rewards and badges

### 👨‍👩‍👧‍👦 For Parents & Teachers

#### 👪 Parent Dashboard
- Real-time progress monitoring
- Weekly performance line charts
- Activity distribution pie charts
- Individual skill breakdowns
- Time spent tracking
- Personalized learning recommendations
- Export progress reports

#### 🎓 Classroom Mode (Teachers)
- Manage multiple classes (25+ students per class)
- Student progress tracking
- Class-wide analytics and charts
- Activity participation monitoring
- Create custom assignments
- Export class reports
- Quick action tools
- Parent communication features

### 🔐 Authentication & User Management
- NextAuth integration
- Kid accounts and parent accounts
- Secure session management
- Profile customization
- Multi-user support

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling with custom kid-friendly theme
- **Framer Motion** - Smooth animations and transitions
- **Recharts** - Beautiful charts for analytics
- **React Hot Toast** - User notifications
- **Lucide React** - Modern icon library

### Backend & Database
- **Prisma ORM** - Type-safe database operations
- **PostgreSQL** - Relational database
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth** - Authentication system

### AI & Speech
- **OpenAI GPT-4o-mini** - Conversational AI
- **Web Speech API** - Browser-based speech recognition and synthesis
- Child-safe content filtering

### Development
- **ESLint** - Code quality
- **TypeScript** - Type safety
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm/yarn/pnpm
- **PostgreSQL** database (local or cloud)
- **OpenAI API key** (for AI chat features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tuandodang/englishbuddy.git
   cd englishbuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Fill in your values in `.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/englishbuddy"

   # NextAuth (generate secret: openssl rand -base64 32)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-generated-secret-key"

   # OpenAI API
   OPENAI_API_KEY="sk-your-openai-api-key"

   # Optional: Azure Speech Services (for advanced pronunciation)
   AZURE_SPEECH_KEY="your-azure-key"
   AZURE_SPEECH_REGION="eastus"

   # App Config
   NEXT_PUBLIC_APP_NAME="English Buddy"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # Seed sample data (vocabulary, stories, badges)
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
englishbuddy/
├── prisma/
│   ├── schema.prisma          # Database schema (13+ models)
│   └── seed.ts                # Sample data seeding
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # NextAuth endpoints
│   │   │   └── chat/          # AI conversation API
│   │   ├── auth/
│   │   │   └── signin/        # Sign-in page
│   │   ├── classroom/         # Classroom dashboard (teachers)
│   │   ├── conversation/      # AI chat interface
│   │   ├── daily-challenge/   # Daily challenges
│   │   ├── games/
│   │   │   ├── spelling/      # Spelling Bee game
│   │   │   ├── word-match/    # Word matching game
│   │   │   ├── memory/        # Memory cards game
│   │   │   ├── word-puzzle/   # Word puzzle game
│   │   │   ├── listening/     # Listening challenge
│   │   │   ├── typing/        # Speed typing game
│   │   │   └── page.tsx       # Games hub
│   │   ├── leaderboard/       # Leaderboard & rankings
│   │   ├── parent/            # Parent dashboard
│   │   ├── progress/          # Progress & badges
│   │   ├── pronunciation/     # Pronunciation practice
│   │   ├── stories/           # Story reading
│   │   ├── vocabulary/        # Vocabulary learning
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── lib/
│   │   ├── openai.ts          # OpenAI integration
│   │   ├── prisma.ts          # Database client
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── next-auth.d.ts     # TypeScript types
├── .env.example               # Environment template
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies & scripts
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
└── README.md                  # This file
```

---

## 🎨 Design Principles

### Kid-Friendly UI
- **Large, colorful buttons** and interactive elements
- **Emoji-rich interface** for visual appeal
- **Simple, clear language** appropriate for ages 5-12
- **Comic Sans-inspired fonts** (dyslexia-friendly)
- **Smooth animations** and delightful transitions
- **Vibrant color gradients**

### Accessibility
- High contrast mode support
- Keyboard navigation
- Screen reader friendly
- Large touch targets for tablets
- Responsive design (mobile, tablet, desktop)

### Safety & Privacy
- AI responses filtered for age-appropriate content
- No external links in kid mode
- Parent/teacher dashboards for monitoring
- Privacy-focused (minimal data collection)
- Secure authentication
- COPPA compliant design

---

## 🎮 Gamification System

### Points System
| Activity | Base Points | Perfect Bonus |
|----------|-------------|---------------|
| Vocabulary Quiz | 10 | +10 |
| Pronunciation Practice | 15-30 | +10 |
| AI Conversation | 20 | - |
| Story Completion | 25 | +10 |
| Games | 10-20 | +10 |
| Daily Challenge | 40-60 | - |

### Badge System
- 🔥 **7-Day Streak** - Practice 7 days in a row
- 📚 **Vocabulary Master** - Learn 100 words
- 🗣️ **Pronunciation Pro** - Score 90%+ on 20 words
- 👑 **Conversation King** - Complete 50 conversations
- ⭐ **Perfect Score** - Get 100% on any quiz
- 📖 **Story Reader** - Complete 10 stories

### Leaderboard
- Weekly, monthly, and all-time rankings
- Points-based competition
- Streak tracking
- Badge display
- Friend comparison

---

## 🔐 API Keys Setup

### Required: OpenAI API Key

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to **API keys** section
3. Create a new API key
4. Add to `.env` as `OPENAI_API_KEY`
5. **Note**: GPT-4o-mini is cost-effective (~$0.15-0.60 per million tokens)

### Optional: Azure Speech Services

For advanced pronunciation scoring:

1. Create an [Azure account](https://azure.microsoft.com/)
2. Set up a **Speech Service** resource
3. Get your subscription key and region
4. Add to `.env` as `AZURE_SPEECH_KEY` and `AZURE_SPEECH_REGION`

---

## 📊 Database Schema

### Key Models (13 total)

- **User** - Authentication and profiles (CHILD, PARENT, TEACHER, ADMIN)
- **ChildProfile** - Child-specific data, points, streaks
- **VocabularyCategory** - Word categories (Animals, Food, Nature, etc.)
- **VocabularyWord** - Word library with definitions, examples, audio
- **Progress** - Learning progress per word/child
- **PronunciationScore** - Speech evaluation records
- **Conversation** - Chat history with AI
- **ConversationMessage** - Individual chat messages
- **Badge** - Achievement definitions
- **UserBadge** - Earned badges
- **Story** - Reading materials
- **StoryQuestion** - Comprehension questions
- **LearningSession** - Activity tracking
- **Session** - NextAuth sessions

---

## 🗺️ Roadmap

### ✅ Phase 1 - MVP (Complete)
- [x] Vocabulary learning
- [x] Pronunciation practice
- [x] AI conversation
- [x] Story mode
- [x] Progress tracking
- [x] Parent dashboard

### ✅ Phase 2 - Enhanced (Complete)
- [x] 6 learning games
- [x] Daily challenges
- [x] Leaderboard
- [x] Authentication system
- [x] Classroom mode for teachers
- [x] Advanced gamification

### 🚧 Phase 3 - Advanced (Planned)
- [ ] Personalized AI learning paths
- [ ] AI-generated stories and exercises
- [ ] Voice cloning for story narration
- [ ] Mobile app (React Native or Flutter)
- [ ] Multiplayer challenges
- [ ] Integration with school curricula
- [ ] Multi-language support
- [ ] Offline mode with PWA
- [ ] Advanced analytics for teachers
- [ ] API for third-party integrations

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write clean, readable code
- Add comments for complex logic
- Test all features before PR
- Keep kid-friendly design principles

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for GPT-4o-mini API
- **Web Speech API** for browser-based speech features
- **Next.js Team** for the amazing framework
- **Vercel** for deployment platform
- The open-source community

---

## 📧 Contact & Support

- **GitHub Issues**: [Create an issue](https://github.com/tuandodang/englishbuddy/issues)
- **Email**: support@englishbuddy.app
- **Documentation**: Coming soon!
- **Demo**: [Live Demo](https://englishbuddy.vercel.app) _(coming soon)_

---

## 📈 Stats

- **40+ Pages/Routes** - Comprehensive learning platform
- **6 Interactive Games** - Spelling, Matching, Memory, Puzzles, Listening, Typing
- **500+ Words** - Vocabulary library
- **3+ Stories** - With comprehension quizzes
- **AI-Powered** - GPT-4o-mini chatbot
- **13+ Database Models** - Robust data architecture
- **100% Kid-Safe** - Filtered content, secure environment

---

**Made with ❤️ for kids learning English worldwide**

🌟 **Star this repo if you find it helpful!** 🌟

---

### Quick Start Commands

```bash
# Install dependencies
npm install

# Set up database
npx prisma migrate dev
npm run seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

---

**English Buddy** - Where learning English is always fun! 🚀📚🎉
