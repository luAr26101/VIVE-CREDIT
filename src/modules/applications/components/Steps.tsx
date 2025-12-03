import { CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { StepFormData } from "../types";
import FormField from "./FormField";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface StepProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

function PersonalDataStep({ register, errors, setValue }: StepProps) {
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>Personal Information</CardTitle>
      <div className='grid grid-cols-2 gap-4'>
        <FormField
          id='firstName'
          label='First Name'
          register={register}
          errors={errors}
        />
        <FormField
          id='lastName'
          label='Last Name'
          register={register}
          errors={errors}
        />
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select>
            
          </Select>
        </div>
      </div>
    </div>
  );
}

export { PersonalDataStep };
