import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '@/core/constants/routes';
import { ChatScreen } from '@/presentation/screens/ChatScreen';
import { HomeScreen } from '@/presentation/screens/HomeScreen';
import type { RootStackParamList } from '@/presentation/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen name={Routes.Chat} component={ChatScreen} />
    </Stack.Navigator>
  );
}
