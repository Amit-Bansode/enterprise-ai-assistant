import { create } from 'zustand';

import { chatOrchestrator } from '@/application/orchestrator/chatOrchestrator';
import type { GenUIComponentDescriptor } from '@/application/factory/genUIComponentFactory';
import type { Message } from '@/domain/entities/Message';

interface ChatState {
  messages: Message[];
  activeGenUI: GenUIComponentDescriptor | null;
  isLoading: boolean;
  error: string | null;
  loadMessages: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => Promise<void>;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  activeGenUI: null,
  isLoading: false,
  error: null,

  loadMessages: async () => {
    set({ isLoading: true, error: null });
    try {
      const messages = await chatOrchestrator.loadMessages();
      set({ messages, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load messages',
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
      const messages = await chatOrchestrator.loadMessages();

      set({
        messages,
        activeGenUI: turn.genUI,
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
      await chatOrchestrator.clearMessages();
      set({ messages: [], activeGenUI: null, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to clear chat',
      });
    }
  },
}));
