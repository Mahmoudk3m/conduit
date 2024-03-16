import { useFollowUser } from "@/features/profile/api/followUser";

export default function FollowButton({
  username,
  followed,
  setFollowed
}: {
  username: string;
  followed: boolean;
  setFollowed: (prev: boolean) => void;
}) {
  const { mutate, isLoading } = useFollowUser({
    username: username,
    followed: followed
  });

  const handleFollow = () => {
    mutate(undefined, {
      onSuccess: () => {
        setFollowed(!followed);
      }
    });
  };

  return (
    <button onClick={handleFollow} className={`btn btn-sm btn-outline-secondary action-btn ${isLoading && "disabled"}`}>
      {followed ? (
        <>
          <i className="ion-minus-round"></i>
          &nbsp; Unfollow {username}
        </>
      ) : (
        <>
          <i className="ion-plus-round"></i>
          &nbsp; Follow {username}
        </>
      )}
    </button>
  );
}
