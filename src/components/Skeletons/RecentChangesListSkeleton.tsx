interface Props {
  count?: number;
}

export default function RecentChangesSkeleton({ count = 10 }: Props) {
  const skeletonRows = Array.from({ length: count });

  return (
    <div className="w-full animate-pulse">
      <div className="hidden md:block overflow-x-auto rounded-lg border border-base-300 shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th className="w-1/2">Title</th>
              <th className="w-1/6">Type</th>
              <th className="w-1/3">Date</th>
            </tr>
          </thead>
          <tbody>
            {skeletonRows.map((_, i) => (
              <tr key={i} className="align-middle h-[61px]">
                <td className="py-3">
                  <div className="h-4 bg-base-300 rounded w-3/4 mb-1" />
                  <div className="h-3 bg-base-300 rounded w-1/2" />
                </td>
                <td className="py-3">
                  <div className="inline-block h-5 w-16 rounded-full bg-base-300" />
                </td>
                <td className="py-3">
                  <div className="h-3 w-24 bg-base-300 rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="md:hidden flex flex-col gap-2 mt-2">
        {skeletonRows.map((_, i) => (
          <li
            key={i}
            className="border border-base-300 rounded-lg p-3 shadow-sm bg-base-100"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-base-300 rounded w-2/3" />
              <div className="badge badge-xs bg-base-300 text-base-300 w-12 h-4" />
            </div>
            <div className="h-3 bg-base-300 rounded w-1/3 mt-2" />
            <div className="h-3 bg-base-300 rounded w-1/4 mt-1" />
          </li>
        ))}
      </ul>
    </div>
  );
}
