import Config from 'react-native-config';

import { apiClient } from '@/core/network/apiClient';
import type { AIProvider } from '@/application/provider/AIProvider';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

export class GeminiProvider implements AIProvider {
  async generate(prompt: string): Promise<string> {
    const apiKey = Config.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const response = await apiClient.post<GeminiResponse>(
      `${GEMINI_BASE_URL}?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      throw new Error('Gemini returned an empty response');
    }

    return text;
  }
}

export const geminiProvider = new GeminiProvider();

export function isGeminiConfigured(): boolean {
  return Boolean(Config.GEMINI_API_KEY?.trim());
}
