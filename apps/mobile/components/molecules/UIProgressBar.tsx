import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

type UIProgressBarProps = {
  progress: Animated.SharedValue<number>;
  isLastStep: boolean;
};

export const UIProgressBar = ({ progress, isLastStep }: UIProgressBarProps) => {
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    borderTopRightRadius: isLastStep ? 0 : 9999,
    borderBottomRightRadius: isLastStep ? 0 : 9999,
  }));

  return (
    <View style={styles.progressBackground}>
      <Animated.View style={[styles.progressBar, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "black",
  },
});
