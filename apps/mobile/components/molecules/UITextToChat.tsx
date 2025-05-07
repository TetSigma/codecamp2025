import { useState } from 'react';
import { View, TextInput, Pressable } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { UIText } from '../atoms';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

type UITextInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export const UITextToChat = ({ onSend, disabled = false }: UITextInputProps) => {
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(44);
  const { theme } = useUnistyles();

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed !== '' && !disabled) {
      onSend(trimmed);
      setText('');
      setInputHeight(44);
    }
  };

  return (
    <View style={styles(theme).container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Napisz wiadomość..."
        multiline
        editable={!disabled}
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
        onContentSizeChange={(e) => {
          const height = e.nativeEvent.contentSize.height;
          setInputHeight(Math.min(height, theme.s(140)));
        }}
        placeholderTextColor={theme.colors.mutedText}
        style={[
          styles(theme).input,
          {
            height: inputHeight,
            backgroundColor: theme.colors.background,
            color: theme.colors.typography,
            fontFamily: theme.fonts.regular,
          },
        ]}
      />

      <Animated.View
        entering={FadeInUp.duration(300)}
        layout={Layout.springify()}
        style={styles(theme).buttonWrapper}
      >
        <Pressable
          onPress={handleSubmit}
          style={[
            styles(theme).button,
            disabled && { opacity: 0.5 },
          ]}
          disabled={disabled}
        >
          <Ionicons name="send" size={24} color={theme.colors.background} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = (theme: ReturnType<typeof useUnistyles>['theme']) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: theme.s(12),
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      gap: theme.s(8),
    },
    input: {
      flex: 1,
      minHeight: theme.s(44),
      maxHeight: theme.s(140),
      borderRadius: theme.borderRadius.lg,
      paddingVertical: theme.s(12),
      paddingHorizontal: theme.s(16),
      fontSize: theme.s(14),
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonWrapper: {
      justifyContent: 'flex-end',
    },
    button: {
      width: theme.s(48),
      height: theme.s(48),
      borderRadius: theme.borderRadius.full,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
  });

export default UITextToChat;
