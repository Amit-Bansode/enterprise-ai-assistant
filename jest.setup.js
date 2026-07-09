jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {
    GEMINI_API_KEY: '',
  },
}));

jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    getString: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  }),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
