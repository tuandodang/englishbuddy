import { NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai/factory';

/**
 * API endpoint to check AI provider status
 * GET /api/ai-status
 */
export async function GET() {
  try {
    // Get all available providers and their status
    const providers = await AIProviderFactory.getAvailableProviders();

    // Get current provider
    const providerType = (process.env.AI_PROVIDER as any) || 'auto';
    const currentProvider = await AIProviderFactory.getProvider(providerType);
    const isAvailable = await currentProvider.isAvailable();

    return NextResponse.json({
      current: {
        name: currentProvider.getName(),
        available: isAvailable,
        type: providerType,
      },
      providers,
      recommendation: getRecommendation(providers),
    });
  } catch (error) {
    console.error('AI status error:', error);
    return NextResponse.json(
      { error: 'Failed to check AI status' },
      { status: 500 }
    );
  }
}

function getRecommendation(
  providers: { name: string; type: string; available: boolean }[]
): string {
  const openai = providers.find(p => p.type === 'openai');
  const ollama = providers.find(p => p.type === 'ollama');

  if (openai?.available) {
    return 'Using OpenAI (best quality, low cost)';
  }

  if (ollama?.available) {
    return 'Using Ollama (free, runs locally)';
  }

  return 'Using demo mode. Install Ollama for free AI or configure OpenAI API key.';
}
