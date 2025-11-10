export type DebateSide = 'Pro' | 'Con';
export type DebatePhase = 'OPENING' | 'CROSS_EXAMINATION' | 'FREE_DEBATE' | 'CLOSING';
export type TurnType = 'OPENING' | 'QUESTION' | 'ANSWER' | 'FREE_DEBATE' | 'CLOSING';

export type Provider = 'gemini' | 'openai' | 'deepseek' | 'kimi';

export interface ApiKeys {
  gemini: string;
  openai: string;
  deepseek: string;
  kimi: string;
}

export interface DebateConfig {
  topic: string;
  proModel: string;
  conModel: string;
}

export interface Message {
  side: DebateSide;
  text: string;
  model: string;
  phase: DebatePhase;
  turnTypeLabel: string;
}
