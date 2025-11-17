// Sound effects using Web Audio API for kid-friendly feedback

class SoundEffects {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play a success sound
  playSuccess() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Happy ascending notes
    const notes = [523.25, 659.25, 783.99]; // C, E, G
    const now = this.audioContext.currentTime;

    notes.forEach((freq, index) => {
      oscillator.frequency.setValueAtTime(freq, now + index * 0.1);
    });

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    oscillator.start(now);
    oscillator.stop(now + 0.5);
  }

  // Play a celebration sound
  playCelebration() {
    if (!this.audioContext) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, high C
    const now = this.audioContext.currentTime;

    notes.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'triangle';

      const startTime = now + index * 0.1;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }

  // Play a try-again sound (gentle, encouraging)
  playTryAgain() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;

    // Gentle descending notes
    oscillator.frequency.setValueAtTime(392, now); // G
    oscillator.frequency.linearRampToValueAtTime(349.23, now + 0.2); // F

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  // Play a click sound
  playClick() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  // Play a coin/point sound
  playCoin() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;

    // Quick rising tone
    oscillator.frequency.setValueAtTime(988, now); // B
    oscillator.frequency.exponentialRampToValueAtTime(1976, now + 0.1); // B (octave higher)

    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // Play a whoosh sound for page transitions
  playWhoosh() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const now = this.audioContext.currentTime;

    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);

    oscillator.type = 'sawtooth';
    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  // Play a level up sound
  playLevelUp() {
    if (!this.audioContext) return;

    const notes = [
      261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25,
    ]; // C major scale
    const now = this.audioContext.currentTime;

    notes.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + index * 0.05;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  }

  // Play a star collect sound
  playStar() {
    if (!this.audioContext) return;

    // Play multiple quick notes for sparkle effect
    const notes = [1047, 1319, 1568]; // C, E, G (high octave)
    const now = this.audioContext.currentTime;

    notes.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = now + index * 0.03;
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  }
}

// Export singleton instance
export const soundEffects = new SoundEffects();

// Convenience functions
export const playSuccess = () => soundEffects.playSuccess();
export const playCelebration = () => soundEffects.playCelebration();
export const playTryAgain = () => soundEffects.playTryAgain();
export const playClick = () => soundEffects.playClick();
export const playCoin = () => soundEffects.playCoin();
export const playWhoosh = () => soundEffects.playWhoosh();
export const playLevelUp = () => soundEffects.playLevelUp();
export const playStar = () => soundEffects.playStar();
