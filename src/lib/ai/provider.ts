/**
 * AI Provider Interface
 * Allows switching between different AI backends (OpenAI, Ollama, Mock)
 */

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIProvider {
  generateResponse(
    messages: AIMessage[],
    options?: {
      topic?: string;
      mode?: string;
      maxTokens?: number;
      temperature?: number;
    }
  ): Promise<string>;

  isAvailable(): Promise<boolean>;
  getName(): string;
}

export class AIProviderError extends Error {
  constructor(message: string, public provider: string) {
    super(message);
    this.name = 'AIProviderError';
  }
}
