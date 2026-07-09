import type { PolicyDocument } from '@/application/retrieval/types';
import { geminiProvider, isGeminiConfigured } from '@/application/provider/GeminiProvider';

export function buildPolicyExplanationPrompt(query: string, policy: PolicyDocument): string {
  return `You are an enterprise AI assistant answering an employee question using ONLY the company policy below.
Do not invent information outside the policy.
Return 2-3 friendly sentences in plain language.

Policy title: ${policy.title}
Policy content: ${policy.content}
Key points: ${policy.bullets.join('; ')}
Source: ${policy.source}

Employee question: ${query}`;
}

export function buildPolicyExplanationFallback(query: string, policy: PolicyDocument): string {
  return `Based on ${policy.source}, ${policy.title}: ${policy.bullets.join('. ')}.`;
}

export async function explainPolicy(
  query: string,
  policy: PolicyDocument,
): Promise<string> {
  const fallback = buildPolicyExplanationFallback(query, policy);

  if (!isGeminiConfigured()) {
    return fallback;
  }

  try {
    const prompt = buildPolicyExplanationPrompt(query, policy);
    const answer = await geminiProvider.generate(prompt);
    return answer.trim() || fallback;
  } catch {
    return fallback;
  }
}
