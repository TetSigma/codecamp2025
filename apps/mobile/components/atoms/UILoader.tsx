import React from "react";
import { ActivityIndicator, View} from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const UILoader: React.FC = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
    </View>
  );
};


const  styles = StyleSheet.create(() => ({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 20,
  },
}));
