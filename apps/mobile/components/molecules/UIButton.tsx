import React from "react";
import { Pressable, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { UIText } from "../atoms";

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
  return (
    <Pressable
      style={[
        styles.base,
        styles[variant],
        style,
      ]}
      onPress={onPress}
    >
      <UIText
        style={[
          styles.text,
          variant === "ghost" && styles.ghostText,
        ]}
      >
        {title}
      </UIText>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  ghostText: {
    color: theme.colors.mutedText,
  },
}));
