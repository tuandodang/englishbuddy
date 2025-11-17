'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader, Settings } from 'lucide-react';
import Link from 'next/link';

interface AIStatusIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export function AIStatusIndicator({ className = '', showDetails = false }: AIStatusIndicatorProps) {
  const [status, setStatus] = useState<{
    name: string;
    available: boolean;
    type: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await fetch('/api/ai-status');
      const data = await response.json();
      setStatus(data.current);
    } catch (error) {
      console.error('Failed to check AI status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-500">Checking AI...</span>
      </div>
    );
  }

  if (!status) {
    return null;
  }

  const getProviderEmoji = (type: string) => {
    const emojis: Record<string, string> = {
      openai: '🤖',
      ollama: '🦙',
      mock: '🎭',
    };
    return emojis[type] || '🤖';
  };

  const getProviderColor = (type: string) => {
    const colors: Record<string, string> = {
      openai: 'text-green-600 bg-green-50',
      ollama: 'text-purple-600 bg-purple-50',
      mock: 'text-gray-600 bg-gray-50',
    };
    return colors[type] || 'text-blue-600 bg-blue-50';
  };

  return (
    <Link href="/settings">
      <div
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer hover:opacity-80 transition-opacity ${getProviderColor(
          status.type
        )} ${className}`}
      >
        {status.available ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <XCircle className="w-4 h-4" />
        )}
        <span className="text-sm font-semibold">
          {getProviderEmoji(status.type)} {status.name}
        </span>
        {showDetails && (
          <Settings className="w-4 h-4 opacity-50" />
        )}
      </div>
    </Link>
  );
}
