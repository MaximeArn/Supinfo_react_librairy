interface PaginationControlsProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function PaginationControls({
  currentPage,
  onPageChange,
  isLoading,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        className="btn btn-sm btn-outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
      >
        Previous
      </button>

      <span className="text-sm font-medium">Page {currentPage}</span>

      <button
        className="btn btn-sm btn-outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading}
      >
        Next
      </button>
    </div>
  );
}
