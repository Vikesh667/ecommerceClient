import React, { useState } from 'react';
import style from "../styles/Pagination.module.css"
const PaginationComponent = ({products}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  const totalItems = 30; // Total number of items (replace with your data source)

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate dummy data
   const dummyData = Array.from({ length: totalItems }, (_, index) => `items ${index + 1}`);

  // Slice the data to display only items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
//   const currentData = dummyData.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.paginationcontainer}>
      <h1>Pagination Example</h1>
      {/* <ul className={style.itemlist}>
        {products.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      <div className={style.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <ul className={style.paginationlist}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </li>
          ))}
        </ul>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
