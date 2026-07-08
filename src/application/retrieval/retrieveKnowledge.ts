import type { ActionResult } from '@/application/actions/types';
import type { KnowledgeItem, KnowledgeResult } from '@/application/retrieval/types';

const mockKnowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb_1',
    title: 'Leave Policy 2026',
    snippet: 'Annual leave requests require manager approval at least 3 days in advance.',
    source: 'HR Handbook',
  },
  {
    id: 'kb_2',
    title: 'Remote Work Guidelines',
    snippet: 'Hybrid employees may work remotely up to 2 days per week with team approval.',
    source: 'People Operations',
  },
  {
    id: 'kb_3',
    title: 'Expense Reimbursement SOP',
    snippet: 'Submit expenses within 30 days with receipts attached in the finance portal.',
    source: 'Finance Wiki',
  },
];

function scoreItem(query: string, item: KnowledgeItem): number {
  const normalized = query.toLowerCase();
  const haystack = `${item.title} ${item.snippet} ${item.source}`.toLowerCase();
  return haystack.split(' ').filter(token => normalized.includes(token)).length;
}

export async function retrieveKnowledge(
  query: string,
  actionResult: ActionResult,
): Promise<KnowledgeResult | null> {
  if (!actionResult.requiresKnowledge) {
    return null;
  }

  const items = mockKnowledgeBase
    .map(item => ({ item, score: scoreItem(query, item) }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(entry => entry.item);

  const fallback = items.length > 0 ? items : mockKnowledgeBase.slice(0, 2);

  return {
    query,
    items: fallback,
  };
}
