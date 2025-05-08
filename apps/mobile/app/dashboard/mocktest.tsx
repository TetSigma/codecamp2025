import { UIMultiStepTestForm } from "../../components/organisms/UIMultiStepTestForm"
import { Text } from "react-native";
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    correctAnswer: "Paris",
    name: "capital",
    isLast: false,  // This is not the last step
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    name: "math",
    isLast: true,  // This is the last step
  },
];


export default function MockTest() {
  return (
    <UIMultiStepTestForm
    questions={questions}
    onSubmit={(data) => console.log("Test results:", data)}
  />
  );
}
