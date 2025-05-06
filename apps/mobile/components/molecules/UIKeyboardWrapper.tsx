import React, { useState, useEffect } from "react";
import { View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView, KeyboardStickyView } from "react-native-keyboard-controller";
import { StyleSheet } from "react-native-unistyles";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useAnimatedKeyboard } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type UIKeyboardWrapperProps = {
  children: React.ReactNode;
  button: React.ReactNode;
  contentContainerStyle?: ViewStyle;
};

export const UIKeyboardWrapper: React.FC<UIKeyboardWrapperProps> = ({
  children,
  button,
  contentContainerStyle,
}) => {
  const keyboard = useAnimatedKeyboard();
  const isKeyboardClosed = useSharedValue(true);
  const { bottom } = useSafeAreaInsets();

  const buttonStyle = useAnimatedStyle(() => {
    isKeyboardClosed.value = keyboard.height.value === 0;

    return {
      paddingBottom: withTiming(keyboard.height.value > 0 ? 0 : bottom, {
        duration: 400,
      }),
      paddingHorizontal: withTiming(keyboard.height.value > 0 ? 0 : 16, {
        duration: 400,
      }),
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bottomOffset={74}
        style={contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </KeyboardAwareScrollView>
      <KeyboardStickyView style={styles.stickyView} offset={{ opened: 16, closed: 0 }}>
        <Animated.View style={buttonStyle}>
          {button}
        </Animated.View>
      </KeyboardStickyView>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyView: {
    padding: 0,
  },
});
