import React, { useMemo, useState, useEffect } from "react";
import { View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { UIProgressBar } from "../molecules/UIProgressBar";
import { UIStepLabel } from "../molecules/UIStepLabel";
import { UIFormStep } from "./UIFormStep";
import { ImageSourcePropType } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type InputConfig = {
  step: string;
  name: string;
  label: string;
  type: string;
  validation?: z.ZodTypeAny;
  validateAgainst?: string[];
  cardList?: boolean;
  cardItems?: { title: string; image: ImageSourcePropType; onPress: () => void }[];
};
type MultiStepFormProps = {
  inputs: InputConfig[];
  onSubmit: (data: Record<string, string>) => void;
};
type FormValues = Record<string, string>;

export const UIMultiStepForm = ({ inputs, onSubmit }: MultiStepFormProps) => {
  const [formData, setFormData] = useState<FormValues>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const stepNames = useMemo(() => Array.from(new Set(inputs.map(i => i.step))), [inputs]);
  const totalSteps = stepNames.length;
  const [currentStep, setCurrentStep] = useState<string>(stepNames[0]);
  const [stepLabel, setStepLabel] = useState<string>(stepNames[0]);

  const inputMap = useMemo(() => {
    const map = new Map<string, InputConfig[]>();
    inputs.forEach((input) => {
      if (!map.has(input.step)) map.set(input.step, []);
      map.get(input.step)?.push(input);
    });
    return map;
  }, [inputs]);

  const currentInputs = inputMap.get(currentStep) ?? [];

  const schemaMap = useMemo(() => {
    const map = new Map<string, z.ZodObject<any>>();

    inputMap.forEach((stepInputs, step) => {
      const shape: Record<string, z.ZodTypeAny> = {};
      stepInputs.forEach((input) => {
        let validator = input.validation || z.string().min(1, `${input.label} is required`);
        shape[input.name] = validator;
      });

      if (stepInputs.some((input) => input.validateAgainst)) {
        map.set(
          step,
          // @ts-ignore
          z.object(shape).refine((data) =>
            stepInputs.every((input) =>
              input.validateAgainst?.every((field) => data[input.name] === data[field])
            ),
            {
              message: `${stepInputs[0].label} does not match`,
              path: [stepInputs[0].name],
            }
          )
        );
      } else {
        map.set(step, z.object(shape));
      }
    });

    return map;
  }, [inputMap]);

  const schema = schemaMap.get(currentStep) ?? z.object({});
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
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
    setSubmitted(false);

    setTimeout(() => {
      setStepLabel(currentStep);
      labelOpacity.value = withTiming(1, { duration: 400 });
      labelTranslateY.value = withTiming(0, { duration: 400 });
    }, 200);
  }, [currentStep, totalSteps]);

  const isLastStep = currentStep === stepNames[stepNames.length - 1];

  const onStepSubmit = (data: FormValues) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (isLastStep) {
      onSubmit(updatedData);
    } else {
      const currentIndex = stepNames.indexOf(currentStep);
      setCurrentStep(stepNames[currentIndex + 1]);
    }
  };

  const handleButtonPress = () => {
    setSubmitted(true);
    handleSubmit(onStepSubmit)();
  };

  return (
    <View style={styles.container}>
      <UIProgressBar progress={progress} isLastStep={isLastStep} />
      <UIStepLabel stepLabel={stepLabel} labelOpacity={labelOpacity} labelTranslateY={labelTranslateY} />
      <UIFormStep
        inputs={currentInputs}
        handleButtonPress={handleButtonPress}
        control={control}
        setValue={setValue}
        watch={watch}
        errors={errors}
        submitted={submitted}
      />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 16,
  },
}));
