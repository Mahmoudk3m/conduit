import Banner from "../components/Banner";
import FeedToggler from "../components/FeedToggler";
import Article from "@/Shared/components/Article";
import Pagination from "@/Shared/components/Pagination";
import Tags from "../components/Tags";
import { useGetArticles } from "@/Shared/api/getArticles";
import { useEffect, useRef, useState } from "react";
import Loader from "@/Shared/components/Loader";
import useUserStore from "@/stores/userStore";

export default function Home() {
  const { user } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);
  const [tag, setTag] = useState<string>();
  const [feed, setFeed] = useState("global");

  const { data, isLoading, isError } = useGetArticles({ params: { limit: 10, offset, tag } }, feed === "yourFeed");

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

  const articlesCount = data?.articlesCount;

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
            <FeedToggler isLoggedIn={!!user} tag={tag} activeFeed={feed} onChangeFeed={handleFeedChange} />
            {isLoading && <Loader />}
            {isError && <div>Error fetching articles</div>}
            {data?.articles.length === 0 && !isLoading && <div>No articles are here... yet.</div>}
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
