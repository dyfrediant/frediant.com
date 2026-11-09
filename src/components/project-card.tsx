import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Project } from "@/lib/db/schema";
import { parseList } from "@/lib/content";
import { CoverImage } from "@/components/cover-image";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  wide = false,
  priority = false,
}: {
  project: Project;
  wide?: boolean;
  priority?: boolean;
}) {
  const tech = parseList(project.tech);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block focus-visible:outline-offset-8"
      aria-label={`${project.title} — view project`}
    >
      {project.coverImage && (
        <div
          className={cn(
            "relative overflow-hidden rounded-sm border border-border bg-muted",
            wide ? "aspect-[16/9]" : "aspect-[4/3]",
          )}
        >
          <CoverImage
            src={project.coverImage}
            alt={`${project.title} cover`}
            priority={priority}
            sizes={
              wide
                ? "(max-width: 768px) 100vw, 1200px"
                : "(max-width: 768px) 100vw, 50vw"
            }
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-sm bg-background/90 text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>
      )}

      <div className={cn("mt-4 flex items-start justify-between gap-6", !project.coverImage && "border-t border-border pt-4")}>
        <div>
          <div className="flex items-baseline gap-3">
            <h3 className="font-sans text-lg font-medium tracking-tight md:text-xl">
              {project.title}
            </h3>
            {project.year && <span className="text-xs text-muted-foreground">{project.year}</span>}
          </div>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>
        <ArrowUpRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>

      {tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
          {tech.map((item) => (
            <li key={item} className="text-xs text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
