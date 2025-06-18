import RecentChange from "@/models/RecentChange.model";

interface Props {
  changes: RecentChange[];
}

function getBadgeClass(kind: string): string {
  switch (kind) {
    case "edit-book":
      return "badge-info";
    case "update":
      return "badge-warning";
    case "new-account":
      return "badge-success";
    default:
      return "badge-neutral";
  }
}

export default function RecentChanges({ changes }: Props) {
  return (
    <div className="w-full">
      <div className="hidden md:block overflow-x-auto rounded-lg border border-base-300 shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="bg-base-200 text-base-content">
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {changes.map((change) => (
              <tr key={change.id}>
                <td>
                  <div className="font-semibold">{change.title}</div>
                  <div className="text-xs text-gray-500 font-mono">
                    {change.authorName}
                  </div>
                </td>
                <td>
                  <span
                    className={`badge badge-sm text-xs max-w-[6rem] truncate ${getBadgeClass(
                      change.kind
                    )}`}
                    title={change.kind}
                  >
                    {change.kind}
                  </span>
                </td>
                <td className="whitespace-nowrap text-gray-500">
                  {change.formattedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="md:hidden flex flex-col gap-2 mt-2">
        {changes.map((change) => (
          <li
            key={change.id}
            className="border border-base-300 rounded-lg p-3 shadow-sm bg-base-100"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold line-clamp-1">
                {change.title}
              </h3>
              <span
                className={`badge badge-xs text-[10px] truncate ${getBadgeClass(
                  change.kind
                )}`}
                title={change.kind}
              >
                {change.kind}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono mt-1">
              {change.authorName}
            </p>
            <p className="text-xs text-gray-400">{change.formattedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
