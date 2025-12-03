import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useMultistepForm from "../hooks/useMultistepForm";
import { StepFormData } from "../types";
import ProgressSteps from "./ProgressSteps";
import { PersonalDataStep } from "./Steps";

function ApplicationForm() {
  // Custom hook
  const {
    currentStep, // Which step we're on (0, 1, etc)
    formData, // Accumulated data from all steps
    isFirstStep, // Boolean - are we on step 0?
    isLastStep, // Boolean - are we on the final step?
    isSubmitted, // Boolean - has form been submitted?
    steps, // Array of step metadata (for progress indicator)
    goToNextStep, // Function to advance
    goToPreviousStep, // Function to go back
    updateFormData, // Function to save step data
    submitForm, // Function for final submission
    resetForm, // Function to start over
    getCurrentStepSchema, // Function returning current Zod schema
  } = useMultistepForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    // Manual validation check
    console.log(currentStep);
    const isValid = await trigger();

    if (!isValid) return;

    console.log(formData);

    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    // Merge current step data with all previous data
    if (isLastStep) {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.error("Submission failed:", error);
      }
    } else {
      goToNextStep();
    }
  };
  return (
    <div className='flex items-center justify-center '>
      <Card className='w-full max-w-7xl'>
        <CardHeader>
          <ProgressSteps currentStep={currentStep} steps={steps} />
        </CardHeader>
        <CardContent>
          {currentStep === 0 && (
            <PersonalDataStep register={register} errors={errors} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ApplicationForm;
