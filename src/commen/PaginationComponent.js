import React, { useState } from "react";
import style from "../styles/Pagination.module.css";
import { ITEM_PER_PAGE } from "../app/constent";

const PaginationComponent = ({
  handlePage,
  page,
  setPage,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / ITEM_PER_PAGE);

  return (
    <div className={style.paginationcontainer}>
      <p>
        Showing <span>{(page - 1) * ITEM_PER_PAGE + 1}</span> to
        <span>{Math.min(page * ITEM_PER_PAGE, totalItems)}</span> of
        <span> {totalItems} </span> results
      </p>

      <div className={style.pagination}>
        <button onClick={() => handlePage(page - 1)} disabled={page === 1}>
          Previous
        </button>

        <ul className={style.paginationlist}>
          {Array.from({ length: totalPages }).map((el, index) => (
            <li
              key={index}
              onClick={() => handlePage(index + 1)}
              className={page === index + 1 ? style.active : ""}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
