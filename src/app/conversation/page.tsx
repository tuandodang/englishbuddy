'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Mic,
  MicOff,
  Home,
  Volume2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AIStatusIndicator } from '@/components/AIStatusIndicator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! 👋 I\'m English Buddy! What\'s your name?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [mode, setMode] = useState<'DAILY' | 'SITUATION' | 'VOCABULARY_BASED'>('DAILY');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast.error('Could not hear you. Try again! 🎤');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      toast.success('Listening... 🎤');
    }
  };

  const speakMessage = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Auto-speak the response
      setTimeout(() => {
        speakMessage(data.message);
      }, 300);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Oops! Something went wrong. Try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>

          <div className="flex items-center gap-2 kid-card bg-gradient-to-r from-purple-400 to-purple-600 text-white">
            <MessageCircle className="w-6 h-6" />
            <span className="font-bold text-xl">Chat with Buddy</span>
          </div>

          <AIStatusIndicator showDetails />
        </div>

        {/* Mode Selection */}
        <div className="flex gap-2 mb-4 justify-center">
          <button
            onClick={() => setMode('DAILY')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              mode === 'DAILY'
                ? 'bg-purple-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            💬 Daily Chat
          </button>
          <button
            onClick={() => setMode('SITUATION')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              mode === 'SITUATION'
                ? 'bg-purple-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            🎭 Situations
          </button>
          <button
            onClick={() => setMode('VOCABULARY_BASED')}
            className={`px-4 py-2 rounded-xl font-bold transition-all ${
              mode === 'VOCABULARY_BASED'
                ? 'bg-purple-500 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            📚 Vocabulary
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 kid-card overflow-y-auto mb-4 p-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 mb-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600'
                      : 'bg-gradient-to-br from-purple-400 to-purple-600'
                  }`}
                >
                  <span className="text-2xl">
                    {message.role === 'user' ? '👦' : '🤖'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border-2 border-purple-200'
                  }`}
                >
                  <p className="text-lg">{message.content}</p>

                  {message.role === 'assistant' && (
                    <button
                      onClick={() => speakMessage(message.content)}
                      className="mt-2 text-purple-600 hover:text-purple-700 flex items-center gap-1 text-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      Listen
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-4">
                <div className="flex gap-2">
                  <motion.div
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="kid-card p-4">
          <div className="flex gap-3 items-end">
            <button
              onClick={toggleListening}
              className={`kid-button flex-shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use the mic... 😊"
              className="flex-1 p-4 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-lg resize-none"
              rows={2}
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="kid-button bg-gradient-to-r from-purple-500 to-purple-600 text-white flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Powered by AI - Safe for kids</span>
            </div>
            <AIStatusIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
