import { Link } from "react-router-dom";
import ArticleProps from "../types";

export default function Article({
  previewerName,
  previewerImage,
  date,
  title,
  slug,
  description,
  tags,
  favoritesCount
}: ArticleProps) {
  const linkToProfile = `/profile/${previewerName.toLowerCase().replace(" ", "-")}`;

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={linkToProfile}>
          <img src={previewerImage} />
        </Link>
        <div className="info">
          <Link to={linkToProfile} className="author">
            {previewerName}
          </Link>
          <span className="date">{date}</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/article/${slug}`} className="preview-link">
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {tags.map((tag) => (
            <li className="tag-default tag-pill tag-outline">{tag}</li>
          ))}
        </ul>
      </Link>
    </div>
  );
}
