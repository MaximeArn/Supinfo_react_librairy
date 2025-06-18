const AdvancedSearchResultSkeleton = () => {
  return (
    <div className="card card-side bg-base-100 shadow-md animate-pulse">
      <div className="w-32 h-44 bg-gray-200 rounded-l" />
      <div className="card-body p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-300 rounded w-24 mt-auto" />
      </div>
    </div>
  );
};

export default AdvancedSearchResultSkeleton;
