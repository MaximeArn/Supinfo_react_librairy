export interface WikipediaSummary {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
  };
  content_urls?: {
    desktop: {
      page: string;
    };
  };
}

export async function getWikipediaSummary(
  title: string
): Promise<WikipediaSummary | null> {
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    title
  )}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
