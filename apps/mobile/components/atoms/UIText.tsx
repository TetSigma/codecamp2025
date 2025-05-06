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

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
  },
  caption: {
    fontSize: 12,
    color: "inherit", 
  },
});
