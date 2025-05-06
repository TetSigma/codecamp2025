import React, { useCallback } from "react";
import { Pressable, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { UIText } from "../atoms"; 
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import Animated, { withTiming, withSpring, useSharedValue } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type UIButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
};

export const UIButton: React.FC<UIButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
}) => {
  const keyboard = useAnimatedKeyboard();
  const isKeyboardClosed = useSharedValue(true);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const pressableStyle = useAnimatedStyle(() => {
    isKeyboardClosed.value = keyboard.height.value === 0;

    return {
      borderRadius: withTiming(keyboard.height.value > 0 ? 0 : 50, {
        duration: 300,
      }),
    };
  });

  const animatedPressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95);
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1);
  }, [scale]);

  return (
    <AnimatedPressable
      style={[styles.base, style, pressableStyle, animatedPressStyle]}
      onPress={onPress}
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
    >
      <UIText style={styles.text}>{title}</UIText>    
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    backgroundColor: theme.colors.primary,  
    paddingVertical: theme.s(16),
    paddingHorizontal: theme.s(16),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: theme.s(16),  
    fontFamily: theme.fonts.regular,
    color: theme.colors.typographySecondary
  }
}));
export default UIButton;
