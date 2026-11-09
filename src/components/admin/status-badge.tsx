import { cn } from "@/lib/utils";

export function StatusBadge({
  published,
  className,
}: {
  published: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
        published
          ? "border-emerald-700/25 bg-emerald-600/10 text-emerald-800 dark:border-emerald-400/25 dark:text-emerald-300"
          : "border-border bg-muted/60 text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          published ? "bg-emerald-600 dark:bg-emerald-400" : "bg-muted-foreground",
        )}
        aria-hidden
      />
      {published ? "Published" : "Draft"}
    </span>
  );
}
