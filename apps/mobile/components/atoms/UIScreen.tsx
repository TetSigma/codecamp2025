import React from "react";
import { SafeAreaView, ScrollView, ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles"
import { View } from "react-native";

type UIScreenProps = ViewProps & {
  scrollable?: boolean;
  children: React.ReactNode;
};

export const UIScreen: React.FC<UIScreenProps> = ({
  scrollable = false,
  children,
  style,
  ...rest
}) => {
  const Wrapper = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={styles.container}>
      <Wrapper
        contentContainerStyle={scrollable ? { paddingBottom: 40 } : undefined}
        style={[{ flex: 1 }, style]}
        {...rest}
      >
        {children}
      </Wrapper>
    </SafeAreaView>
  );
};

const styles  = StyleSheet.create(( theme ) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: 16,
      paddingTop: 16
    },
}));
