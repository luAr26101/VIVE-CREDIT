import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { AllFormFields, StepFormData } from "../types";

function FormField({
  id,
  label,
  register,
  errors,
  type,
  maxLength,
}: {
  id: keyof AllFormFields;
  label: string;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className='step-y-2'>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />
      {errors[id] && (
        <p className='text-destructive text-sm'>{errors[id]?.message}</p>
      )}
    </div>
  );
}

export default FormField;
