import * as yup from "yup";

export const editArticleSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  body: yup.string().required()
});
