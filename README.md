# 🌟 English Buddy - Interactive English Learning for Kids

![English Buddy](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-MIT-green)

**English Buddy** is an interactive web application designed to help children aged 5-12 learn English in a fun, engaging, and effective way. The app combines AI-powered features, gamification, and kid-friendly design to make language learning an adventure!

## 🎯 Features

### Phase 1 MVP (Current)

#### 📚 Vocabulary Learning
- Interactive flashcards with pictures and audio
- Learn mode with flip cards
- Quiz mode with multiple-choice questions
- Web Speech API for pronunciation
- Progress tracking with points

#### 🗣️ Pronunciation Practice
- Speech recognition technology
- Real-time pronunciation scoring
- Encouraging feedback system
- Multiple difficulty levels
- Star-based reward system

#### 💬 AI Conversation
- Child-safe AI chatbot powered by GPT-4o-mini
- Three conversation modes:
  - Daily conversation
  - Situation practice
  - Vocabulary-based chat
- Voice input and text-to-speech
- Real-time responses

#### 📖 Story Mode
- Interactive stories with comprehension questions
- Read-along with audio narration
- Multiple-choice quizzes
- Progress tracking

#### 👪 Parent Dashboard
- Real-time progress monitoring
- Weekly performance charts
- Activity distribution analytics
- Skills breakdown
- Personalized recommendations

#### 🏆 Progress Tracking
- Badges and achievements
- Streak tracking
- Points system
- Recent activity feed
- Motivational messages

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Recharts** - Beautiful charts for analytics
- **React Hot Toast** - User notifications

### Backend & Database
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **Next.js API Routes** - Serverless API

### AI & Speech
- **OpenAI GPT-4o-mini** - Conversational AI
- **Web Speech API** - Browser-based speech recognition and synthesis

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- OpenAI API key

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
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/englishbuddy"

   # NextAuth (generate a secret: openssl rand -base64 32)
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OpenAI
   OPENAI_API_KEY="sk-your-openai-api-key"

   # Optional: Azure Speech (for advanced pronunciation scoring)
   AZURE_SPEECH_KEY="your-azure-speech-key"
   AZURE_SPEECH_REGION="eastus"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev

   # (Optional) Seed sample data
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
englishbuddy/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   └── chat/          # AI conversation endpoint
│   │   ├── conversation/      # AI chat page
│   │   ├── parent/            # Parent dashboard
│   │   ├── pronunciation/     # Pronunciation practice
│   │   ├── progress/          # Progress tracking
│   │   ├── stories/           # Story reading
│   │   ├── vocabulary/        # Vocabulary learning
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── lib/
│       ├── openai.ts          # OpenAI integration
│       ├── prisma.ts          # Database client
│       └── utils.ts           # Utility functions
├── .env.example               # Environment template
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Design Principles

### Kid-Friendly UI
- Large, colorful buttons and icons
- Emoji-rich interface
- Simple, clear language
- Comic Sans-inspired fonts (dyslexia-friendly)
- Smooth animations and transitions

### Accessibility
- High contrast mode support
- Keyboard navigation
- Screen reader friendly
- Large touch targets for mobile

### Safety
- AI responses filtered for age-appropriate content
- No external links in kid mode
- Parent dashboard for monitoring
- Privacy-focused (minimal data collection)

## 🔐 API Keys Setup

### OpenAI API Key

1. Sign up at [OpenAI Platform](https://platform.openai.com/)
2. Navigate to API keys section
3. Create a new API key
4. Add to `.env` file as `OPENAI_API_KEY`

### Optional: Azure Speech Services

For advanced pronunciation scoring:

1. Create an Azure account
2. Set up a Speech Service resource
3. Get your subscription key and region
4. Add to `.env` file

## 📊 Database Schema

Key models:
- **User** - Authentication and profile
- **ChildProfile** - Child-specific data and gamification
- **VocabularyWord** - Word library with categories
- **Progress** - Learning progress tracking
- **PronunciationScore** - Speech evaluation records
- **Conversation** - Chat history
- **Badge** - Achievements system
- **Story** - Reading materials

## 🎮 Gamification System

### Points
- Vocabulary quiz: 10-20 points
- Pronunciation: 15-30 points
- Conversation: 20 points
- Stories: 25 points
- Perfect score bonus: +10 points

### Badges
- **7-Day Streak** 🔥 - Practice 7 days in a row
- **Vocabulary Master** 📚 - Learn 100 words
- **Pronunciation Pro** 🗣️ - 90%+ on 20 words
- **Conversation King** 👑 - 50 conversations
- **Perfect Score** ⭐ - 100% on any quiz
- **Story Reader** 📖 - Complete 10 stories

## 🚧 Roadmap

### Phase 2 (Planned)
- [ ] Games module (word puzzles, spelling games)
- [ ] Listening challenges
- [ ] Memory card matching
- [ ] Advanced stories with AI generation
- [ ] Classroom mode for teachers

### Phase 3 (Future)
- [ ] Personalized learning paths
- [ ] Mobile app (React Native/Flutter)
- [ ] Multiplayer challenges
- [ ] Voice cloning for story narration
- [ ] Integration with school curricula

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for GPT-4o-mini API
- Web Speech API for browser-based speech recognition
- The amazing open-source community

## 📧 Contact

For questions, feedback, or support:
- GitHub Issues: [Create an issue](https://github.com/tuandodang/englishbuddy/issues)
- Email: support@englishbuddy.app

---

**Made with ❤️ for kids learning English**

🌟 Star this repo if you find it helpful!
