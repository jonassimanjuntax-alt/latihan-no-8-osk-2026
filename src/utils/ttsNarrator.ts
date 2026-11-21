export type NarratorStatus = 'idle' | 'speaking' | 'paused';

export interface NarratorState {
  status: NarratorStatus;
  title: string;
  rate: number;
  muted: boolean;
  supported: boolean;
  currentText: string;
}

type Listener = (state: NarratorState) => void;

class MisterJoNarrator {
  private state: NarratorState = {
    status: 'idle',
    title: 'MISTER JO siap membimbing Anda',
    rate: 1.0,
    muted: false,
    supported: typeof window !== 'undefined' && 'speechSynthesis' in window,
    currentText: '',
  };

  private listeners = new Set<Listener>();
  private queue: string[] = [];
  private queueIndex = 0;
  private activeSessionId = 0;

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    const snapshot = { ...this.state };
    this.listeners.forEach((l) => l(snapshot));
  }

  private pickIndonesianVoice(): SpeechSynthesisVoice | null {
    if (!this.state.supported) return null;
    const voices = window.speechSynthesis.getVoices();
    const idVoice =
      voices.find((v) => v.lang.toLowerCase().startsWith('id-id')) ||
      voices.find((v) => v.lang.toLowerCase().includes('id')) ||
      voices.find((v) => v.name.toLowerCase().includes('indonesia'));
    return idVoice || null;
  }

  private splitIntoChunks(text: string): string[] {
    const cleaned = text
      .replace(/\s+/g, ' ')
      .replace(/;/g, '.')
      .trim();
    if (!cleaned) return [];
    const rawSentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
    const chunks: string[] = [];
    let buffer = '';
    for (const sentence of rawSentences) {
      const s = sentence.trim();
      if (!s) continue;
      if ((buffer + ' ' + s).length > 220 && buffer) {
        chunks.push(buffer.trim());
        buffer = s;
      } else {
        buffer = buffer ? `${buffer} ${s}` : s;
      }
    }
    if (buffer.trim()) chunks.push(buffer.trim());
    return chunks;
  }

  speak(title: string, text: string) {
    if (!this.state.supported) {
      this.state = {
        ...this.state,
        status: 'idle',
        title: `${title} (Audio tidak didukung di browser ini)`,
        currentText: text,
      };
      this.emit();
      return;
    }

    window.speechSynthesis.cancel();
    this.activeSessionId += 1;
    const sessionId = this.activeSessionId;

    if (this.state.muted) {
      this.state = {
        ...this.state,
        status: 'idle',
        title: `${title} (Suara dimatikan)`,
        currentText: text,
      };
      this.emit();
      return;
    }

    this.queue = this.splitIntoChunks(text);
    this.queueIndex = 0;

    if (this.queue.length === 0) {
      this.state = { ...this.state, status: 'idle', title, currentText: text };
      this.emit();
      return;
    }

    this.state = {
      ...this.state,
      status: 'speaking',
      title,
      currentText: text,
    };
    this.emit();

    this.speakNextChunk(sessionId);
  }

  private speakNextChunk(sessionId: number) {
    if (sessionId !== this.activeSessionId || !this.state.supported) return;
    if (this.queueIndex >= this.queue.length) {
      this.state = { ...this.state, status: 'idle' };
      this.emit();
      return;
    }

    const chunk = this.queue[this.queueIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);
    const voice = this.pickIndonesianVoice();
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = 'id-ID';
    utterance.rate = this.state.rate;
    utterance.pitch = 0.96; // Slightly authoritative, calm Physics teacher tone

    utterance.onend = () => {
      if (sessionId !== this.activeSessionId) return;
      this.queueIndex += 1;
      this.speakNextChunk(sessionId);
    };

    utterance.onerror = () => {
      if (sessionId !== this.activeSessionId) return;
      this.state = { ...this.state, status: 'idle' };
      this.emit();
    };

    window.speechSynthesis.speak(utterance);
  }

  pause() {
    if (!this.state.supported || this.state.status !== 'speaking') return;
    window.speechSynthesis.pause();
    this.state = { ...this.state, status: 'paused' };
    this.emit();
  }

  resume() {
    if (!this.state.supported || this.state.status !== 'paused') return;
    window.speechSynthesis.resume();
    this.state = { ...this.state, status: 'speaking' };
    this.emit();
  }

  replay() {
    if (!this.state.currentText) return;
    this.speak(this.state.title, this.state.currentText);
  }

  stop() {
    this.activeSessionId += 1;
    if (this.state.supported) {
      window.speechSynthesis.cancel();
    }
    this.queue = [];
    this.queueIndex = 0;
    this.state = { ...this.state, status: 'idle' };
    this.emit();
  }

  setRate(rate: number) {
    this.state = { ...this.state, rate };
    this.emit();
    if (this.state.status === 'speaking' && this.state.currentText) {
      this.speak(this.state.title, this.state.currentText);
    }
  }

  toggleMute() {
    const nextMuted = !this.state.muted;
    this.state = { ...this.state, muted: nextMuted };
    if (nextMuted) {
      this.stop();
    } else {
      this.emit();
    }
  }
}

export const misterJoNarrator = new MisterJoNarrator();
