export default function BookDetailsSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto space-y-6 animate-pulse">
      {/* Grid: Cover + Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Cover */}
        <div className="bg-base-200 border border-base-300 shadow-md rounded-lg h-full flex flex-col">
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-base-300 rounded" />
              <div className="flex justify-center">
                <div className="w-[280px] h-[400px] bg-base-300 rounded" />
              </div>
            </div>

            {/* Buttons + Counter */}
            <div className="flex items-center justify-between mt-4">
              <div className="btn btn-sm btn-outline rounded-full ">&lt;</div>
              <div className="h-4 w-28 bg-base-300 rounded" />
              <div className="btn btn-sm btn-outline rounded-full ">&gt;</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-base-200 border border-base-300 shadow-md rounded-lg h-full flex flex-col">
          <div className="p-6 sm:p-8 space-y-4 flex-1">
            <div className="h-6 w-1/3 bg-base-300 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-base-300 rounded" />
              <div className="h-4 w-5/6 bg-base-300 rounded" />
              <div className="h-4 w-3/4 bg-base-300 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Author */}
      <div className="bg-base-200 border border-base-300 shadow-md rounded-lg">
        <div className="px-6 sm:px-12 py-8 space-y-6">
          <div className="h-6 w-1/4 bg-base-300 rounded" />

          <div className="flex flex-col sm:flex-row gap-8 items-start text-base-content">
            <div className="w-36 h-44 bg-base-300 rounded shadow" />

            <div className="flex-1 space-y-3 text-sm sm:text-base w-full max-w-3xl">
              <div className="h-4 w-1/3 bg-base-300 rounded" />
              <div className="h-4 w-1/4 bg-base-300 rounded" />
              <div className="h-4 w-1/4 bg-base-300 rounded" />

              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-base-300 rounded" />
                <div className="h-3 w-11/12 bg-base-300 rounded" />
                <div className="h-3 w-5/6 bg-base-300 rounded" />
                <div className="h-3 w-3/4 bg-base-300 rounded" />
              </div>

              <div className="space-y-1 pt-4">
                <div className="h-4 w-20 bg-base-300 rounded" />
                <div className="h-3 w-52 bg-base-300 rounded" />
                <div className="h-3 w-44 bg-base-300 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Places */}
      <div className="bg-base-200 border border-base-300 shadow-md rounded-lg">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="h-6 w-1/4 bg-base-300 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-20 bg-base-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Periods */}
      <div className="bg-base-200 border border-base-300 shadow-md rounded-lg">
        <div className="p-6 sm:p-8 space-y-4">
          <div className="h-6 w-1/4 bg-base-300 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-20 bg-base-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
