import Link from "next/link";
import { ExternalLinkIcon, PencilIcon, PlusIcon, StarIcon } from "lucide-react";
import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusBanner } from "@/components/admin/status-banner";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/content";
import { getAllProjects } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { saved, deleted } = await searchParams;
  const projects = getAllProjects();
  const published = projects.filter((project) => project.published).length;

  return (
    <>
      <AdminPageHeader
        title="Projects"
        description={`${published} published · ${projects.length - published} hidden`}
        actions={
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants(), "h-9 gap-1.5 px-4")}
          >
            <PlusIcon className="size-4" />
            New project
          </Link>
        }
      />

      <StatusBanner saved={saved} deleted={deleted} />

      {projects.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1fr_110px_140px_120px] gap-4 border-b border-border px-5 py-3 md:grid">
            <span className="label-mono">Project</span>
            <span className="label-mono">Status</span>
            <span className="label-mono">Updated</span>
            <span className="label-mono text-right">Actions</span>
          </div>

          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-3 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-muted/30 md:grid md:grid-cols-[1fr_110px_140px_120px] md:items-center md:gap-4"
            >
              <div className="min-w-0">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  {project.title}
                  {project.featured && (
                    <StarIcon
                      className="size-3 shrink-0 fill-accent text-accent"
                      aria-label="Featured"
                    />
                  )}
                </p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                  /projects/{project.slug}
                  {project.year ? ` · ${project.year}` : ""}
                </p>
              </div>

              <div>
                <StatusBadge published={project.published} />
              </div>

              <span className="label-mono">{formatDate(project.updatedAt)}</span>

              <div className="flex items-center gap-2 md:justify-end">
                {project.published && (
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    aria-label={`View ${project.title}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon-sm" }),
                    )}
                  >
                    <ExternalLinkIcon />
                  </Link>
                )}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-8 gap-1.5 px-3 text-xs",
                  )}
                >
                  <PencilIcon className="size-3.5" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <p className="font-serif text-3xl">No projects yet.</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Add the work you are proud of. One good case study beats ten
            thumbnails.
          </p>
          <Link
            href="/admin/projects/new"
            className={cn(buttonVariants(), "mt-6 h-9 gap-1.5 px-4")}
          >
            <PlusIcon className="size-4" />
            Add a project
          </Link>
        </div>
      )}
    </>
  );
}
