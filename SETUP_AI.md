# 🤖 AI Setup Guide for English Buddy

English Buddy supports **3 AI options** - choose based on your needs!

---

## 📊 Quick Comparison

| Feature | OpenAI API | Ollama (Free) | Mock (Demo) |
|---------|-----------|---------------|-------------|
| **Cost** | ~$0.60/month | Free | Free |
| **Quality** | Excellent ⭐⭐⭐⭐⭐ | Good ⭐⭐⭐⭐ | Basic ⭐⭐ |
| **Speed** | Fast | Medium | Instant |
| **Setup** | 5 minutes | 10 minutes | 0 minutes |
| **Internet** | Required | Not required | Not required |
| **Best For** | Best quality | Privacy & free | Testing |

---

## 🎯 Option 1: OpenAI API (Recommended)

### ✨ Benefits
- **Best Quality**: GPT-4o-mini - state-of-the-art AI
- **Low Cost**: ~$0.60/month for typical usage
- **Fast**: Quick responses
- **Free Trial**: $5 credits for new users

### 💰 Cost Breakdown
```
Typical Usage (30 conversations/day):
- Cost per conversation: $0.0007
- Monthly cost: ~$0.60
- Annual cost: ~$7

You can set spending limits to $5/month!
```

### 🚀 Setup (5 minutes)

1. **Get API Key**
   ```bash
   # Go to: https://platform.openai.com
   # Sign in (same account as ChatGPT)
   # Navigate to: API Keys
   # Click: Create new secret key
   # Copy the key (starts with sk-...)
   ```

2. **Add to .env**
   ```bash
   # Copy example file
   cp .env.example .env

   # Edit .env and add your key
   OPENAI_API_KEY="sk-your-api-key-here"
   AI_PROVIDER="openai"  # or "auto" to auto-detect
   ```

3. **Set Usage Limits** (Recommended)
   ```bash
   # Go to: https://platform.openai.com/account/limits
   # Set hard limit: $5/month
   # Set soft limit: $3/month (get email warning)
   ```

4. **Done!** 🎉
   ```bash
   npm run dev
   # AI chat now works with OpenAI!
   ```

---

## 🆓 Option 2: Ollama (Free Local AI)

### ✨ Benefits
- **100% Free**: No API costs ever
- **Privacy**: Runs on your computer
- **Offline**: Works without internet
- **No Limits**: Unlimited usage

### ⚠️ Requirements
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 4-7GB for model
- **CPU/GPU**: Any modern processor

### 🚀 Setup (10 minutes)

1. **Install Ollama**
   ```bash
   # macOS / Linux
   curl https://ollama.ai/install.sh | sh

   # Windows
   # Download from: https://ollama.ai/download
   ```

2. **Download AI Model**
   ```bash
   # Recommended: Llama2 (7GB)
   ollama pull llama2

   # Alternative: Mistral (4GB, faster)
   ollama pull mistral

   # Alternative: Llama2:7b-chat (smaller)
   ollama pull llama2:7b-chat
   ```

3. **Start Ollama**
   ```bash
   # Ollama runs as a service automatically
   # Or start manually:
   ollama serve

   # Test it:
   ollama run llama2
   # Type a message to test
   # Press Ctrl+D to exit
   ```

4. **Configure English Buddy**
   ```bash
   # Edit .env
   AI_PROVIDER="ollama"
   OLLAMA_BASE_URL="http://localhost:11434"
   OLLAMA_MODEL="llama2"
   ```

5. **Done!** 🎉
   ```bash
   npm run dev
   # AI chat now works with Ollama!
   ```

### 📝 Recommended Models

| Model | Size | Speed | Quality | Best For |
|-------|------|-------|---------|----------|
| `llama2` | 7GB | Medium | High ⭐⭐⭐⭐ | Recommended |
| `mistral` | 4GB | Fast | Good ⭐⭐⭐ | Lower RAM |
| `llama2:7b-chat` | 4GB | Fast | Good ⭐⭐⭐ | Faster |
| `codellama` | 7GB | Medium | High ⭐⭐⭐⭐ | Advanced |

### 🔧 Troubleshooting Ollama

**Ollama not running?**
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve

# Check logs
ollama logs
```

**Model too slow?**
```bash
# Use smaller, faster model
ollama pull mistral
# Update .env: OLLAMA_MODEL="mistral"
```

---

## 🎭 Option 3: Mock AI (Demo Mode)

### ✨ Benefits
- **Zero Setup**: Works immediately
- **No API Keys**: Nothing to configure
- **Fast**: Instant responses
- **Free**: No costs

### ⚠️ Limitations
- Basic pre-defined responses
- No real AI intelligence
- Limited conversation ability
- Good for testing only

### 🚀 Setup (0 minutes)

1. **Configure .env**
   ```bash
   AI_PROVIDER="mock"
   # Or just don't set OPENAI_API_KEY or Ollama
   ```

2. **Done!** That's it! 🎉
   ```bash
   npm run dev
   # Mock AI is active
   ```

---

## 🔄 Auto Mode (Smart Selection)

Let English Buddy **automatically choose** the best available AI:

```bash
# .env
AI_PROVIDER="auto"  # This is the default

# Priority: OpenAI > Ollama > Mock
# - If OpenAI key exists → use OpenAI
# - Else if Ollama running → use Ollama
# - Else → use Mock
```

---

## ✅ Verify AI Setup

### Check AI Status

```bash
# Visit this URL while app is running:
http://localhost:3000/api/ai-status

# Response shows:
# - Current AI provider
# - Available providers
# - Recommendation
```

### Test in App

1. Start the app: `npm run dev`
2. Go to: http://localhost:3000/conversation
3. Send a message
4. Check browser console for provider info

---

## 💡 Recommendations by Use Case

### For Kids at Home
**→ Use OpenAI API**
- Best conversation quality
- Minimal cost (~$0.60/month)
- Easy setup

### For Classroom (Multiple Kids)
**→ Use Ollama**
- Free for unlimited usage
- No monthly costs
- Privacy-friendly

### For Testing/Development
**→ Use Mock AI**
- Instant setup
- No configuration needed

### For Parents (Budget-Conscious)
**→ Use Ollama**
- One-time setup
- Zero ongoing costs
- Good quality

---

## 🔐 Security Notes

### OpenAI API Key Safety
```bash
# ✅ DO:
- Keep .env file in .gitignore
- Never commit API keys
- Set spending limits
- Rotate keys periodically

# ❌ DON'T:
- Share API keys publicly
- Commit .env to git
- Use keys in client-side code
```

### Ollama Privacy
- All data stays on your computer
- No data sent to external servers
- Perfect for sensitive information

---

## 📊 Cost Calculator

### OpenAI Usage Estimator

```javascript
// Assumptions:
const conversationsPerDay = 30;
const avgTokensPerConversation = 1000;
const costPer1MTokens = 0.15; // GPT-4o-mini input

// Monthly cost:
const monthlyConversations = conversationsPerDay * 30;
const monthlyTokens = monthlyConversations * avgTokensPerConversation;
const monthlyCost = (monthlyTokens / 1000000) * costPer1MTokens;

console.log(`Monthly cost: $${monthlyCost.toFixed(2)}`);
// Output: Monthly cost: $0.13 - $0.60
```

**Result**: Very affordable! 🎉

---

## 🆘 Troubleshooting

### OpenAI Issues

**Error: Invalid API key**
```bash
# Check your key starts with: sk-
# Regenerate key at: https://platform.openai.com/api-keys
```

**Error: Rate limit exceeded**
```bash
# You're using too many requests
# Wait a few minutes and try again
# Or upgrade your OpenAI plan
```

**Error: Insufficient quota**
```bash
# Add payment method at: https://platform.openai.com/account/billing
# Or wait for free credits to renew
```

### Ollama Issues

**Error: Ollama is not running**
```bash
# Start Ollama:
ollama serve

# Or restart the service
```

**Error: Model not found**
```bash
# Download the model:
ollama pull llama2

# Check available models:
ollama list
```

**Slow responses**
```bash
# Use smaller model:
ollama pull mistral
# Update OLLAMA_MODEL="mistral" in .env
```

---

## 🎓 Next Steps

1. Choose your AI option (OpenAI, Ollama, or Mock)
2. Follow the setup guide above
3. Test the conversation feature
4. Check `/api/ai-status` to verify
5. Start learning! 🚀

---

**Need Help?**
- Open an issue: https://github.com/tuandodang/englishbuddy/issues
- Check docs: README.md
- Email: support@englishbuddy.app

---

**Happy Learning with English Buddy!** 🌟📚🎉
