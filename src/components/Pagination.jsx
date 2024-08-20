import React from 'react';

const Pagination = ({ setCurrentPage, currentPage, numberOfPages, dispatch }) => {

  if (numberOfPages === 1) return null; // No pagination needed if there's only one page

  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='flex items-center space-x-2'>
        <button
          className={`px-4 py-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          onClick={() => currentPage > 1 && dispatch(setCurrentPage(currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <p className='font-bold'>{currentPage} of {numberOfPages}</p>

        <button
          className={`px-4 py-2 border rounded ${currentPage === numberOfPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          onClick={() => currentPage < numberOfPages && dispatch(setCurrentPage(currentPage + 1))}
          disabled={currentPage === numberOfPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
