import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { getSession } from "@/lib/auth";
import { getProfile } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (await getSession()) redirect("/admin");

  const { next } = await searchParams;
  const profile = getProfile();
  const devHint =
    process.env.NODE_ENV !== "production" &&
    process.env.ADMIN_PASSWORD === "frediant"
      ? "Local development password: frediant"
      : null;

  return (
    <div className="grain grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#17150f] p-12 text-[#f3efe6] lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 30% 40%, black, transparent 75%)",
          }}
          aria-hidden
        />
        <Link href="/" className="relative font-serif text-2xl tracking-tight">
          {profile.brand}
          <span className="text-[#ff5a2b]">.</span>
        </Link>

        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#f3efe6]/50">
            Private studio
          </p>
          <p className="mt-6 max-w-lg font-serif text-6xl leading-[0.98] tracking-tight xl:text-7xl">
            Content,
            <br />
            <span className="italic text-[#ff5a2b]">under control.</span>
          </p>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-16 bg-[#f3efe6]/25" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe6]/50">
              {profile.location}
            </span>
          </div>
        </div>

        <p className="relative max-w-sm text-sm leading-relaxed text-[#f3efe6]/55">
          One quiet place to write, publish, and keep the site current. No
          dashboards you do not need.
        </p>
      </div>

      <main className="flex min-h-dvh items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-12 flex items-center justify-between lg:hidden">
            <Link href="/" className="font-serif text-2xl tracking-tight">
              {profile.brand}
              <span className="text-accent">.</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back to site
            </Link>
          </div>

          <p className="label-mono">Admin access</p>
          <h1 className="display-md mt-3">Welcome back.</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in to manage posts, projects, and the profile shown on the
            site.
          </p>

          <LoginForm next={next ?? "/admin"} devHint={devHint} />

          <div className="mt-10 flex items-center justify-between border-t border-border pt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="size-3.5" />
              Back to site
            </Link>
            <span className="label-mono">CPH</span>
          </div>
        </div>
      </main>
    </div>
  );
}
