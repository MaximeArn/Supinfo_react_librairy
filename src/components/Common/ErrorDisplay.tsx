import { AppError } from "@/lib/errors";

interface Props {
  error: Error | null;
}

export default function ErrorDisplay({ error }: Props) {
  if (!error) return null;

  const statusCode = error instanceof AppError ? error.statusCode : 500;

  let friendlyMessage = "Oops! Something went wrong.";

  switch (statusCode) {
    case 404:
      friendlyMessage = "Sorry, the resource you're looking for was not found.";
      break;
    case 0:
      friendlyMessage = "Network issue: please check your internet connection.";
      break;
    case 401:
      friendlyMessage = "You are not authorized to view this content.";
      break;
    case 500:
    default:
      friendlyMessage = "An unexpected error occurred. Please try again later.";
      break;
  }

  return (
    <div className="alert alert-error shadow-lg text-white">
      <div>
        <strong>{friendlyMessage}</strong>
        <p className="text-sm mt-1 opacity-80">({error.message})</p>
      </div>
    </div>
  );
}
