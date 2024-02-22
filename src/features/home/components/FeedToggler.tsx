import FeedItem from "./FeedItem";

export default function FeedToggler({
  isLoggedIn,
  tag,
  activeFeed,
  onChangeFeed
}: {
  isLoggedIn: boolean;
  tag?: string;
  activeFeed: string;
  onChangeFeed: (feed: string) => void;
}) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {isLoggedIn && (
          <FeedItem
            title="Your Feed"
            active={activeFeed === "yourFeed"}
            feed={"yourFeed"}
            handleFeedChange={onChangeFeed}
          />
        )}
        <FeedItem
          title="Global Feed"
          active={activeFeed === "global"}
          feed={"global"}
          handleFeedChange={onChangeFeed}
        />
        {tag && (
          <FeedItem title={`#${tag}`} active={activeFeed === "tag"} feed={"tag"} handleFeedChange={onChangeFeed} />
        )}
      </ul>
    </div>
  );
}
