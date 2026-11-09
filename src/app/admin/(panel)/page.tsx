import Link from "next/link";
import { ArrowUpRightIcon, PlusIcon } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/content";
import {
  getAllPosts,
  getAllProjects,
  getCounts,
  getProfile,
} from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const counts = getCounts();
  const allProjects = getAllProjects();
  const posts = getAllPosts().slice(0, 5);
  const projects = allProjects.slice(0, 4);
  const featured = allProjects.filter(
    (project) => project.featured && project.published,
  ).length;
  const profile = getProfile();
  const drafts = counts.postCount - counts.publishedPosts;

  const today = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const stats = [
    {
      label: "Published posts",
      value: counts.publishedPosts,
      hint: `of ${counts.postCount} total`,
      href: "/admin/posts",
    },
    {
      label: "Drafts",
      value: drafts,
      hint: drafts === 1 ? "waiting to be finished" : "waiting to be finished",
      href: "/admin/posts",
    },
    {
      label: "Live projects",
      value: counts.publishedProjects,
      hint: `of ${counts.projectCount} total`,
      href: "/admin/projects",
    },
    {
      label: "Featured",
      value: featured,
      hint: "shown on the homepage",
      href: "/admin/projects",
    },
  ];

  return (
    <>
      <AdminPageHeader
        title="Welcome back."
        description={`${today}. Here is the quiet version of everything that matters.`}
        actions={
          <>
            <Link
              href="/admin/projects/new"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 gap-1.5 px-4",
              )}
            >
              <PlusIcon className="size-4" />
              New project
            </Link>
            <Link
              href="/admin/posts/new"
              className={cn(buttonVariants(), "h-9 gap-1.5 px-4")}
            >
              <PlusIcon className="size-4" />
              New post
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-foreground/25"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="label-mono">{stat.label}</p>
              <ArrowUpRightIcon className="size-3.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </div>
            <p className="mt-5 font-serif text-5xl leading-none">{stat.value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{stat.hint}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            <h2 className="text-sm font-medium">Recent posts</h2>
            <Link
              href="/admin/posts"
              className="label-mono text-foreground transition-colors hover:text-accent"
            >
              All posts
            </Link>
          </header>
          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.id}`}
                  className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 transition-colors last:border-0 hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm">{post.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      Updated {formatDate(post.updatedAt)}
                    </p>
                  </div>
                  <StatusBadge published={post.published} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-sm text-muted-foreground">
              No posts yet.{" "}
              <Link href="/admin/posts/new" className="underline underline-offset-4">
                Write the first one.
              </Link>
            </p>
          )}
        </section>

        <section className="overflow-hidden rounded-lg border border-border bg-card">
          <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
            <h2 className="text-sm font-medium">Recent projects</h2>
            <Link
              href="/admin/projects"
              className="label-mono text-foreground transition-colors hover:text-accent"
            >
              All projects
            </Link>
          </header>
          {projects.length > 0 ? (
            <div>
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5 transition-colors last:border-0 hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      {project.title}
                      {project.featured && (
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                      {project.year || "No year"} · Updated{" "}
                      {formatDate(project.updatedAt)}
                    </p>
                  </div>
                  <StatusBadge published={project.published} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-5 py-8 text-sm text-muted-foreground">
              No projects yet.{" "}
              <Link
                href="/admin/projects/new"
                className="underline underline-offset-4"
              >
                Add the first one.
              </Link>
            </p>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label-mono">Site profile</p>
            <p className="mt-2 max-w-xl text-sm">
              <span className="font-medium">{profile.name}</span> —{" "}
              <span className="text-muted-foreground">{profile.headline}</span>
            </p>
          </div>
          <Link
            href="/admin/settings"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 w-fit gap-1.5 px-4",
            )}
          >
            Edit settings
            <ArrowUpRightIcon className="size-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
