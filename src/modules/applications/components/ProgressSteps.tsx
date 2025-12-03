import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Step } from "../types";

function ProgressSteps({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: Step[];
}) {
  return (
    <div className='flex items-center justify-between'>
      {steps.map((step, index) => {
        const Icon = step.icon; // Extract icon component
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={step.id} className='flex flex-1 items-center'>
            <div className='flex flex-col items-center'>
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className='h-5 w-5' />
                ) : (
                  <Icon className='h-5 w-5' />
                )}
              </div>
              <span className='text-xs mt-2 font-medium'>{step.name}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-colors",
                  isCompleted ? "bg-primary" : "bg-gray-200"
                )}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;
