import React from 'react'

function Pagination({ paginationInfo, onPageChange }) {
    return (
        <div className="flex justify-center items-center gap-2 my-3">
            {Array.from({ length: paginationInfo.totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg font-bold ${
                        paginationInfo.currentPage === index + 1
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination