declare module 'react-native-config' {
  export interface NativeConfig {
    GEMINI_API_KEY?: string;
  }

  const Config: NativeConfig;
  export default Config;
}
