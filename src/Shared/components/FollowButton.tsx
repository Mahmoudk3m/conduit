import { useFollowUser } from "@/features/profile/api/followUser";
import useUserStore from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

export default function FollowButton({
  username,
  followed,
  setFollowed
}: {
  username: string;
  followed: boolean;
  setFollowed: (prev: boolean) => void;
}) {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = useFollowUser({
    username: username,
    followed: followed
  });

  const handleFollow = () => {
    if (!user) {
      navigate("/login");
      return;
    }

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
