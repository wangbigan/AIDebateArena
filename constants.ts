import type { Provider } from './types';

export interface Model {
  id: string;
  name: string;
  provider: Provider;
}

export const ALL_AI_MODELS: Model[] = [
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'gemini' },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'gemini' },
    { id: 'gpt-4o', name: 'OpenAI GPT-4o', provider: 'openai' },
    { id: 'gpt-3.5-turbo', name: 'OpenAI GPT-3.5 Turbo', provider: 'openai' },
    { id: 'deepseek-chat', name: 'DeepSeek Chat', provider: 'deepseek' },
    { id: 'moonshot-v1-8k', name: 'Kimi Moonshot V1 8K', provider: 'kimi' },
];


export const DEBATE_PHASES = {
  OPENING: '开篇立论 (Opening Statements)',
  CROSS_EXAMINATION: '盘问攻辩 (Cross-Examination)',
  FREE_DEBATE: '自由辩论 (Free Debate)',
  CLOSING: '总结陈词 (Closing Statements)',
};

// Defines the entire flow of the debate
export const DEBATE_STRUCTURE = [
  // Phase 1: Opening Statements (2 turns)
  { phase: 'OPENING' as const, side: 'Pro' as const, type: 'OPENING' as const, label: '开篇立论' },
  { phase: 'OPENING' as const, side: 'Con' as const, type: 'OPENING' as const, label: '开篇立论' },
  
  // Phase 2: Cross-Examination (3 rounds * 2 turns each = 12 turns)
  // Round 1
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'ANSWER' as const, label: '回答' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'ANSWER' as const, label: '回答' },
  // Round 2
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'ANSWER' as const, label: '回答' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'ANSWER' as const, label: '回答' },
  // Round 3
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'ANSWER' as const, label: '回答' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Pro' as const, type: 'QUESTION' as const, label: '提问' },
  { phase: 'CROSS_EXAMINATION' as const, side: 'Con' as const, type: 'ANSWER' as const, label: '回答' },

  // Phase 3: Free Debate (4 turns)
  { phase: 'FREE_DEBATE' as const, side: 'Pro' as const, type: 'FREE_DEBATE' as const, label: '自由辩论' },
  { phase: 'FREE_DEBATE' as const, side: 'Con' as const, type: 'FREE_DEBATE' as const, label: '自由辩论' },
  { phase: 'FREE_DEBATE' as const, side: 'Pro' as const, type: 'FREE_DEBATE' as const, label: '自由辩论' },
  { phase: 'FREE_DEBATE' as const, side: 'Con' as const, type: 'FREE_DEBATE' as const, label: '自由辩论' },

  // Phase 4: Closing Statements (2 turns)
  { phase: 'CLOSING' as const, side: 'Con' as const, type: 'CLOSING' as const, label: '总结陈词' },
  { phase: 'CLOSING' as const, side: 'Pro' as const, type: 'CLOSING' as const, label: '总结陈词' },
];


export const MAX_TURNS = DEBATE_STRUCTURE.length;
