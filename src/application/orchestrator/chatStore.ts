import { create } from 'zustand';

import { chatOrchestrator } from '@/application/orchestrator/chatOrchestrator';
import type { UIComponent } from '@/application/factory/types';
import type { Message } from '@/domain/entities/Message';
import { createId } from '@/core/utils/id';

interface ChatState {
  messages: Message[];
  components: UIComponent[];
  isThinking: boolean;
  isInitialized: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  components: [],
  isThinking: false,
  isInitialized: false,
  error: null,

  initialize: async () => {
    set({ isThinking: true, error: null });
    try {
      const result = await chatOrchestrator.initialize();
      set({
        messages: result.messages,
        components: result.components,
        isThinking: false,
        isInitialized: true,
      });
    } catch (error) {
      set({
        isThinking: false,
        error: error instanceof Error ? error.message : 'Failed to initialize chat',
      });
    }
  },

  sendMessage: async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    const optimisticMessage: Message = {
      id: createId('user'),
      role: 'user',
      content: trimmed,
      createdAt: new Date().toISOString(),
    };

    set(state => ({
      isThinking: true,
      error: null,
      messages: [...state.messages, optimisticMessage],
      components: [],
    }));

    try {
      const turn = await chatOrchestrator.sendMessage(trimmed);

      set({
        messages: turn.messages,
        components: turn.components,
        isThinking: false,
      });
    } catch (error) {
      set({
        isThinking: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  },

  clearChat: async () => {
    set({ isThinking: true, error: null, components: [] });
    try {
      const result = await chatOrchestrator.clearMessages();
      set({
        messages: result.messages,
        components: result.components,
        isThinking: false,
      });
    } catch (error) {
      set({
        isThinking: false,
        error: error instanceof Error ? error.message : 'Failed to clear chat',
      });
    }
  },
}));
