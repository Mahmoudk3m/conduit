import * as yup from "yup";

export const settingsSchema = yup.object().shape({
  profilePicture: yup.string().url().optional(),
  username: yup.string().optional(),
  bio: yup.string().optional(),
  email: yup.string().email().optional(),
  password: yup.string().optional()
});
