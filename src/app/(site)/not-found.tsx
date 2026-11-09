import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center px-6 py-32">
      <div className="text-center">
        <p className="label-mono">404 — Not found</p>
        <h1 className="display-xl mt-6">
          Lost in the <span className="italic text-accent">margins.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          The page you are looking for moved, or never existed in the first
          place. The good stuff is usually one click back.
        </p>
        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 text-sm link-quiet"
        >
          <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
