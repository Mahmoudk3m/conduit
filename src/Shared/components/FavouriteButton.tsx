import { useFavouriteArticle } from "../api/favouriteArticle";
import useUserStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

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
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { mutate: favouriteArticle, isLoading } = useFavouriteArticle({
    slug,
    favourited
  });

  const handleFavourite = () => {
    if (!user) {
      navigate("/login");
    } else {
      favouriteArticle();
    }
  };

  return (
    <>
      {favourited ? (
        <button onClick={handleFavourite} className={`btn btn-sm btn-outline-primary ${isLoading && "disabled"}`}>
          <i className="ion-heart"></i>
          &nbsp; Unfavorite {post ? "post" : "article"} <span className="counter">({favouritesCount})</span>
        </button>
      ) : (
        <button onClick={handleFavourite} className={`btn btn-sm btn-outline-primary ${isLoading && "disabled"}`}>
          <i className="ion-heart"></i>
          &nbsp; Favorite {post ? "post" : "article"}
          <span className="counter">({favouritesCount})</span>
        </button>
      )}
    </>
  );
};

export default FavouriteButton;
