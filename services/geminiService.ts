import { GoogleGenAI } from "@google/genai";
import type { DebateSide, DebatePhase, TurnType } from '../types';

export interface ArgumentRequest {
  topic: string;
  debateTranscript: string;
  side: DebateSide;
  model: string;
  phase: DebatePhase;
  turnType: TurnType;
}

const getPrompt = ({
  topic,
  debateTranscript,
  side,
  phase,
  turnType,
}: Omit<ArgumentRequest, 'model'>): string => {
    const role = `你是一位世界级的辩论高手，你擅长拆解辩论主题，深入分析辩论主题中的关键词，从其显性层面、隐形层面、相关性层面等多角度深入思考，为自己的辩论任务提供全面、深入、有力的支撑，你代表 **${side === 'Pro' ? '正方' : '反方'}** 立场。你的语言必须清晰、简洁，易于初中生理解。`;
    
    let task = '';
    switch (turnType) {
        case 'OPENING':
            task = `你的任务是进行开篇立论。清晰地陈述你的核心论点以及你将用来支持立场的基本框架。`;
            break;
        case 'QUESTION':
            task = `你的任务是根据对手之前的陈述，提出一个一针见血的、有深度的问题。你的目标是揭示对方的逻辑漏洞或弱点。不要陈述观点，只提出一个问题。`;
            break;
        case 'ANSWER':
            task = `你的任务是直接、简洁地回答对手提出的问题。回答之后，你可以简要地重申自己的立场，但必须以回答问题为核心。你不能反问。`;
            break;
        case 'FREE_DEBATE':
            task = `现在是自由辩论阶段。你的任务是针对对手的最新观点进行快速、直接的反驳，或者引入一个新的、有说服力的论点。保持你的回应简短有力。`;
            break;
        case 'CLOSING':
            task = `你的任务是进行总结陈词。总结你方的核心论点，强调为何你方立场更优，并指出对方论证中的关键缺陷。这是你最后说服观众的机会。`;
            break;
    }

    return `
      **辩论主题:** ${topic}

      **你的角色:** ${role}

      **当前辩论阶段:** ${phase}

      **你的任务:** ${task}

      **已有辩论记录:**
      ---
      ${debateTranscript.length > 0 ? debateTranscript : '(这是辩论的开场白。)'}
      ---

      **轮到你了:**
      请根据你的角色和已有的辩论记录，提供你的回应。不要重复你的角色、主题或任务指令。不要添加任何对话式的填充词。只需清晰、简洁地陈述你的论点/问题/答案。
    `;
};


export const getNextArgument = async (request: ArgumentRequest): Promise<string> => {
  if (!request.model.startsWith('gemini-')) {
      throw new Error("此演示环境仅支持 Gemini 模型。请在设置中选择 Gemini 模型进行辩论。");
  }

  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = getPrompt(request);

  try {
    const response = await ai.models.generateContent({
        model: request.model,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
         throw new Error("Gemini API 密钥无效或未设置。请在设置中检查您的密钥。");
    }
    throw new Error("AI 模型响应失败，请检查网络或 API 密钥。");
  }
};
