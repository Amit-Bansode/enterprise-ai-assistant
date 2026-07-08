import type { AIResponse } from '@/application/provider/types';
import type {
  UIComponentDescriptor,
  LLMStructuredOutput,
  ParsedResponse,
} from '@/application/parser/types';

function isComponentDescriptor(value: unknown): value is UIComponentDescriptor {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const descriptor = value as UIComponentDescriptor;
  return (
    typeof descriptor.id === 'string' &&
    typeof descriptor.kind === 'string' &&
    typeof descriptor.title === 'string' &&
    typeof descriptor.body === 'string' &&
    typeof descriptor.data === 'object'
  );
}

function normalizeDescriptors(value: unknown): UIComponentDescriptor[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isComponentDescriptor);
}

export function parseResponse(aiResponse: AIResponse): ParsedResponse {
  try {
    const parsed = JSON.parse(aiResponse.raw) as Partial<LLMStructuredOutput>;

    return {
      messageText: parsed.message ?? aiResponse.text,
      descriptors: normalizeDescriptors(parsed.descriptors),
    };
  } catch {
    return {
      messageText: aiResponse.text,
      descriptors: [],
    };
  }
}
