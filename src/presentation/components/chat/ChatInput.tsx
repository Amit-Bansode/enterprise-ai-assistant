import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('');
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setValue('');
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <TextInput
        mode="outlined"
        placeholder="Ask me anything..."
        value={value}
        onChangeText={setValue}
        style={styles.input}
        multiline
        disabled={disabled}
      />
      <IconButton
        icon="send"
        mode="contained"
        onPress={handleSend}
        disabled={disabled || value.trim().length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  input: {
    flex: 1,
    maxHeight: 120,
  },
});
