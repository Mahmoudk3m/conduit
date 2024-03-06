export default function FollowButton({ following, username }: { following: boolean; username: string }) {
  return (
    <button className="btn btn-sm btn-outline-secondary action-btn">
      {following ? (
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
