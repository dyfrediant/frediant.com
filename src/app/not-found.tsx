import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <p className="label-mono">404 — Not found</p>
      <h1 className="display-xl mt-6">
        Lost in the <span className="italic text-accent">margins.</span>
      </h1>
      <p className="mt-6 max-w-md text-muted-foreground">
        The page you are looking for moved, or never existed in the first place.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm underline underline-offset-4 transition-colors hover:text-accent"
      >
        Back to home
      </Link>
    </main>
  );
}
