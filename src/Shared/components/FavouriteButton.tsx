import { useFavouriteArticle } from "../api/favouriteArticle";

const FavouriteButton = ({
  favourited,
  favouritesCount,
  post,
  slug
}: {
  favourited: boolean;
  favouritesCount: number;
  post?: boolean;
  slug: string;
}) => {
  const { mutate: favouriteArticle, isLoading } = useFavouriteArticle({
    slug,
    favourited
  });

  return (
    <>
      {favourited ? (
        <button
          onClick={() => favouriteArticle()}
          className={`btn btn-sm btn-outline-primary ${isLoading && "disabled"}`}
        >
          <i className="ion-heart"></i>
          &nbsp; Unfavorite {post ? "post" : "article"} <span className="counter">({favouritesCount})</span>
        </button>
      ) : (
        <button
          onClick={() => favouriteArticle()}
          className={`btn btn-sm btn-outline-primary ${isLoading && "disabled"}`}
        >
          <i className="ion-heart"></i>
          &nbsp; Favorite {post ? "post" : "article"}
          <span className="counter">({favouritesCount})</span>
        </button>
      )}
    </>
  );
};

export default FavouriteButton;
