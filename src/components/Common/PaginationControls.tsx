interface PaginationControlsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isLastPage: boolean;
}

export default function PaginationControls({
  currentPage,
  onPageChange,
  isLoading,
  isLastPage = false,
}: PaginationControlsProps) {
  const handlePrevious = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={handlePrevious}
          disabled={currentPage === 1 || isLoading}
        >
          «
        </button>

        <button className="join-item btn btn-sm cursor-default" disabled>
          Page {currentPage}
        </button>

        <button
          className="join-item btn btn-sm"
          onClick={handleNext}
          disabled={isLoading || isLastPage}
        >
          »
        </button>
      </div>
    </div>
  );
}
