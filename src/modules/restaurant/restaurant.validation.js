import { z } from "zod";

const restaurantNameSchema = z
  .string({ requiredError: "Restaurant name is required." })
  .trim()
  .min(2, "Restaurant name must be at least 2 characters.")
  .max(100, "Restaurant name must not exceed 100 characters.");

const restaurantDescriptionSchema = z
  .string()
  .trim()
  .max(500, "Description must not exceed 500 characters.")
  .optional();

const restaurantAddressSchema = z
  .string({ requiredError: "Address is required." })
  .trim()
  .min(5, "Address must be at least 5 characters.")
  .max(200, "Address must not exceed 200 characters.");

const phoneSchema = z
  .string({ requiredError: "Phone number is required." })
  .trim()
  .regex(/^[6-9]\d{9}$/, "Please provide a valid 10-digit phone number.");

export const addRestaurantSchema = z.object({
  name: restaurantNameSchema,
  description: restaurantDescriptionSchema,
  address: restaurantAddressSchema,
  phoneNumber: phoneSchema,
});

export const updateRestaurantSchema = z
  .object({
    name: restaurantNameSchema.optional(),
    description: restaurantDescriptionSchema,
    address: restaurantAddressSchema.optional(),
    phoneNumber: phoneSchema.optional(),
    isActive: z
      .boolean({ requiredError: "Active status must be a boolean." })
      .optional(),
  })
  .refine(
    (data) =>
      Object.entries(data).some(
        ([, val]) => val !== undefined && val !== null
      ),
    {
      message:
        "Provide at least one field to update: name, description, address, phoneNumber, isActive.",
    }
  );
