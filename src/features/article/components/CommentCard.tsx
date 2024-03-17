import useUserStore from "@/stores/userStore";
import { Link } from "react-router-dom";
import { useDeleteComment } from "../api/deleteComment";

export default function CommentCard({ comment, slug }: { comment: Article.Comment; slug: string }) {
  const { user } = useUserStore();

  const { mutate } = useDeleteComment();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
  };

  const onDelete = () => {
    mutate({ slug: slug, id: comment.id });
  };

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link to={`/profile/${comment.author.username}`}>
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link to={`/profile/${comment.author.username}`}>{comment.author.username}</Link>
        <span className="date-posted">{formatDate(comment.updatedAt)}</span>
        {user?.username === comment.author.username && (
          <span className="mod-options" onClick={onDelete}>
            <i className="ion-trash-a"></i>
          </span>
        )}
      </div>
    </div>
  );
}
