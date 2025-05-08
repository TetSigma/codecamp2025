import React from "react";
import { Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

type TestOptionButtonProps = {
  title: string;
  onPress: () => void;
  highlight?: "correct" | "incorrect" | null;
};

export const UITestOption: React.FC<TestOptionButtonProps> = ({
  title,
  onPress,
  highlight = null,
}) => {
  const bgColor = useSharedValue("white");

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });

  React.useEffect(() => {
    if (highlight === "correct") {
      bgColor.value = withTiming("green", { duration: 300 });
    } else if (highlight === "incorrect") {
      bgColor.value = withTiming("red", { duration: 300 });
    } else {
      bgColor.value = withTiming("white", { duration: 300 });
    }
  }, [highlight]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,  // Padding inside the button
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    minWidth: "90%",
    maxWidth:"90%",  // Ensures button takes full width of its container
    height: 50,  // Set a fixed height to make all buttons the same size
  },
  text: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",  // Ensures text is centered within the button
  },
});
