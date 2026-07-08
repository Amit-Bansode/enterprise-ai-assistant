export interface KnowledgeItem {
  id: string;
  title: string;
  snippet: string;
  source: string;
}

export interface KnowledgeResult {
  query: string;
  items: KnowledgeItem[];
}
