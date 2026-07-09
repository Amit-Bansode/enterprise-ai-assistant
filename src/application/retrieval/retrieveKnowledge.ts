import type { ActionResult } from '@/application/actions/types';
import type { KnowledgeItem, KnowledgeResult } from '@/application/retrieval/types';
import { retrievePolicies } from '@/application/retrieval/policyRetriever';

function toKnowledgeItem(policy: ReturnType<typeof retrievePolicies>[number], score: number): KnowledgeItem {
  return {
    ...policy,
    snippet: policy.content.slice(0, 160),
    relevanceScore: score,
  };
}

export async function retrieveKnowledge(
  query: string,
  actionResult: ActionResult,
): Promise<KnowledgeResult | null> {
  if (!actionResult.requiresKnowledge) {
    return null;
  }

  const policies = retrievePolicies(query, 2);

  if (policies.length === 0) {
    const fallback = retrievePolicies('leave policy', 1);
    if (fallback.length === 0) {
      return { query, items: [] };
    }
    return {
      query,
      items: [toKnowledgeItem(fallback[0], 0)],
    };
  }

  return {
    query,
    items: policies.map((policy, index) => toKnowledgeItem(policy, policies.length - index)),
  };
}
