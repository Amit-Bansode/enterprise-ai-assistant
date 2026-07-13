export type CardAccent = 'blue' | 'green' | 'purple' | 'orange' | 'primary';

export const cardAccentColors: Record<CardAccent, string> = {
  blue: '#2563EB',
  green: '#16A34A',
  purple: '#7C3AED',
  orange: '#EA580C',
  primary: '#2563EB',
};

export const cardAccentBackgrounds: Record<CardAccent, string> = {
  blue: '#EFF6FF',
  green: '#F0FDF4',
  purple: '#F5F3FF',
  orange: '#FFF7ED',
  primary: '#EFF6FF',
};

export const cardAccentBackgroundsDark: Record<CardAccent, string> = {
  blue: '#1E3A5F',
  green: '#14532D',
  purple: '#3B0764',
  orange: '#7C2D12',
  primary: '#1E3A5F',
};

export function getCardAccentBackground(accent: CardAccent, isDark: boolean): string {
  return isDark ? cardAccentBackgroundsDark[accent] : cardAccentBackgrounds[accent];
}
