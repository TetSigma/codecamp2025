import React, { useState } from "react";
import { UIMultiStepForm } from "@/components";
import z from "zod";
import useAuth from "../api/hooks/useAuth";

const inputs = [
  {
    step: "Welcome back!",
    name: "email",
    label: "Your email",
    type: "text",
    validation: z
      .string()
      .email("Please enter a valid email address")
      .max(100, "Email must be under 100 characters")
  },
  {
    step: "Welcome back!",
    name: "password",
    label: "Your password",
    type: "password",
    validation: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  },
];

export default function Login() {
  const { loginUser } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (formData: Record<string, any>) => {
    setFormError(null);
  
    console.log("Form data received:", formData);
  
    if (!formData.email || !formData.password) {
      setFormError("Both email and password are required.");
      return;
    }
  
    try {
      await loginUser(formData.email, formData.password);
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <UIMultiStepForm
      inputs={inputs}
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}
