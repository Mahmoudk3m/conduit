import useUserStore from "@/stores/userStore";
import { usePostComment } from "../api/postComment";
import { useForm } from "react-hook-form";
import commentSchema from "../schemas/comment";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CommentForm({ slug }: { slug: string }) {
  const { user } = useUserStore();
  const { register, handleSubmit, reset } = useForm({ resolver: yupResolver(commentSchema) });

  const { mutate } = usePostComment();

  const onSubmit = (data: { body: string }) => {
    mutate(
      { slug, body: data.body },
      {
        onSuccess: () => {
          reset();
        }
      }
    );
  };

  return (
    <form className="card comment-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="card-block">
        <textarea className="form-control" placeholder="Write a comment..." rows={3} {...register("body")}></textarea>
      </div>
      <div className="card-footer">
        <img src={user?.image} className="comment-author-img" />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  );
}
