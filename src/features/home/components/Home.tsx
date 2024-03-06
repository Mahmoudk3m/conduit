import Banner from "./Banner";
import FeedToggler from "./FeedToggler";
import Article from "@/components/Shared/Article";
import Pagination from "@/components/Shared/Pagination";
import Tags from "./Tags";
import { useGetArticles } from "../api/getArticles";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/Shared/Loader";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [tag, setTag] = useState<string>();
  const [feed, setFeed] = useState("global");
  const { data, isLoading, isError } = useGetArticles({ params: { limit: 10, offset, tag } });

  const articlesCount = data?.articlesCount;
  const prevTotalPages = useRef(totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTagChange = (tag: string) => {
    setTag(tag);
    setFeed("tag");
    setCurrentPage(1);
  };

  const handleFeedChange = (feed: string) => {
    setFeed(feed);
    setTag(undefined);
  };

  useEffect(() => {
    setOffset((currentPage - 1) * 10);
  }, [currentPage]);

  useEffect(() => {
    if (articlesCount !== undefined) {
      setTotalPages(Math.ceil(articlesCount / 10));
      prevTotalPages.current = Math.ceil(articlesCount / 10);
    } else {
      setTotalPages(prevTotalPages.current);
    }
  }, [articlesCount]);

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler isLoggedIn={false} tag={tag} activeFeed={feed} onChangeFeed={handleFeedChange} />
            {isLoading && <Loader />}
            {isError && <div>Error fetching articles</div>}
            {data?.articles.map((article) => (
              <Article key={article.slug} {...article} />
            ))}
            {prevTotalPages.current !== 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </div>

          <div className="col-md-3">
            <Tags onTagChange={handleTagChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
