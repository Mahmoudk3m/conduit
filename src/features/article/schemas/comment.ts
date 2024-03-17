import * as yup from "yup";

const commentSchema = yup.object().shape({
  body: yup.string().required()
});

export default commentSchema;
