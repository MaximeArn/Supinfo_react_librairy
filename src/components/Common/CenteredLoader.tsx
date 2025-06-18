export default function CenteredLoader({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg" />
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
}
