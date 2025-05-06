import React from "react";
import { Text, TextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles"; 

type UITextProps = TextProps & {
  variant?: "heading" | "subheading" | "body" | "caption";
};

export const UIText: React.FC<UITextProps> = ({
  variant = "body",
  style,
  children,
  ...rest
}) => {

  return (
    <Text style={[styles[variant],style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create((theme)=>({
  heading: {
    fontSize: theme.s(24),
    fontWeight: "bold",
    color: theme.colors.typography
  },
  subheading: {
    fontSize: theme.s(18),
    fontWeight: "600",
  },
  body: {
    fontSize: theme.s(18),
  },
  caption: {
    fontSize: theme.s(18),
    color: "inherit", 
  },
}));
