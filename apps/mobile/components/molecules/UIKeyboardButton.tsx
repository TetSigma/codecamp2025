import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { UIText } from "../atoms"; // Assuming this is your text component
import { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useSharedValue, withTiming} from "react-native-reanimated";
// Create an animated version of the Pressable component
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type UIKeyboardButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  style?: ViewStyle;
};

export const UIKeyboardButton: React.FC<UIKeyboardButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
}) => {
  const keyboard = useAnimatedKeyboard(); 
  const isKeyboardClosed = useSharedValue(true);
 
  const pressableStyle = useAnimatedStyle(() => {
    isKeyboardClosed.value = keyboard.height.value === 0;

    return {
      borderRadius: withTiming(keyboard.height.value > 0 ? 0 : 16, {
        duration: 300,
      }),
    };
  });

 
  return (
    <AnimatedPressable style={[styles.base, style, pressableStyle]} onPress={onPress}>
      <UIText style={{ color: "white" }}>{title}</UIText>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "black",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UIKeyboardButton;
