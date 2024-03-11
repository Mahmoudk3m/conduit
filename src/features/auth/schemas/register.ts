import * as yup from "yup";

const registerSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
});

export default registerSchema;
