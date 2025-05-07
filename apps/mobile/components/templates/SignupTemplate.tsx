import React from "react";
import { UIMultiStepForm } from "@/components";
import z from "zod"

const inputs = [
  {
    step: "Let's know each other!",
    name: "name",
    label: "Enter your Name",
    type: "text",
    validation: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be under 50 characters"),
  },
  {
    step: "Let's know each other!",
    name: "surname",
    label: "Enter your Surname",
    type: "text",
    validation: z
      .string()
      .min(2, "Surname must be at least 2 characters")
      .max(50, "Surname must be under 50 characters"),
  },
  {
    step: "What is your email?",
    name: "email",
    label: "Email",
    type: "email",
    validation: z
      .string()
      .email("Please enter a valid email address")
      .max(100, "Email must be under 100 characters"),
  },  
  {
    step: "What is your education?",
    name: "Choose Education",
    label: "Enter your Name",
    cardList: true,
    type: "text",
    cardItems: [
      {
        title: "Middle school",
        image: require('../assets/images/icons/run.png'),
        onPress: () => console.log("Card 1 selected"),
      },
      {
        title: "High school",
        image: require('../assets/images/icons/swim.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      {
        title: "College",
        image: require('../assets/images/icons/weight.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      {
        title: "Test prep",
        image: require('../assets/images/icons/cycling.png'),
        onPress: () => console.log("Card 2 selected"),
      },
      
    ],
    validation: z.array(z.string()).min(1, "Please select at least one option")
  },
  {
    step: "Enter your password",
    name: "password",
    label: "Password",
    type: "password",
    validation: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  },
  {
    step: "Enter your password",
    name: "Repeat your password",
    label: "Repeat password",
    type: "password",
  },
];



export default function SignupTemplate() {
  return (
    <UIMultiStepForm inputs={inputs} onSubmit={(data) => console.log(data)} />
  );
}