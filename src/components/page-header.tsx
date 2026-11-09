import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  meta,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  meta?: string;
  className?: string;
}) {
  return (
    <header className={cn("shell pt-8 md:pt-10", className)}>
      <div className="flex items-center gap-4 border-t border-border pt-5">
        {meta && <span className="label-mono ml-auto">{meta}</span>}
      </div>
      <h1 className="display-xl mt-8 max-w-5xl text-balance md:mt-10">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:mt-7 md:text-base">
          {description}
        </p>
      )}
    </header>
  );
}
