import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({
  title,
  description,
  action,
}: {
  title: ReactNode;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div>
      <div className="flex items-center gap-4 border-t border-border pt-5">
        {action && (
          <Link
            href={action.href}
            className="group label-mono ml-auto inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
          >
            {action.label}
            <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className="mt-7 flex flex-col justify-between gap-5 md:mt-8 md:flex-row md:items-end">
        <h2 className="display-lg max-w-2xl text-balance">{title}</h2>
        {description && (
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
