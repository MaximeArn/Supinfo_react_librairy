const AdvancedSearchResultSkeleton = () => {
  return (
    <div className="card card-side bg-base-100 shadow-md animate-pulse min-h-[220px]">
      <div className="w-32 h-full bg-gray-200 rounded-l" />
      <div className="card-body p-4 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="h-8 bg-gray-300 rounded w-full mt-2" />
      </div>
    </div>
  );
};

export default AdvancedSearchResultSkeleton;
