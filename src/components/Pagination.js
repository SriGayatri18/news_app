//Pagination.js
import React from 'react';

const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center">
        {pageNumbers.map(number => (
          <li key={number} className="mx-1">
            <button
              onClick={() => paginate(number)}
              className="border p-2 rounded"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
