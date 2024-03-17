import { Link, useParams } from "react-router-dom";
import { useGetArticle } from "../api/getArticle";
import Loader from "@/Shared/components/Loader";
import FollowButton from "@/Shared/components/FollowButton";
import FavouriteButton from "@/Shared/components/FavouriteButton";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import { useGetComments } from "../api/getComments";
import CommentCard from "../components/CommentCard";

export default function Article() {
  const { user } = useUserStore();
  const { slug } = useParams();
  const { data, isLoading } = useGetArticle(slug);
  const { data: commentsData, isLoading: commentsIsLoading } = useGetComments(slug || "");

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

  const [followed, setFollowed] = useState(article?.author.following || false);

  useEffect(() => {
    setFollowed(article?.author.following || false);
  }, [article]);

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
            {article && (
              <FollowButton followed={followed} setFollowed={setFollowed} username={article.author.username} />
            )}
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
            {article && (
              <FollowButton followed={followed} setFollowed={setFollowed} username={article.author.username} />
            )}
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
              <CommentForm slug={slug ?? ""} />
              {commentsIsLoading && <Loader />}
              {commentsData?.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} slug={slug ?? ""} />
              ))}
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
