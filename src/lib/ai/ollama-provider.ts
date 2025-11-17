import { AIProvider, AIMessage, AIProviderError } from './provider';

/**
 * Ollama Provider - Free local AI
 * Requires Ollama to be installed and running locally
 * https://ollama.ai
 */
export class OllamaProvider implements AIProvider {
  private baseUrl: string;
  private model: string;

  constructor(
    baseUrl: string = process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    model: string = process.env.OLLAMA_MODEL || 'llama2'
  ) {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  getName(): string {
    return `Ollama (${this.model})`;
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
    const available = await this.isAvailable();
    if (!available) {
      throw new AIProviderError(
        'Ollama is not running. Please start Ollama and try again.',
        'Ollama'
      );
    }

    const systemPrompt = this.buildSystemPrompt(options?.topic, options?.mode);

    // Combine system prompt with user messages
    const prompt = this.formatMessages(systemPrompt, messages);

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: options?.temperature ?? 0.7,
            num_predict: options?.maxTokens ?? 150,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response || "I didn't understand that. Can you try again?";
    } catch (error: any) {
      console.error('Ollama API error:', error);
      throw new AIProviderError(
        error.message || 'Failed to generate response',
        'Ollama'
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

  private formatMessages(systemPrompt: string, messages: AIMessage[]): string {
    let prompt = `${systemPrompt}\n\n`;

    for (const message of messages) {
      if (message.role === 'user') {
        prompt += `Child: ${message.content}\n`;
      } else if (message.role === 'assistant') {
        prompt += `English Buddy: ${message.content}\n`;
      }
    }

    prompt += 'English Buddy: ';
    return prompt;
  }
}
