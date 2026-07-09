import {
  type ConversationContext,
  emptyConversationContext,
} from '@/domain/entities/ConversationContext';
import { StorageKeys } from '@/core/constants/storageKeys';
import { getObject, setObject } from '@/core/storage/mmkvStorage';

export function getConversationContext(): ConversationContext {
  return getObject<ConversationContext>(StorageKeys.conversationContext) ?? emptyConversationContext();
}

export function saveConversationContext(context: ConversationContext): void {
  setObject(StorageKeys.conversationContext, context);
}

export function clearConversationContext(): void {
  setObject(StorageKeys.conversationContext, emptyConversationContext());
}
