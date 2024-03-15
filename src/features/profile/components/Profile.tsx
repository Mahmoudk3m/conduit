import { NavLink, useParams } from "react-router-dom";
import { useGetProfile } from "../api/getProfile";
import Loader from "@/Shared/components/Loader";
import { useEffect, useRef, useState } from "react";
import { useGetArticles } from "@/Shared/api/getArticles";
import Article from "@/Shared/components/Article";
import Pagination from "@/Shared/components/Pagination";

const isUserAccount = false;

export default function Profile() {
  const { username } = useParams();
  const { data, isLoading, isError } = useGetProfile(username);

  const [offset, setOffset] = useState(0);

  const {
    data: articlesData,
    isLoading: articlesIsLoading,
    isError: articlesIsError
  } = useGetArticles({ params: { author: username, limit: 5, offset } });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const articlesCount = articlesData?.articlesCount;
  const prevTotalPages = useRef(totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setOffset((currentPage - 1) * 5);
  }, [currentPage]);

  useEffect(() => {
    if (articlesCount !== undefined) {
      setTotalPages(Math.ceil(articlesCount / 5));
      prevTotalPages.current = Math.ceil(articlesCount / 5);
    } else {
      setTotalPages(prevTotalPages.current);
    }
  }, [articlesCount]);

  if (isError) {
    return <div>Error fetching profile</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={data?.profile.image} className="user-img" />
              <h4>{data?.profile.username}</h4>
              <p>{data?.profile.bio}</p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                {data?.profile.following ? (
                  <>
                    <i className="ion-minus-round"></i>
                    &nbsp; Unfollow {data?.profile.username}
                  </>
                ) : (
                  <>
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {data?.profile.username}
                  </>
                )}
              </button>
              {isUserAccount && (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profile/${username}`}>
                    My Articles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/profile/${username}/favorites`}>
                    Favorited Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            {articlesIsError && <div>Error fetching articles</div>}
            {articlesIsLoading && <Loader />}
            {articlesData?.articles.map((article) => (
              <Article key={article.slug} {...article} />
            ))}

            {prevTotalPages.current !== 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
