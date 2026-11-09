import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  ExternalLinkIcon,
  GitBranchIcon,
} from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { Markdown } from "@/components/markdown";
import { buttonVariants } from "@/components/ui/button";
import { parseList } from "@/lib/content";
import { getProjectBySlug, getPublishedProjects } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.coverImage ? [{ url: project.coverImage }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const tech = parseList(project.tech);
  const projects = getPublishedProjects();
  const index = projects.findIndex((item) => item.id === project.id);
  const next =
    projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  return (
    <>
      <header className="shell pt-8 md:pt-10">
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <Link
            href="/projects"
            className="group label-mono inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
          >
            <ArrowLeftIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All projects
          </Link>
          {project.year && <span className="label-mono">{project.year}</span>}
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h1 className="display-xl text-balance">{project.title}</h1>
          </div>
          <div className="lg:col-span-4">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "h-10 gap-2 rounded-full px-4 text-[0.8rem]",
                  )}
                >
                  Live site
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-10 gap-2 rounded-full px-4 text-[0.8rem]",
                  )}
                >
                  <GitBranchIcon className="size-3.5" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5">
          <span className="label-mono">
            Role — <span className="text-foreground">{project.role}</span>
          </span>
          {project.year && <span className="label-mono">Year — <span className="text-foreground">{project.year}</span></span>}
          {tech.length > 0 && (
            <ul className="flex flex-wrap gap-x-3 gap-y-1">
              {tech.map((item) => (
                <li key={item} className="label-mono">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {project.coverImage && (
        <div className="shell mt-12 md:mt-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted md:aspect-[3/2]">
            <CoverImage
              src={project.coverImage}
              alt={`${project.title} cover`}
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </div>
      )}

      {project.content && (
        <div className="shell mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Markdown content={project.content} />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="sticky top-28 border-t border-border pt-6">
              <p className="label-mono">Project details</p>
              <dl className="mt-5 space-y-5">
                {project.year && <div>
                  <dt className="label-mono">Year</dt>
                  <dd className="mt-1.5 text-sm">{project.year}</dd>
                </div>}
                <div>
                  <dt className="label-mono">Role</dt>
                  <dd className="mt-1.5 text-sm">{project.role}</dd>
                </div>
                <div>
                  <dt className="label-mono">Stack</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-2 gap-y-1 text-sm">
                    {tech.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </dd>
                </div>
                {(project.liveUrl || project.repoUrl) && (
                  <div>
                    <dt className="label-mono">Links</dt>
                    <dd className="mt-2 flex flex-col gap-2 text-sm">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 link-quiet"
                        >
                          Live site
                          <ArrowUpRightIcon className="size-3.5" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-fit items-center gap-1.5 link-quiet"
                        >
                          Source code
                          <ArrowUpRightIcon className="size-3.5" />
                        </a>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      )}

      <section className="shell mt-24 md:mt-32">
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <span className="label-mono">Next project</span>
          <Link
            href="/projects"
            className="label-mono text-foreground transition-colors hover:text-accent"
          >
            All projects
          </Link>
        </div>
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-baseline"
          >
            <span className="display-md max-w-3xl text-balance transition-colors duration-300 group-hover:text-accent">
              {next.title}
            </span>
            <ArrowUpRightIcon className="size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ) : (
          <p className="mt-6 font-serif text-3xl text-muted-foreground">
            More work coming soon.
          </p>
        )}
      </section>
    </>
  );
}
