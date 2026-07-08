import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Routes } from '@/core/constants/routes';
import { ScreenContainer } from '@/presentation/components/common/ScreenContainer';
import type { RootStackParamList } from '@/presentation/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, typeof Routes.Home>;

export function HomeScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Enterprise AI Assistant
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Natural language access to enterprise knowledge, workflows, and GenUI
          actions.
        </Text>
        <Button
          mode="contained"
          icon="chat-processing-outline"
          onPress={() => navigation.navigate(Routes.Chat)}
          style={styles.button}>
          Open assistant chat
        </Button>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    opacity: 0.8,
  },
  button: {
    marginTop: 8,
  },
});
