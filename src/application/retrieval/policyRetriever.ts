import policies from '@/data/datasource/mock/policies.json';
import type { PolicyDocument } from '@/application/retrieval/types';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
}

function scorePolicy(query: string, policy: PolicyDocument): number {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    return 0;
  }

  const searchable = [
    policy.title,
    policy.content,
    policy.source,
    ...policy.tags,
    ...policy.bullets,
  ]
    .join(' ')
    .toLowerCase();

  return queryTokens.reduce((score, token) => {
    if (searchable.includes(token)) {
      return score + 1;
    }
    return score;
  }, 0);
}

export function getPolicyCatalog(): PolicyDocument[] {
  return policies as PolicyDocument[];
}

export function retrievePolicies(query: string, limit = 1): PolicyDocument[] {
  return (policies as PolicyDocument[])
    .map(policy => ({ policy, score: scorePolicy(query, policy) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(entry => entry.policy);
}

export function retrieveBestPolicy(query: string): PolicyDocument | null {
  const results = retrievePolicies(query, 1);
  return results[0] ?? null;
}
