import { z } from "zod";

export const UserRegistrationformSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  middle_name: z.string().min(1, {
    message: "First name is required.",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  lga: z.string().min(1, {
    message: "LGA is required.",
  }),
  role: z.string(),
  isDoctor: z.boolean(),
  expectedDeliveryDate: z.date().or(z.string()),
});

export const userProfileSchema = z.object({
  email: z.string().email().optional(),
  first_name: z.string().optional(),
  middle_name: z
    .string()
    .min(1, {
      message: "First name is required.",
    })
    .optional(),
  last_name: z
    .string()
    .min(1, {
      message: "Last name is required.",
    })
    .optional(),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Please enter a valid phone number.",
    })
    .optional(),
  state: z
    .string()
    .min(1, {
      message: "State is required.",
    })
    .optional(),
  lga: z
    .string()
    .min(1, {
      message: "LGA is required.",
    })
    .optional(),
  role: z.string().optional(),
  isDoctor: z.boolean().optional(),
  expectedDeliveryDate: z.date().or(z.string()).optional(),
});

export const UserLoginformSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export const DoctorRegistrationformSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  middle_name: z
    .string()
    .min(1, {
      message: "First name is required.",
    })
    .optional(),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  lga: z.string().min(1, {
    message: "LGA is required.",
  }),
  role: z.string(),
  isDoctor: z.boolean(),
  school: z.string().min(1, {
    message: "School is required.",
  }),
  reg_number: z.string().min(1, {
    message: "Registration number is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
});
