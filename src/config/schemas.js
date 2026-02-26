import { z } from "zod";

const nameSchema = z
  .string({ requiredError: "Name is required." })
  .trim()
  .min(2, "Name must be at least 2 characters.");

const emailSchema = z
  .string({ requiredError: "Email is required." })
  .trim()
  .email("Please provide a valid email address.");

const passwordSchema = z
  .string({ requiredError: "Password is required." })
  .min(8, "Password must be at least 8 characters.");

const phoneSchema = z
  .string({ requiredError: "Phone number is required." })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please provide a valid 10-digit phone number.");

const addressSchema = z
  .string({ requiredError: "Address is required." })
  .trim()
  .min(5, "Address must be at least 5 characters.");

const roleSchema = z
  .enum(["customer", "admin"], {
    errorMap: () => ({ message: "Role must be either customer or admin." }),
  })
  .optional()
  .default("customer");

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phoneNumber: phoneSchema,
  address: addressSchema,
  role: roleSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = z
  .object({
    name: nameSchema.optional(),
    phoneNumber: phoneSchema.optional(),
    address: addressSchema.optional(),
  })
  .refine((data) => Object.values(data).some((val) => val !== undefined), {
    message:
      "Provide at least one field to update: name, phoneNumber, address.",
  });
