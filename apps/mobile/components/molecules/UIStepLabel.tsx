import React from "react";
import Animated  from "react-native-reanimated";
import { UIText } from "../atoms/UIText";
import { useAnimatedStyle } from "react-native-reanimated";


type UIStepLabelProps = {
  stepLabel: string;
  labelOpacity: Animated.SharedValue<number>;
  labelTranslateY: Animated.SharedValue<number>;
};

export const UIStepLabel = ({ stepLabel, labelOpacity, labelTranslateY }: UIStepLabelProps) => {
  const labelStyle = useAnimatedStyle(() => ({
    opacity: labelOpacity.value,
    transform: [{ translateY: labelTranslateY.value }],
  }));

  return (
    <Animated.View style={labelStyle}>
      <UIText variant="heading" style={{ marginBottom: 20, fontSize: 30, marginLeft:16 }}>
        {stepLabel}
      </UIText>
    </Animated.View>
  );
};
