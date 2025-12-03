import { BadgeEuro, Calculator, Files, Map, User } from "lucide-react";
import { useState } from "react";
import {
  addressDataSchema,
  documentsSchema,
  financialDataSchema,
  loanDetailsSchema,
  personalDataSchema,
  Step,
  StepFormData,
} from "../types";

const stepSchemas = [
  personalDataSchema,
  addressDataSchema,
  financialDataSchema,
  loanDetailsSchema,
  documentsSchema,
];

export const steps: Step[] = [
  { id: "personal", name: "Personal Details", icon: User },
  { id: "address", name: "Address", icon: Map },
  { id: "financial", name: "Financial", icon: BadgeEuro },
  { id: "loan", name: "Loan Details", icon: Calculator },
  { id: "documents", name: "Documents", icon: Files },
];

function useMultistepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({}); // Partial makes all fields optional
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  // Return the current step schema
  const getCurrentStepSchema = () => stepSchemas[currentStep];

  // Go to next step
  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  // Merge and update form data
  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, newData }));
  };

  // Handle final submission
  const submitForm = (data: StepFormData) => {
    console.log("✅ Final submitted data:", data);
    setIsSubmitted(true);
  };

  // Reset form entirely
  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsSubmitted(false);
  };
  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetForm,
    getCurrentStepSchema,
  };
}

export default useMultistepForm;
