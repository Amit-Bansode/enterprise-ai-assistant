export interface PolicyDocument {
  id: string;
  title: string;
  content: string;
  bullets: string[];
  tags: string[];
  source: string;
  updatedAt: string;
}

export interface KnowledgeItem extends PolicyDocument {
  snippet: string;
  relevanceScore: number;
}

export interface KnowledgeResult {
  query: string;
  items: KnowledgeItem[];
}
