import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { UIInput } from "../molecules/UIInput";
import { UICardList } from "./UICardList";
import z from "zod";
import { ImageSourcePropType } from "react-native";
import { View } from "react-native";
import { UIKeyboardButton } from "../molecules";
import { UIKeyboardWrapper } from "../molecules";

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

type UIFormStepProps = {
  inputs: InputConfig[];
  handleButtonPress: () => void;
  control: any;
  setValue: any;
  watch: any;
  errors: any;
  submitted: boolean;
};

export const UIFormStep = ({
  inputs,
  handleButtonPress,
  control,
  setValue,
  watch,
  errors,
  submitted,
}: UIFormStepProps) => {
  const { shouldDisplayCardList, cardInput } = useMemo(() => {
    let displayCardList = false;
    let cardInput = undefined;

    for (const input of inputs) {
      if (input.cardList) {
        displayCardList = true;
        cardInput = input;
        break; 
      }
    }

    return { shouldDisplayCardList: displayCardList, cardInput };
  }, [inputs]);

  return (
    <UIKeyboardWrapper
      contentContainerStyle={{ flex: 1, paddingHorizontal: 16 }}
      button={<UIKeyboardButton title="Next" onPress={handleButtonPress} />}
    >
      {shouldDisplayCardList && cardInput ? (
        <UICardList
          cards={(cardInput.cardItems || []).map((card) => ({
            ...card,
            onPress: () => {
            },
          }))}
          selectedCards={watch(cardInput.name) || []} 
          onSelect={(selected) => {
            setValue(cardInput.name, selected);
          }}
        />
      ) : (
        inputs.map((input) => (
          <View key={input.name} style={{ marginBottom: 16 }}>
            <Controller
              control={control}
              name={input.name}
              render={({ field: { onChange, value } }) => (
                <UIInput
                  label={input.label}
                  value={value}
                  onChangeText={onChange}
                  error={submitted ? errors[input.name]?.message : undefined}
                  secureTextEntry={input.type === "password"}
                />
              )}
            />
          </View>
        ))
      )}
    </UIKeyboardWrapper>
  );
};

