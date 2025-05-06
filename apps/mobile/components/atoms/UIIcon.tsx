import React from "react";
import { Ionicons } from "@expo/vector-icons";

type UIIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
};

export const UIIcon: React.FC<UIIconProps> = ({ name, size = 24, color = "#000" }) => {
  return <Ionicons name={name} size={size} color={color} />;
};
