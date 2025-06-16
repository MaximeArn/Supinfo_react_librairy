import { useEffect, useState } from "react";
import RecentChange from "@/models/RecentChange.model";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import { fetchRecentChanges } from "@/services/recentChanges.service";

export default function HomePage() {
  const [recentChanges, setRecentChanges] = useState<RecentChange[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentChanges()
      .then(setRecentChanges)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Welcome to the Library</h1>
      <ErrorDisplay error={error} />

      {loading && <p>Loading recent changes...</p>}

      {!loading && !error && (
        <ul className="space-y-4">
          {recentChanges.map((change) => (
            <li key={change.id} className="border rounded p-4 shadow-sm">
              <p className="font-semibold">{change.title}</p>
              <p className="text-sm text-gray-500">
                {change.kind} by{" "}
                <span className="font-mono">{change.authorName}</span> at{" "}
                {change.formattedDate}
              </p>
              {change.coverUrl && (
                <img
                  src={change.coverUrl}
                  alt={`Cover of ${change.title}`}
                  className="w-24 mt-2 rounded"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
