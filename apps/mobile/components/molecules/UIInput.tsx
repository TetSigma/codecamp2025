import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextInput, View, Pressable } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { UIText } from "../atoms/UIText";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type UIInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
};

export const UIInput: React.FC<UIInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  secureTextEntry = false,
}) => {
  const [focused, setFocused] = useState(false);
  const { theme } = useUnistyles()
  


  const inputRef = useRef<TextInput>(null);
  const labelOffset = useSharedValue(0);
  const labelFontSize = useSharedValue(16);
  const errorOpacity = useSharedValue(0);
  const errorTranslateY = useSharedValue(10);
  const borderWidth = useSharedValue(1);

  useEffect(() => {
    if (focused || value) {
      labelOffset.value = withTiming(-10, { duration: 300 });
      labelFontSize.value = withTiming(13, { duration: 300 });
      borderWidth.value = withTiming(2, { duration: 300 });
    } else {
      labelOffset.value = withTiming(20, { duration: 300 });
      labelFontSize.value = withTiming(16, { duration: 300 });
      borderWidth.value = withTiming(1, { duration: 300 });
    }

    if (error) {
      errorOpacity.value = withTiming(1, { duration: 300 });
      errorTranslateY.value = withTiming(0, { duration: 300 });
    } else {
      errorOpacity.value = withTiming(0, { duration: 300 });
      errorTranslateY.value = withTiming(10, { duration: 300 });
    }
  }, [focused, value, error]);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: labelOffset.value }],
    fontSize: labelFontSize.value,
    color: labelOffset.value === 0 ? theme.colors.typography : theme.colors.typography,
  }));

  const errorStyle = useAnimatedStyle(() => ({
    opacity: errorOpacity.value,
    transform: [{ translateY: errorTranslateY.value }],
  }));

  const inputStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: error ? 'red' : 'gray',
  }));

  const handleLabelPress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.inputContainer}>
      <Pressable onPress={handleLabelPress}>
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      </Pressable>

      <Animated.View style={[styles.inputWrapper, inputStyle]}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </Animated.View>

      {error && (
        <Animated.View style={errorStyle}>
          <UIText variant="body" style={styles.errorText}>
            {error}
          </UIText>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  inputContainer: {
    marginTop: theme.s(5),
    marginBottom: theme.s(5),
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: theme.s(2),
    left: theme.s(16),
    zIndex: 1,
    color: "black"
  },
  inputWrapper: {
    height: theme.s(45),
    borderRadius: theme.s(16),
    marginTop: theme.s(10),
  },
  input: {
    height: '100%',
    borderRadius: theme.s(14),
    paddingHorizontal: theme.s(16),
    fontSize: theme.s(10),
  },
  errorText: {
    marginTop: theme.s(5),
    left: theme.s(10),
    fontSize: theme.s(14),
    color: 'red',
  },
}));

export default UIInput;
