import { object, string, ref } from "yup";

const password_match: RegExp = /^[a-zA-Z0-9_.-]*$/;

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password too short, should be minimum 6 characters")
      .matches(
        password_match,
        "Password can only contain a-z A-Z 0-9 and _ . -"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Passwords must match"
    ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password too short, should be minimum 6 characters")
      .matches(
        password_match,
        "Password can only contain a-z A-Z 0-9 and _ . -"
      ),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
