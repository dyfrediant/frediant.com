"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="label-mono">Something went wrong</p>
        <h1 className="display-lg mt-6">
          A loose <span className="italic text-accent">thread.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          This page could not load. Try again, or head back to somewhere
          familiar.
        </p>
        <div className="mt-8 flex items-center justify-center gap-5 text-sm">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity hover:opacity-80"
          >
            Try again
          </button>
          <Link href="/" className="link-quiet">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
