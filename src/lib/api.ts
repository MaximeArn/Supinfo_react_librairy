import { AppError, NetworkError, NotFoundError } from "@/lib/Errors";

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      if (res.status === 404) throw new NotFoundError();
      const message = await res.text();
      throw new AppError(message || "API Error", res.status);
    }

    return await res.json();
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new NetworkError();
  }
}
