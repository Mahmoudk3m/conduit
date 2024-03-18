import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editArticleSchema } from "../schemas/editArticle";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateArticle } from "../api/updateArticle";
import { useGetArticle } from "@/features/article";

export default function ArticleForm() {
  const { slug } = useParams();
  const [tagList, setTagList] = useState<string[]>([]);
  const [currentError, setCurrentError] = useState<string | null>("");
  const [tagInput, setTagInput] = useState<string>("");

  const { data } = useGetArticle(slug);
  const { mutate } = useUpdateArticle();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ resolver: yupResolver(editArticleSchema) });

  const addTag = () => {
    if (tagInput.trim() !== "" && !tagList.includes(tagInput.trim())) {
      setTagList([...tagList, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag();
    }
  };

  const onSubmit = (data: { title: string; description: string; body: string }) => {
    const finalData = { ...data, tagList };
    if (slug) {
      mutate({ slug, req: "put", article: finalData });
    } else {
      mutate({ req: "post", article: finalData });
    }
  };

  useEffect(() => {
    setCurrentError(errors.title?.message || errors.description?.message || errors.body?.message || null);
  }, [errors]);

  useEffect(() => {
    if (data) {
      setValue("title", data.article.title);
      setValue("description", data.article.description);
      setValue("body", data.article.body);
      setTagList(data.article.tagList || []);
    }
  }, [data, setValue]);

  return (
    <>
      {currentError && (
        <ul className="error-messages">
          <li>{currentError}</li>
        </ul>
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              {...register("title")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              {...register("description")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              {...register("body")}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
            />
            <div className="tag-list">
              {tagList.map((tag, index) => (
                <span key={index} className="tag-default tag-pill">
                  <i className="ion-close-round" onClick={() => setTagList(tagList.filter((_, i) => i !== index))}></i>
                  {tag}
                </span>
              ))}
            </div>
          </fieldset>
          <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
            Publish Article
          </button>
        </fieldset>
      </form>
    </>
  );
}
