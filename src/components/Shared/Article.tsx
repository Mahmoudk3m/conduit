import { Link } from "react-router-dom";

export default function Article({
  slug,
  title,
  description,
  tagList,
  createdAt,
  favoritesCount,
  author
}: Home.ArticleProps) {
  const linkToProfile = `/profile/${author.username}`;

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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
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
