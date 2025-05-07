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
            ? theme.colors.primary
            : theme.colors.typography,
          fontFamily: theme.fonts.regular,
          fontSize: theme.s(14),
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
      paddingVertical: theme.s(10),
      paddingHorizontal: theme.s(14),
      borderRadius: theme.borderRadius.xl,
      marginVertical: theme.s(4),
      maxWidth: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      borderWidth: 1,
    },
    user: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      alignSelf: 'flex-end',
    },
    ai: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      alignSelf: 'flex-start',
    },
  });
