export const Routes = {
  Home: 'Home',
  Chat: 'Chat',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
