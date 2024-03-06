const FavouriteButton = ({
  favorited,
  favouritesCount,
  post
}: {
  favorited: boolean;
  favouritesCount: number;
  post?: boolean;
}) => {
  return (
    <>
      {favorited ? (
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i>
          &nbsp; Unfavorite {post ? "post" : "article"} <span className="counter">({favouritesCount})</span>
        </button>
      ) : (
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i>
          &nbsp; Favorite {post ? "post" : "article"}
          <span className="counter">({favouritesCount})</span>
        </button>
      )}
    </>
  );
};

export default FavouriteButton;
