import { AIProvider } from './provider';
import { OpenAIProvider } from './openai-provider';
import { OllamaProvider } from './ollama-provider';
import { MockProvider } from './mock-provider';

export type AIProviderType = 'openai' | 'ollama' | 'mock' | 'auto';

/**
 * AI Provider Factory
 * Creates and manages AI providers based on configuration
 */
export class AIProviderFactory {
  private static instance: AIProvider | null = null;

  /**
   * Get AI provider instance
   * @param type - Provider type ('openai', 'ollama', 'mock', 'auto')
   * 'auto' will automatically select the best available provider
   */
  static async getProvider(type: AIProviderType = 'auto'): Promise<AIProvider> {
    // Return cached instance if available
    if (this.instance) {
      return this.instance;
    }

    let provider: AIProvider;

    switch (type) {
      case 'openai':
        provider = new OpenAIProvider();
        break;

      case 'ollama':
        provider = new OllamaProvider();
        break;

      case 'mock':
        provider = new MockProvider();
        break;

      case 'auto':
      default:
        provider = await this.autoSelectProvider();
        break;
    }

    this.instance = provider;
    return provider;
  }

  /**
   * Auto-select the best available provider
   * Priority: OpenAI > Ollama > Mock
   */
  private static async autoSelectProvider(): Promise<AIProvider> {
    // Try OpenAI first (if API key is configured)
    const openai = new OpenAIProvider();
    if (await openai.isAvailable()) {
      console.log('✅ Using OpenAI provider (GPT-4o-mini)');
      return openai;
    }

    // Try Ollama next (if running locally)
    const ollama = new OllamaProvider();
    if (await ollama.isAvailable()) {
      console.log('✅ Using Ollama provider (free local AI)');
      return ollama;
    }

    // Fallback to Mock provider
    console.log('⚠️ Using Mock provider (demo mode - no AI API configured)');
    console.log('💡 To use real AI, configure OpenAI API key or install Ollama');
    return new MockProvider();
  }

  /**
   * Reset provider instance (useful for testing)
   */
  static reset(): void {
    this.instance = null;
  }

  /**
   * Get available providers with their status
   */
  static async getAvailableProviders(): Promise<{
    name: string;
    type: AIProviderType;
    available: boolean;
  }[]> {
    const providers = [
      { type: 'openai' as AIProviderType, provider: new OpenAIProvider() },
      { type: 'ollama' as AIProviderType, provider: new OllamaProvider() },
      { type: 'mock' as AIProviderType, provider: new MockProvider() },
    ];

    const results = await Promise.all(
      providers.map(async ({ type, provider }) => ({
        name: provider.getName(),
        type,
        available: await provider.isAvailable(),
      }))
    );

    return results;
  }
}
