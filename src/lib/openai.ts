import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateConversationResponse(
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
  topic?: string,
  mode?: string
) {
  const systemPrompt = `You are English Buddy, a friendly and patient English teacher for children aged 5-12.

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

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 150,
  });

  return completion.choices[0].message.content || 'I didn\'t understand that. Can you try again?';
}

export async function generateVocabularyExplanation(word: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a friendly English teacher for children. Explain words simply.',
      },
      {
        role: 'user',
        content: `Explain the word "${word}" in simple terms for a child, and give an example sentence.`,
      },
    ],
    temperature: 0.5,
    max_tokens: 100,
  });

  return completion.choices[0].message.content || '';
}
