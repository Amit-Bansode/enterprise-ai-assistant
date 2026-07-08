import type { Routes } from '@/core/constants/routes';

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Chat]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
