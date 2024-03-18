import { Link, useNavigate } from "react-router-dom";
import { useFavouriteArticle } from "../api/favouriteArticle";
import useUserStore from "@/stores/userStore";

export default function Article({
  slug,
  title,
  description,
  tagList,
  createdAt,
  favoritesCount,
  author,
  favorited
}: Home.ArticleProps) {
  const linkToProfile = `/profile/${author.username}`;
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { mutate: favouriteArticle, isLoading } = useFavouriteArticle({
    slug,
    favourited: favorited
  });

  const handleFavourite = () => {
    if (!user) {
      navigate("/login");
    } else {
      favouriteArticle();
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={linkToProfile}>
          <img src={author.image} />
        </Link>
        <div className="info">
          <Link to={linkToProfile} className="author">
            {author.username}
          </Link>
          <span className="date">{createdAt.toString()}</span>
        </div>
        <button
          onClick={handleFavourite}
          className={`btn btn-sm pull-xs-right ${favorited ? "btn-primary" : "btn-outline-primary"} ${
            isLoading ? "disabled" : ""
          } `}
        >
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tagList.map((tag: string) => (
            <li key={tag} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
