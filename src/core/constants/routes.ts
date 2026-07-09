export const Routes = {
  Chat: 'Chat',
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
