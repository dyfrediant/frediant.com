import { CheckCircle2Icon, InfoIcon } from "lucide-react";

export function StatusBanner({
  saved,
  deleted,
}: {
  saved?: string;
  deleted?: string;
}) {
  let message: string | null = null;

  if (saved === "created") message = "Created successfully.";
  else if (saved === "updated") message = "Changes saved.";
  else if (saved === "1") message = "Settings saved.";
  else if (deleted) message = "Deleted successfully.";

  if (!message) return null;

  return (
    <div
      role="status"
      className="mb-6 flex items-center gap-2.5 rounded-md border border-emerald-700/25 bg-emerald-600/10 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-400/25 dark:text-emerald-300"
    >
      <CheckCircle2Icon className="size-4 shrink-0" />
      {message}
    </div>
  );
}

export function ErrorBanner({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mb-6 flex items-start gap-2.5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
    >
      <InfoIcon className="mt-0.5 size-4 shrink-0" />
      {message}
    </div>
  );
}
