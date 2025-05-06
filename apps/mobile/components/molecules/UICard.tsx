import React, { useEffect, useRef } from "react";
import { View, Text, Image, Pressable, ViewStyle, ImageSourcePropType } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";

type UICardProps = {
  title: string;
  description?: string;
  image?: ImageSourcePropType;
  onPress?: () => void;
  isSelected?: boolean;  
};

export const UICard: React.FC<UICardProps> = React.memo(({ title, description, image, onPress, isSelected = false }) => {
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(2);
  const borderColor = useSharedValue("gray");

  const prevSelected = useRef(isSelected);

  useEffect(() => {
    if (isSelected !== prevSelected.current) {
      borderWidth.value = withSpring(isSelected ? 3 : 2, { damping: 8 });
      borderColor.value = withSpring(isSelected ? "black" : "gray", { damping: 8 });
      prevSelected.current = isSelected;
    }
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderWidth: borderWidth.value,
    borderColor: borderColor.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 8 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 8 });
  };

  const CardImage = image ? (
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} resizeMode="contain" />
    </View>
  ) : null;

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {CardImage}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.s(16),
    overflow: "hidden",
    marginVertical: theme.s(5),
    minHeight: theme.s(180),
    width:  theme.s(180),
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: theme.s(150), 
    borderTopLeftRadius: theme.s(16),
    borderTopRightRadius: theme.s(16),
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    paddingHorizontal: theme.s(8),
  },
  title: {
    fontSize: theme.s(20),
    fontWeight: "bold",
    textAlign: "center",
    color: theme.colors.background
  },
}));

export default UICard;
