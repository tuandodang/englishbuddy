'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Info,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface AIProvider {
  name: string;
  type: string;
  available: boolean;
}

interface AIStatus {
  current: {
    name: string;
    available: boolean;
    type: string;
  };
  providers: AIProvider[];
  recommendation: string;
}

export default function AISettingsPage() {
  const [aiStatus, setAiStatus] = useState<AIStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState<string | null>(null);

  useEffect(() => {
    checkAIStatus();
  }, []);

  const checkAIStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-status');
      const data = await response.json();
      setAiStatus(data);
    } catch (error) {
      console.error('Failed to check AI status:', error);
      toast.error('Failed to check AI status');
    } finally {
      setLoading(false);
    }
  };

  const testProvider = async (type: string) => {
    setTesting(type);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Hello! Say hi in a fun way!' }],
        }),
      });

      if (!response.ok) {
        throw new Error('Test failed');
      }

      const data = await response.json();
      toast.success(`✅ ${data.provider} works! Response: "${data.message}"`);
    } catch (error) {
      toast.error(`❌ Test failed for ${type}`);
    } finally {
      setTesting(null);
    }
  };

  const providerConfigs = {
    openai: {
      emoji: '🤖',
      title: 'OpenAI API',
      description: 'GPT-4o-mini - Best quality AI',
      cost: '~$0.60/month',
      pros: ['Excellent quality', 'Fast responses', 'Low cost'],
      cons: ['Requires API key', 'Internet needed'],
      setup: [
        'Sign up at platform.openai.com',
        'Create API key',
        'Add to .env: OPENAI_API_KEY="sk-..."',
        'Set AI_PROVIDER="openai" or "auto"',
      ],
      link: 'https://platform.openai.com',
      color: 'from-green-400 to-emerald-600',
    },
    ollama: {
      emoji: '🦙',
      title: 'Ollama (Local AI)',
      description: '100% Free - Runs on your computer',
      cost: 'FREE',
      pros: ['Completely free', 'Offline capable', 'Privacy-focused', 'Unlimited usage'],
      cons: ['Requires installation', '4-7GB download', 'Slower than OpenAI'],
      setup: [
        'Install from ollama.ai',
        'Run: ollama pull llama2',
        'Add to .env: AI_PROVIDER="ollama"',
        'Set OLLAMA_MODEL="llama2"',
      ],
      link: 'https://ollama.ai',
      color: 'from-purple-400 to-purple-600',
    },
    mock: {
      emoji: '🎭',
      title: 'Mock AI (Demo)',
      description: 'Pre-defined responses for testing',
      cost: 'FREE',
      pros: ['Zero setup', 'Works immediately', 'No API keys needed'],
      cons: ['Limited responses', 'No real AI', 'Basic functionality'],
      setup: [
        'No setup required!',
        'Just don\'t configure other AI options',
        'Or set AI_PROVIDER="mock"',
        'Perfect for testing the app',
      ],
      link: null,
      color: 'from-gray-400 to-gray-600',
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Checking AI providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Settings className="w-12 h-12 text-blue-600" />
              AI Settings
            </h1>
            <p className="text-xl text-gray-600">
              Configure your AI provider for the best experience
            </p>
          </div>

          <Link href="/">
            <button className="kid-button bg-white hover:bg-gray-100 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home
            </button>
          </Link>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="kid-card bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Currently Active</h2>
              <p className="text-3xl font-bold mb-2">
                {aiStatus?.current.name || 'Unknown'}
              </p>
              <p className="text-lg opacity-90">
                {aiStatus?.recommendation || ''}
              </p>
            </div>

            <div className="text-right">
              {aiStatus?.current.available ? (
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">Active</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-300">
                  <XCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">Inactive</span>
                </div>
              )}

              <button
                onClick={checkAIStatus}
                className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-xl font-bold hover:bg-gray-100 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </motion.div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(providerConfigs).map(([type, config], index) => {
            const provider = aiStatus?.providers.find(p => p.type === type);
            const isActive = aiStatus?.current.type === type;

            return (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`kid-card relative ${
                  isActive ? 'border-4 border-blue-500 shadow-2xl' : ''
                }`}
              >
                {isActive && (
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ACTIVE
                  </div>
                )}

                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center text-5xl mb-4`}
                >
                  {config.emoji}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {config.title}
                </h3>

                <p className="text-gray-600 mb-3">{config.description}</p>

                <div className="mb-4">
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg font-bold">
                    {config.cost}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4 flex items-center gap-2">
                  {provider?.available ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-600 font-semibold">
                        Available
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-semibold">
                        Not configured
                      </span>
                    </>
                  )}
                </div>

                {/* Pros */}
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Pros:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {config.pros.map((pro, i) => (
                      <li key={i}>• {pro}</li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    Cons:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {config.cons.map((con, i) => (
                      <li key={i}>• {con}</li>
                    ))}
                  </ul>
                </div>

                {/* Setup Steps */}
                <details className="mb-4">
                  <summary className="cursor-pointer font-bold text-blue-600 hover:text-blue-700">
                    Setup Instructions
                  </summary>
                  <ol className="mt-2 text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    {config.setup.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </details>

                {/* Actions */}
                <div className="space-y-2">
                  {provider?.available && (
                    <button
                      onClick={() => testProvider(type)}
                      disabled={testing === type}
                      className="w-full kid-button bg-gradient-to-r from-green-500 to-green-600 text-white disabled:opacity-50"
                    >
                      {testing === type ? (
                        <>
                          <RefreshCw className="w-4 h-4 inline animate-spin mr-2" />
                          Testing...
                        </>
                      ) : (
                        'Test Provider'
                      )}
                    </button>
                  )}

                  {config.link && (
                    <a
                      href={config.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full kid-button bg-white hover:bg-gray-100 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Guide */}
          <div className="kid-card bg-blue-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              Quick Guide
            </h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong className="text-blue-600">For Best Quality:</strong>
                <p>Use OpenAI API (~$0.60/month)</p>
              </div>
              <div>
                <strong className="text-purple-600">For Free & Privacy:</strong>
                <p>Use Ollama (runs locally)</p>
              </div>
              <div>
                <strong className="text-gray-600">For Testing:</strong>
                <p>Use Mock AI (no setup)</p>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="kid-card bg-green-50">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-green-600" />
              Documentation
            </h3>
            <div className="space-y-2">
              <Link href="/SETUP_AI.md" className="block">
                <div className="p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                  <strong className="text-green-600">📖 Complete Setup Guide</strong>
                  <p className="text-sm text-gray-600">Step-by-step instructions</p>
                </div>
              </Link>
              <a
                href="https://github.com/tuandodang/englishbuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors">
                  <strong className="text-green-600">🔗 GitHub Repository</strong>
                  <p className="text-sm text-gray-600">Source code and issues</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="kid-card bg-gray-50 mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Environment Configuration
          </h3>
          <p className="text-gray-600 mb-4">
            Add these to your <code className="bg-gray-200 px-2 py-1 rounded">.env</code> file:
          </p>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-xl overflow-x-auto">
{`# AI Configuration
AI_PROVIDER="auto"  # auto, openai, ollama, or mock

# OpenAI (~$0.60/month)
OPENAI_API_KEY="sk-your-api-key"

# Ollama (FREE)
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama2"`}
          </pre>
        </div>
      </div>
    </div>
  );
}
