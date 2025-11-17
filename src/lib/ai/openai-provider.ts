import OpenAI from 'openai';
import { AIProvider, AIMessage, AIProviderError } from './provider';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;

    if (this.apiKey) {
      this.client = new OpenAI({
        apiKey: this.apiKey,
      });
    }
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey && !!this.client;
  }

  getName(): string {
    return 'OpenAI (GPT-4o-mini)';
  }

  async generateResponse(
    messages: AIMessage[],
    options?: {
      topic?: string;
      mode?: string;
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string> {
    if (!this.client) {
      throw new AIProviderError('OpenAI API key not configured', 'OpenAI');
    }

    const systemPrompt = this.buildSystemPrompt(options?.topic, options?.mode);

    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        ],
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 150,
      });

      return completion.choices[0].message.content ||
        "I didn't understand that. Can you try again?";
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      throw new AIProviderError(
        error.message || 'Failed to generate response',
        'OpenAI'
      );
    }
  }

  private buildSystemPrompt(topic?: string, mode?: string): string {
    return `You are English Buddy, a friendly and patient English teacher for children aged 5-12.

Guidelines:
- Use simple, age-appropriate language
- Be encouraging and positive
- Keep responses short (2-3 sentences)
- Use emojis occasionally to make it fun
- Correct mistakes gently without being harsh
- Ask simple follow-up questions to continue the conversation
${topic ? `- Focus the conversation on: ${topic}` : ''}
${mode === 'DAILY' ? '- Have a casual daily conversation' : ''}
${mode === 'SITUATION' ? '- Practice a specific situation scenario' : ''}
${mode === 'VOCABULARY_BASED' ? '- Help practice new vocabulary words' : ''}

Remember: You're talking to a child. Be patient, fun, and supportive!`;
  }
}
