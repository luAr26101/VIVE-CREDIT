import { z } from "zod";

export const personalDataSchema = z.object({
  firstName: z.string().min(2, "First name must have at least 2 characters"),
  lastName: z.string().min(2, "Last name must have at least 2 characters"),
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
  phone: z.string().min(10, "Phone number is too short"),
});
