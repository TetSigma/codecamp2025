import React from "react";
import { UIScreen } from "../components/atoms/UIScreen";
import { UIText } from "../components/atoms/UIText";
import { UIButton } from "../components/molecules/UIButton";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useRouter } from 'expo-router';

const WelcomePage = () => {
  const router = useRouter();

  const handleLoginPress = () => {
    router.push('/dashboard/chat');
  };

  const handleRegisterPress = () => {
    router.push('/dashboard/chat');
  };

  return (
    <UIScreen style={styles.container}>
      <View style={styles.labelContainer}>
        <UIText variant="heading" style={styles.heading}>
          Welcome!
        </UIText>

        <UIText variant="body" style={styles.description}>
          To continue, please log in or register to create a new account.
        </UIText>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.s(16),
  },
  labelContainer:{
    justifyContent:'center',
    textAlign: 'center',
    alignItems: 'center'
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
    marginBottom: theme.s(20)
  },
  button: {
    width: "100%",
  },
}));

export default WelcomePage;
