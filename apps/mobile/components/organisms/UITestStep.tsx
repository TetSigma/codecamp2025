import React from "react";
import { View, StyleSheet } from "react-native";
import { UITestOption } from "../molecules/UITestOption";

type TestStepProps = {
  question: string;
  options: string[];
  onOptionSelect: (option: string) => void;
  selectedOption: string | null;
  correctAnswer: string;
};

export const UITestStep: React.FC<TestStepProps> = ({
  question,
  options,
  onOptionSelect,
  selectedOption,
  correctAnswer,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        let highlight: "correct" | "incorrect" | null = null;
        if (selectedOption === option) {
          highlight = selectedOption === correctAnswer ? "correct" : "incorrect";
        }

        return (
          <UITestOption
            key={index}
            title={option}
            onPress={() => selectedOption ? null : onOptionSelect(option)}
            highlight={highlight}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});