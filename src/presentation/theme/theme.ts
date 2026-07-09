import {
  MD3DarkTheme,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

const fontConfig = configureFonts({ config: {} });

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: fontConfig,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2563EB',
    secondary: '#16A34A',
    tertiary: '#DBEAFE',
    surface: '#FFFFFF',
    background: '#F8FAFC',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level1: '#EFF6FF',
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: fontConfig,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#60A5FA',
    secondary: '#4ADE80',
    tertiary: '#1E3A5F',
    surface: '#1E293B',
    background: '#0F172A',
  },
};
