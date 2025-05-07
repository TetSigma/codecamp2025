import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { UIText } from '../atoms';

type Props = {
  text: string;
  fromUser: boolean;
};

export default function UIMessageBubble({ text, fromUser }: Props) {
  const { theme } = useUnistyles();

  return (
    <View
      style={[
        styles(theme).bubble,
        fromUser ? styles(theme).user : styles(theme).ai,
      ]}
    >
      <UIText
        style={{
          color: fromUser
            ? theme.colors.background
            : theme.colors.typography,
          fontFamily: theme.fonts.regular,
          fontSize: theme.s(14),
          lineHeight: theme.s(20),
        }}
      >
        {text}
      </UIText>
    </View>
  );
}

const styles = (theme: ReturnType<typeof useUnistyles>['theme']) =>
  StyleSheet.create({
    bubble: {
      paddingVertical: theme.s(12),
      paddingHorizontal: theme.s(16),
      borderRadius: theme.borderRadius.md,
      marginVertical: theme.s(8),
      maxWidth: '80%',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    user: {
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end',
      marginRight: theme.s(16),
    },
    ai: {
      backgroundColor: theme.colors.background,
      alignSelf: 'flex-start',
      marginLeft: theme.s(16),
    },
  });
