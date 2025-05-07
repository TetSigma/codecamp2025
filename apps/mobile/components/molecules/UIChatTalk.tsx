import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Animated, useWindowDimensions, StyleSheet } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  text: string;
  isUser?: boolean;
  isThinking?: boolean;
};

export default function UIChatTalk({ text, isUser = false, isThinking = false }: Props) {
  const { theme } = useUnistyles();
  const windowWidth = useWindowDimensions().width;
  const [currentText, setCurrentText] = useState<string>('');
  const [words] = useState<string[]>(text.split(' '));
  const [thinkingDots, setThinkingDots] = useState<string[]>(['']);
  const circleAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setThinkingDots((prev: string[]) => {
          const newDots = [...prev, '.'];
          if (newDots.length > 3) {
            return [''];
          }
          return newDots;
        });
      }, 500);

      // Start circle animation
      Animated.timing(circleAnim, {
        toValue: 250,
        duration: 1500,
        useNativeDriver: false,
      }).start();

      // Add pulsing animation
      const pulseAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(circleAnim, {
            toValue: 270,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(circleAnim, {
            toValue: 250,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      );
      pulseAnim.start();

      return () => {
        clearInterval(interval);
        pulseAnim.stop();
        // Reset circle animation
        Animated.timing(circleAnim, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
      };
    }

    if (text !== currentText) {
      setCurrentText('');
      let current = '';
      words.forEach((word: string, index: number) => {
        setTimeout(() => {
          current += word + ' ';
          setCurrentText(current.trim());
        }, 50 * (index + 1));
      });
    }
  }, [text, isThinking]);

  return (
    <View style={styles.container}>
      {isThinking && (
        <Animated.View
          style={[
            styles.circle,
            {
              width: circleAnim,
              height: circleAnim,
            },
          ]}
        />
      )}
      <View style={styles.avatarContainer}>
        <Ionicons
          name={isUser ? 'person-outline' : 'help-circle-outline'}
          size={40}
          color={isUser ? theme.colors.primary : theme.colors.secondary}
        />
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {isThinking ? thinkingDots.join('') : currentText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    maxWidth: '90%',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#67E855',
    opacity: 0.2,
    zIndex: 1,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 12,
  },
  messageContainer: {
    maxWidth: '90%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  thinkingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
