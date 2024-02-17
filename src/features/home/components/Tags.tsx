import { useGetTags } from "../api/getTags";

export default function Tags() {
  const { data, isLoading, isError } = useGetTags();
  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {isLoading
          ? "Loading tags..."
          : isError
          ? "Error loading tags"
          : data?.tags.map((tag) => (
              <a href="/" className="tag-pill tag-default" key={tag}>
                {tag}
              </a>
            ))}
      </div>
    </div>
  );
}
