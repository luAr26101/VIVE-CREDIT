import React from "react";
import { z } from "zod";

export const personalDataSchema = z.object({
  firstName: z.string().min(2, "First name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name must have at least 2 characters"),
  gender: z.enum(["M", "F"], "Please select the gender"),
  cnp: z.string().length(13, "CNP must have exactly 13 characters."),
  dateOfBirth: z
    .date()
    .refine(
      (date) => date <= new Date(),
      "Date of birth cannot be in the future"
    )
    .refine((date) => {
      const today = new Date();
      const ageDiff = today.getFullYear() - date.getFullYear();

      // calculate exact age
      const hasHadBirthdayThisYear =
        today.getMonth() > date.getMonth() ||
        (today.getMonth() === date.getMonth() &&
          today.getDate() >= date.getDate());
      const age = hasHadBirthdayThisYear ? ageDiff : ageDiff - 1;

      return age >= 18;
    }, "You must be at least 18 years old"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number is invalid"),
  maritalStatus: z
    .enum(
      ["Not Married", "Married", "Divorced", "Widowed"],
      "Please select the marital status"
    )
    .optional(),
  numberOfDependents: z.number().min(0).optional(),
});

export type PersonalData = z.infer<typeof personalDataSchema>;

export const addressDataSchema = z.object({
  country: z.string().default("Romania"),
  county: z.string().min(1, "County is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().length(6, "Postal code must have 6 characters"),
  street: z.string().min(1, "Street is required"),
  streetNumber: z.string().min(1, "Number is required"),
  building: z.string().optional(),
  entrance: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export type AddressData = z.infer<typeof addressDataSchema>;

export const financialDataSchema = z.object({
  employmentType: z.enum(
    ["Angajat", "PFA", "SRL_Administrator", "Retired", "Unemployment"],
    "Please select employment status"
  ),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  employmentStartDate: z.string().optional(),
  monthlyNetIncome: z
    .number()
    .min(1, "Monthly net income must be greater than 0"),
  otherIncome: z.number().min(0).optional(),
  hasExistingLoans: z.boolean(),
  monthlyDebtPayments: z.number().min(0).optional(),
  numberOfActiveLoans: z.number().min(0).optional(),
  iban: z.string().optional(),
  bankName: z.string().optional(),
});

export type FinancialData = z.infer<typeof financialDataSchema>;

export const loanDetailsSchema = z.object({
  loanAmount: z.number().min(1000, "Must be at least 1000"),
  loanPurpose: z.enum(
    [
      "Consumption",
      "Personal Needs",
      "Auto",
      "Renovation",
      "Holiday",
      "Others",
    ],
    "Loan purpose is required"
  ),
  loanTermMonths: z
    .number()
    .min(6, "Minimum duration is 6 months")
    .max(120, "Maximum duration is 120 months"),
  currency: z.enum(["RON"]),
  interestType: z.enum(["Fixed", "Variable"]),
  desiredPaymentDay: z.number().min(1).max(28).optional(),
  collateralType: z.enum(["None", "Auto", "Real Estate"]).optional(),
  insuranceAccepted: z.boolean().optional(),
});

export type LoanDetails = z.infer<typeof loanDetailsSchema>;

export const documentsSchema = z.object({
  idFront: z.instanceof(File, { message: "Please load ID front" }),
  idBack: z.instanceof(File, { message: "Please load ID back" }),
  incomeProof: z.instanceof(File, { message: "Please load income proof" }),
  additionalDocuments: z.array(z.instanceof(File)).optional(),
});

export type DocumentsData = z.infer<typeof documentsSchema>;

export type AllFormFields = PersonalData &
  AddressData &
  FinancialData &
  LoanDetails &
  DocumentsData;

export type StepFormData =
  | PersonalData
  | AddressData
  | FinancialData
  | LoanDetails
  | DocumentsData;

export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
