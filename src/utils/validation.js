import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required(),
  password: yup
    .string()
    .min(7, "Min 7 characters")
    .required(),
});
export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(7, "Min 7 characters")
    .required("Password is required"),
});