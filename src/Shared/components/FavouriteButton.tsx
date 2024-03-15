import { useFavouriteArticle } from "../api/favouriteArticle";
import { useUnfavouriteArticle } from "../api/unfavouriteArticle";

const FavouriteButton = ({
  favorited,
  favouritesCount,
  post,
  slug
}: {
  favorited: boolean;
  favouritesCount: number;
  post?: boolean;
  slug: string;
}) => {
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
    <>
      {favorited ? (
        <button
          onClick={handleFavourite}
          className={`btn btn-sm btn-outline-primary ${isFavouriteLoading || (isUnfavouriteLoading && "disabled")}`}
        >
          <i className="ion-heart"></i>
          &nbsp; Unfavorite {post ? "post" : "article"} <span className="counter">({favouritesCount})</span>
        </button>
      ) : (
        <button
          onClick={handleFavourite}
          className={`btn btn-sm btn-outline-primary ${isFavouriteLoading || (isUnfavouriteLoading && "disabled")}`}
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
