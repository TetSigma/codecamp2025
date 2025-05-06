import React from "react";
import { UIScreen } from "../atoms/UIScreen";
import { UIText } from "../atoms/UIText";
import { UIButton } from "../molecules/UIButton";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const WelcomePage = () => {
  const handleLoginPress = () => {
  };

  const handleRegisterPress = () => {
  };

  return (
    <UIScreen style={styles.container}>
      <UIText variant="heading" style={styles.heading}>
        Welcome!
      </UIText>

      <UIText variant="body" style={styles.description}>
        To continue, please log in or register to create a new account.
      </UIText>

      <View style={styles.buttonsContainer}>
        <UIButton title="Login" onPress={handleLoginPress} style={styles.button} />
        <UIButton title="Register" onPress={handleRegisterPress} style={styles.button} />
      </View>
    </UIScreen>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.s(16),
  },
  heading: {
    marginBottom: theme.s(20),
  },
  description: {
    textAlign: "center",
    marginBottom: theme.s(30),
    color: theme.colors.mutedText,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "column",
    gap: theme.s(12), 
  },
  button: {
    width: "100%",
  },
}));

export default WelcomePage;
