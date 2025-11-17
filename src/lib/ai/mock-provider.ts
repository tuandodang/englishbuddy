import { AIProvider, AIMessage } from './provider';

/**
 * Mock Provider - Fallback when no AI is available
 * Provides helpful responses without requiring API keys
 */
export class MockProvider implements AIProvider {
  private responses: string[] = [
    "That's interesting! Can you tell me more? 😊",
    "Great job speaking in English! What else would you like to talk about? 🌟",
    "I love learning with you! What's your favorite thing? 🎉",
    "You're doing amazing! Keep practicing! 💪",
    "That sounds fun! Can you describe it to me? 🎨",
    "Wonderful! What did you do today? 📚",
    "I'm so proud of you! Let's keep learning together! 🌈",
    "That's a great question! What do you think? 🤔",
    "You're such a good learner! What else can you tell me? ⭐",
    "Awesome! I'd love to hear more about that! 🚀",
  ];

  private conversationStarters: string[] = [
    "Hello! I'm English Buddy! What's your name? 👋",
    "Hi there! How are you feeling today? 😊",
    "Welcome! What would you like to learn about? 📚",
    "Hey! Ready to practice some English? Let's go! 🎯",
  ];

  async isAvailable(): Promise<boolean> {
    return true; // Always available as fallback
  }

  getName(): string {
    return 'Mock AI (Demo Mode)';
  }

  async generateResponse(
    messages: AIMessage[],
    options?: {
      topic?: string;
      mode?: string;
    }
  ): Promise<string> {
    // Simulate slight delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // If this is the first message, return a conversation starter
    if (messages.length === 0 || (messages.length === 1 && messages[0].role === 'system')) {
      return this.getRandomResponse(this.conversationStarters);
    }

    // Get the last user message
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop();

    if (!lastUserMessage) {
      return this.getRandomResponse(this.conversationStarters);
    }

    // Simple keyword-based responses
    const content = lastUserMessage.content.toLowerCase();

    if (content.includes('hello') || content.includes('hi')) {
      return "Hello! I'm so happy to talk with you! How are you today? 😊";
    }

    if (content.includes('my name is') || content.includes("i'm ")) {
      const name = this.extractName(lastUserMessage.content);
      return name
        ? `Nice to meet you, ${name}! That's a lovely name! What do you like to do? 🌟`
        : "Nice to meet you! What's your favorite thing to do? 🌟";
    }

    if (content.includes('bye') || content.includes('goodbye')) {
      return "Goodbye! Great job practicing English today! See you soon! 👋";
    }

    if (content.includes('help')) {
      return "I'm here to help! We can talk about anything - animals, food, games, or whatever you like! What interests you? 💡";
    }

    if (content.includes('thank')) {
      return "You're very welcome! I'm happy to help you learn! 😊";
    }

    // Topic-specific responses
    if (options?.topic) {
      return this.getTopicResponse(options.topic, content);
    }

    // Mode-specific responses
    if (options?.mode === 'VOCABULARY_BASED') {
      return "Great vocabulary! Can you use that word in a sentence? 📚";
    }

    // Default: return a random encouraging response
    return this.getRandomResponse(this.responses);
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private extractName(message: string): string | null {
    const patterns = [
      /my name is (\w+)/i,
      /i'm (\w+)/i,
      /call me (\w+)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      }
    }

    return null;
  }

  private getTopicResponse(topic: string, content: string): string {
    const topicResponses: Record<string, string[]> = {
      animals: [
        "Animals are so cool! What's your favorite animal? 🐕",
        "I love animals too! Do you have a pet? 🐱",
        "That's a great animal! What sound does it make? 🦁",
      ],
      food: [
        "Yummy! I like food too! What's your favorite food? 🍎",
        "That sounds delicious! Do you like to cook? 👨‍🍳",
        "Food is so tasty! What did you eat today? 🍕",
      ],
      colors: [
        "Colors are beautiful! What's your favorite color? 🌈",
        "I love that color! Where do you see it? 🎨",
        "Colors make the world pretty! What color is your room? 🖍️",
      ],
    };

    const topicKey = topic.toLowerCase();
    if (topicResponses[topicKey]) {
      return this.getRandomResponse(topicResponses[topicKey]);
    }

    return this.getRandomResponse(this.responses);
  }
}
