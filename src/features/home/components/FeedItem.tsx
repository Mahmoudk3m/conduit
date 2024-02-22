export default function FeedItem({
  title,
  handleFeedChange,
  feed,
  active
}: {
  title: string;
  handleFeedChange: (feed: string) => void;
  feed: string;
  active: boolean;
}) {
  return (
    <li className="nav-item">
      <a className={`nav-link ${active ? "active" : ""}`} onClick={() => handleFeedChange(feed)}>
        {title}
      </a>
    </li>
  );
}
