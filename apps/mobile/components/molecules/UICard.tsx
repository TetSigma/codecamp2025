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

  const CardDescription = description ? (
    <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
      {description}
    </Text>
  ) : null;

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {CardImage}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          {CardDescription}
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 5,
    minHeight: 180,
    width: 180,
    backgroundColor: "white",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 150, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  description: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    marginTop: 2,
  },
}));

export default UICard;
