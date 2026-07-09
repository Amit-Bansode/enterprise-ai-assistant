import { create } from 'zustand';

import { chatOrchestrator } from '@/application/orchestrator/chatOrchestrator';
import type { UIComponent } from '@/application/factory/types';
import type { Message } from '@/domain/entities/Message';

interface ChatState {
  messages: Message[];
  components: UIComponent[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  components: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await chatOrchestrator.initialize();
      set({
        messages: result.messages,
        components: result.components,
        isLoading: false,
        isInitialized: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize chat',
      });
    }
  },

  sendMessage: async (content: string) => {
    if (!content.trim()) {
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const turn = await chatOrchestrator.sendMessage(content);

      set({
        messages: turn.messages,
        components: turn.components,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send message',
      });
    }
  },

  clearChat: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await chatOrchestrator.clearMessages();
      set({
        messages: result.messages,
        components: result.components,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to clear chat',
      });
    }
  },
}));
