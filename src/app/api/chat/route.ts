import { NextRequest, NextResponse } from 'next/server';
import { AIProviderFactory } from '@/lib/ai/factory';
import { AIProviderError } from '@/lib/ai/provider';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, topic, mode } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get AI provider (auto-selects best available: OpenAI > Ollama > Mock)
    const providerType = (process.env.AI_PROVIDER as any) || 'auto';
    const provider = await AIProviderFactory.getProvider(providerType);

    // Generate response using the selected provider
    const response = await provider.generateResponse(messages, {
      topic,
      mode,
      maxTokens: 150,
      temperature: 0.7,
    });

    return NextResponse.json({
      message: response,
      provider: provider.getName(),
    });
  } catch (error) {
    console.error('Chat API error:', error);

    if (error instanceof AIProviderError) {
      return NextResponse.json(
        {
          error: error.message,
          provider: error.provider,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
