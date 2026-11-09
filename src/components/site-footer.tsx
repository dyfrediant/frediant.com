import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Profile } from "@/lib/db/schema";
import { LocalTime } from "@/components/local-time";

export function SiteFooter({ profile, hasWriting }: { profile: Profile; hasWriting: boolean }) {
  const year = new Date().getFullYear();
  const socials = [
    { label: "GitHub", href: profile.github },
    { label: "GitLab", href: profile.gitlab },
    { label: "X / Twitter", href: profile.twitter },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((social): social is { label: string; href: string } =>
    Boolean(social.href),
  );

  return (
    <footer className="mt-24 border-t border-border md:mt-32">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="display-lg mt-5">
              Let&apos;s build something great together.
            </h2>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-2 text-lg link-quiet"
            >
              {profile.email}
              <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-5 md:justify-items-end">
            <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
              <p className="label-mono mb-1">Explore</p>
              <Link href="/" className="link-quiet w-fit">
                Home
              </Link>
              <Link href="/projects" className="link-quiet w-fit">
                Work
              </Link>
              {hasWriting && <Link href="/blog" className="link-quiet w-fit">Writing</Link>}
              <Link href="/#about" className="link-quiet w-fit">
                About
              </Link>
            </nav>

            <div className="flex flex-col gap-3 text-sm">
              <p className="label-mono mb-1">Elsewhere</p>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5"
                >
                  <span className="link-quiet">{social.label}</span>
                  <ArrowUpRightIcon className="size-3 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
              <Link href="/admin" className="link-quiet mt-2 w-fit text-muted-foreground">
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p className="label-mono">
            © {year} {profile.brand}
          </p>
          <p className="label-mono flex items-center gap-2">
            <span>{profile.location}</span>
            <span aria-hidden>—</span>
            <LocalTime />
          </p>
          <p className="label-mono">Designed &amp; built with care</p>
        </div>
      </div>
    </footer>
  );
}
