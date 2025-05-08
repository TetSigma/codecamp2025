import React from 'react';
import { Image, View, ImageSourcePropType, ViewStyle, ImageStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
interface UIImageProps {
  source: ImageSourcePropType; 
  style?: ViewStyle;
  imageStyle?: ImageStyle; 
}

const UIImage = ({ source, style, imageStyle }: UIImageProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={[styles.image, imageStyle]} />
    </View>
  );
};

const styles = StyleSheet.create((theme)=>({
  container: {
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  image: {
    width: theme.s(400),
    height: theme.s(400),
    resizeMode: 'contain', 
  },
}));

export default UIImage;
