import { Link } from "react-router-dom";
import { useFavouriteArticle } from "../api/favouriteArticle";
import { useUnfavouriteArticle } from "../api/unfavouriteArticle";

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

  const { mutate: favouriteArticle, isLoading: isFavouriteLoading } = useFavouriteArticle(slug);
  const { mutate: unfavouriteArticle, isLoading: isUnfavouriteLoading } = useUnfavouriteArticle(slug);

  const handleFavourite = () => {
    if (favorited) {
      unfavouriteArticle();
      return;
    }
    favouriteArticle();
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
            isFavouriteLoading || isUnfavouriteLoading ? "disabled" : ""
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
