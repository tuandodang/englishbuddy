import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateMastery(correctAnswers: number, totalAttempts: number): number {
  if (totalAttempts === 0) return 0;
  const percentage = (correctAnswers / totalAttempts) * 100;
  return Math.min(100, Math.round(percentage));
}

export function getPointsForActivity(type: string, accuracy?: number): number {
  const basePoints: Record<string, number> = {
    VOCABULARY: 10,
    PRONUNCIATION: 15,
    CONVERSATION: 20,
    STORY: 25,
    GAME: 15,
  };

  const points = basePoints[type] || 10;

  if (accuracy !== undefined) {
    // Bonus points for high accuracy
    if (accuracy >= 90) return points + 10;
    if (accuracy >= 80) return points + 5;
  }

  return points;
}

export function getBadgeIcon(badgeType: string): string {
  const icons: Record<string, string> = {
    VOCABULARY_MASTER: '📚',
    PRONUNCIATION_PRO: '🗣️',
    CONVERSATION_KING: '👑',
    DAILY_STREAK: '🔥',
    PERFECT_SCORE: '⭐',
    STORY_READER: '📖',
  };

  return icons[badgeType] || '🏆';
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) return `${remainingSeconds}s`;
  return `${minutes}m ${remainingSeconds}s`;
}

export function getEncouragementMessage(score: number): string {
  if (score >= 90) return 'Amazing! You\'re a superstar! ⭐';
  if (score >= 80) return 'Great job! Keep it up! 🎉';
  if (score >= 70) return 'Good work! You\'re getting better! 👍';
  if (score >= 60) return 'Nice try! Practice makes perfect! 💪';
  return 'Keep practicing! You can do it! 🌟';
}
