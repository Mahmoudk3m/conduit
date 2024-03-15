export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <ul className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
