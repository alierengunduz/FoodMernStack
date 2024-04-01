import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name is too short")
    .max(20, "Name is too long"),
  phone: yup
    .string()
    .required("Phone is required")
    .min(10, "Phone is too short")
    .max(10, "Phone is too long"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .min(5, "Email is too short")
    .max(50, "Email is too long"),
  person: yup
    .number()
    .required("Person is required")
    .min(1, "Person is too short")
    .max(10, "Person is too long"),
  date: yup
    .date()
    .required("Date is required")
});
