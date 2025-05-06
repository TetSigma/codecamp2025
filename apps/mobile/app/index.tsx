import React from "react";
import { UIMultiStepForm } from "@/components";
import z from "zod"

const inputs = [
  {
    step: "Enter your name",
    name: "name",
    label: "Enter your Name",
    type: "text",
  },
  {
    step: "Choose your sport",
    name: "Choose a Card",
    label: "Enter your Name",
    cardList: true,
    type: "text",
    cardItems: [
      {
        title: "Running",
        image: require('../assets/images/icons/run.png'),
        onPress: () => console.log("Card 1 selected"),
      },
      {
        title: "Swimming",
        image: require('../assets/images/icons/swim.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      {
        title: "Weightlifting",
        image: require('../assets/images/icons/weight.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      {
        title: "Cycling",
        image: require('../assets/images/icons/cycling.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      
    ],
    validation: z.array(z.string()).min(1, "Please select at least one option")
  },
  {
    step: "Enter your password",
    name: "password",
    label: "Enter your Password",
    type: "password",
  },
];



export default function Home() {
  return (
    <UIMultiStepForm inputs={inputs} onSubmit={(data) => console.log(data)} />

  );
}
