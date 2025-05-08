import React from 'react';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { UIText } from '../atoms';

type Props = {
  text: string | React.ReactNode;
  fromUser: boolean;
};

export default function UIMessageBubble({ text, fromUser }: Props) {
  const { theme } = useUnistyles();

  return (
    <View
      style={[
        styles(theme).bubbleContainer,
        fromUser ? styles(theme).userAlign : styles(theme).aiAlign,
      ]}
    >
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
    </View>
  );
}

const styles = (theme: ReturnType<typeof useUnistyles>['theme']) =>
  StyleSheet.create({
    bubbleContainer: {
      flexDirection: 'row',
      marginVertical: theme.s(4),
    },
    userAlign: {
      justifyContent: 'flex-end',
    },
    aiAlign: {
      justifyContent: 'flex-start',
    },
    bubble: {
      paddingVertical: theme.s(10),
      paddingHorizontal: theme.s(20),
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      maxWidth: '95%',
      flexShrink: 1,
    },
    user: {
      backgroundColor: theme.colors.primary,
    },
    ai: {
      backgroundColor: theme.colors.background,
    },
  });
