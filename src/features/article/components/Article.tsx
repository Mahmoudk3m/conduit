import { Link, useParams } from "react-router-dom";
import { useGetArticle } from "../api/getArticle";
import Loader from "@/Shared/components/Loader";
import FollowButton from "@/Shared/components/FollowButton";
import FavouriteButton from "@/Shared/components/FavouriteButton";
import useUserStore from "@/stores/userStore";

export default function Article() {
  const { user } = useUserStore();

  const { slug } = useParams();
  const { data, isLoading } = useGetArticle(slug);
  const article = data?.article;
  const createdAt = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    : "";

  const updatedAt = article?.updatedAt
    ? new Date(article.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    : "";
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article?.title}</h1>

          <div className="article-meta">
            <Link to={`/profile/${article?.author.username}`}>
              <img src={article?.author.image} />
            </Link>
            <div className="info">
              <Link to={`/profile/${article?.author.username}`} className="author">
                {article?.author.username}
              </Link>
              <span className="date">{updatedAt}</span>
            </div>
            {article && <FollowButton following={article.author.following} username={article.author.username} />}
            &nbsp;&nbsp;
            {article && (
              <FavouriteButton
                favourited={article.favorited}
                favouritesCount={article.favoritesCount}
                slug={article.slug}
              />
            )}
            {user?.username === data?.article.author.username && (
              <>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article?.body}</p>

            <ul className="tag-list">
              {article?.tagList.map((tag) => (
                <li key={tag} className="tag-default tag-pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/profile/${article?.author.username}`}>
              <img src={article?.author.image} />
            </Link>
            <div className="info">
              <Link to={`/profile/${article?.author.username}`} className="author">
                {article?.author.username}
              </Link>
              <span className="date">{createdAt}</span>
            </div>
            {article && <FollowButton following={article.author.following} username={article.author.username} />}
            &nbsp; &nbsp;
            {article && (
              <FavouriteButton
                favourited={article.favorited}
                favouritesCount={article.favoritesCount}
                slug={article.slug}
              />
            )}
            &nbsp; &nbsp;
            {user?.username === data?.article.author.username && (
              <>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                &nbsp; &nbsp;
                <button className="btn btn-sm btn-outline-danger">
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </>
            )}
          </div>
        </div>
        {user ? (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>
            <span>
              <Link to="/login">Sign in</Link>
            </span>
            &nbsp; or &nbsp;
            <span>
              <Link to="/register">sign up</Link>
            </span>
            &nbsp; to add comments on this article.
          </p>
        )}
      </div>
    </div>
  );
}
