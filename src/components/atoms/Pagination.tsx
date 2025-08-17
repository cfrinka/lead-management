import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const getItemInfo = () => {
    if (!totalItems || !itemsPerPage) return '';
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return `Showing ${startItem}-${endItem} of ${totalItems}`;
  };

  if (totalPages <= 1 && !onItemsPerPageChange) return null;

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6">
      <div className="flex justify-between items-center sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-6">
          {showInfo && (
            <p className="text-sm text-gray-700">
              {getItemInfo()}
            </p>
          )}
          
          {onItemsPerPageChange && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                id="items-per-page"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md text-black text-sm px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span className="text-sm text-gray-700">per page</span>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center space-x-1">
            <span
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={`inline-flex items-center px-2 py-2 text-gray-400 hover:text-gray-500 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </span>

            <div className="flex items-center space-x-1">
              {visiblePages.map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-sm text-gray-500">
                      ...
                    </span>
                  ) : (
                    <span
                      onClick={() => onPageChange(page as number)}
                      className={`inline-flex items-center px-3 py-2 text-sm cursor-pointer ${
                        currentPage === page
                          ? 'font-bold text-gray-900'
                          : 'font-medium text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {page}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <span
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={`inline-flex items-center px-2 py-2 text-gray-400 hover:text-gray-500 ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
