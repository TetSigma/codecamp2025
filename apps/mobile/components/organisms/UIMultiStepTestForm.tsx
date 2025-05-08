import React, { useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { UIProgressBar } from "../molecules/UIProgressBar";
import { UIStepLabel } from "../molecules/UIStepLabel";
import { UITestStep } from "./UITestStep";
import { UIButton } from "../molecules";
import { UIScreen } from "../atoms";
import { useRouter } from "expo-router";



type TestQuestionConfig = {
  question: string;
  options: string[];
  correctAnswer: string;
  name: string;
  isLast: boolean;
};

type MultiStepTestFormProps = {
  questions: TestQuestionConfig[];
  onSubmit: (data: Record<string, string>) => void;
};

type TestValues = Record<string, string>;

export const UIMultiStepTestForm = ({ questions, onSubmit }: MultiStepTestFormProps) => {
  const [formData, setFormData] = useState<TestValues>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigation = useRouter()
  const stepNames = useMemo(() => Array.from(new Set(questions.map(q => q.question))), [questions]);
  const totalSteps = stepNames.length;
  const [currentStep, setCurrentStep] = useState<string>(stepNames[0]);
  const [stepLabel, setStepLabel] = useState<string>(stepNames[0]);

  const inputMap = useMemo(() => {
    const map = new Map<string, TestQuestionConfig[]>();
    questions.forEach((question) => {
      if (!map.has(question.question)) map.set(question.question, []);
      map.get(question.question)?.push(question);
    });
    return map;
  }, [questions]);

  const currentQuestions = inputMap.get(currentStep) ?? [];

  const schemaMap = useMemo(() => {
    const map = new Map<string, z.ZodObject<any>>();

    inputMap.forEach((stepQuestions, step) => {
      const shape: Record<string, z.ZodTypeAny> = {};
      stepQuestions.forEach((question) => {
        shape[question.name] = z.string().min(1, "Please select an option");
      });

      map.set(step, z.object(shape));
    });

    return map;
  }, [inputMap]);

  const schema = schemaMap.get(currentStep) ?? z.object({});
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<TestValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
    mode: "onSubmit",
  });

  const progress = useSharedValue(0);
  const labelOpacity = useSharedValue(1);
  const labelTranslateY = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(stepNames.indexOf(currentStep) / (totalSteps - 1), { duration: 300 });
    labelOpacity.value = withTiming(0, { duration: 100 });
    labelTranslateY.value = withTiming(-10, { duration: 100 });

    setTimeout(() => {
      setStepLabel(currentStep);
      labelOpacity.value = withTiming(1, { duration: 400 });
      labelTranslateY.value = withTiming(0, { duration: 400 });
    }, 200);
  }, [currentStep, totalSteps]);

  const isLastStep = currentStep === stepNames[stepNames.length - 1];

  const onStepSubmit = (data: TestValues) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (isLastStep) {
      setShowResults(true);
    } else {
      const currentIndex = stepNames.indexOf(currentStep);
      setCurrentStep(stepNames[currentIndex + 1]);
    }
  };

  const handleButtonPress = () => {
    setSubmitted(true);
    handleSubmit(onStepSubmit)();
  };

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (option: string, question: TestQuestionConfig) => {
    setSelectedOption(option);
    setValue(question.name, option);

    const delay = 800;

    setTimeout(() => {
      handleSubmit(onStepSubmit)(); // Call form submission after delay
      setSelectedOption(null); // Reset for next step
    }, delay);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter(q => formData[q.name] === q.correctAnswer);
    const score = (correctAnswers.length / questions.length) * 100;
    return score;
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <UIScreen style={{justifyContent:"space-between"}}>
        <View>
            <Text style={styles.resultText}>Test Completed!</Text>
            <Text style={styles.resultText}>Your Score: {score}%</Text>
        </View>
        <View style={{marginBottom:20}}>
            <UIButton 
            title="Go back" 
            onPress={() => {
                setShowResults(false);
                setFormData({});
                setCurrentStep(stepNames[0]);
                navigation.navigate("dashboard/tests")
            }} 
            />
        </View>
      </UIScreen>
    );
  }

  return (
    <View style={styles.container}>
      <UIProgressBar progress={progress} isLastStep={isLastStep} />
      <UIStepLabel stepLabel={stepLabel} labelOpacity={labelOpacity} labelTranslateY={labelTranslateY} />
      {currentQuestions.map((question, index) => (
        <UITestStep
          key={index}
          question={question.question}
          options={question.options}
          correctAnswer={question.correctAnswer}
          selectedOption={selectedOption}
          onOptionSelect={(option) => handleAnswer(option, question)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor:'white'
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

