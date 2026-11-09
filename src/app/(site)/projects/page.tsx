import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { getPublishedProjects } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across product design, front-end engineering, and design systems.",
};

export default function ProjectsPage() {
  const projects = getPublishedProjects();
  const [featured, ...rest] = projects;

  return (
    <div className="pb-8">
      <PageHeader
        meta={`${projects.length} projects`}
        title={
          <>
            Things I&apos;ve designed
            <br />
            and <span className="italic text-accent">built.</span>
          </>
        }
        description="Selected work across fullstack development, UI/UX, DevOps, conversion optimization, and CRM."
      />

      <section className="shell mt-16 md:mt-24">
        {featured && (
        <ProjectCard project={featured} wide priority />
        )}

        {rest.length > 0 && (
          <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 md:gap-10">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <div className="border-t border-border pt-10">
            <p className="text-muted-foreground">
              No projects published yet. Check back soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
