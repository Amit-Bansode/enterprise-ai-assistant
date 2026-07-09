import Config from 'react-native-config';

export const appConfig = {
  appName: 'Enterprise AI Assistant',
  apiBaseUrl: 'https://api.example.com',
  useMockData: true,
  useGemini: Boolean(Config.GEMINI_API_KEY?.trim()),
} as const;
