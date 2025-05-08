import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Text, StyleSheet } from 'react-native';

export function UILoadingMessage() {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.Text style={[styles.loadingText, animatedStyle]}>
      Cramly is thinking...
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    padding: 10,
  },
});
