import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email("Invalid email"),
  password: yup
    .string()
    .required()
    .min(6, "Password too short")
    .max(20, "Password too long"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required().email("Invalid email"),
  password: yup
    .string()
    .required()
    .min(6, "Password too short")
    .max(20, "Password too long"),
});
