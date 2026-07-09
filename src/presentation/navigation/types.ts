import { Routes } from '@/core/constants/routes';

export type RootStackParamList = {
  [Routes.Chat]: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
