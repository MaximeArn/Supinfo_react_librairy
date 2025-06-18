import { useEffect, useState } from "react";
import RecentChange from "@/models/RecentChange.model";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import { fetchRecentChanges } from "@/services/recentChanges.service";
import PageHeader from "@/Components/Common/PageHeader";
import CenteredLoader from "@/Components/Common/CenteredLoader";
import RecentChanges from "../Components/RecentChanges/RecentChanges";

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
      <PageHeader
        title="Recent changes"
        description="Explore authors by theme, period, or literary movement."
      />

      <ErrorDisplay error={error} />

      {loading && <CenteredLoader message="Loading recent changes..." />}

      {!loading && !error && <RecentChanges changes={recentChanges} />}
    </>
  );
}
