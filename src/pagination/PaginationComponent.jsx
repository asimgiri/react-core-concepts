import React from "react";

export default function PaginationComponent(props) {
  const { currentPage, itemsPerPage, totalItems, onClick } = props;

  const pages = [];

  for (let i = 1; i < Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" href="!#" onClick={() => onClick(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
