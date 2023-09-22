import React from "react";
import _ from "lodash";

export const Pagination = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const page = Math.ceil(itemsCount / pageSize);
  if (page === 1) {
    return null;
  }
  return (
    <>
      <nav>
        <ul className="pagination">
          {_.range(1, page + 1).map((item) => (
            <li
              key={"page" + item}
              className={"page-item" + (currentPage === item ? " active" : "")}
            >
              <a className="page-link" onClick={() => onPageChange(item)}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
