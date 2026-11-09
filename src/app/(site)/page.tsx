import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react";
import { HeroTitle } from "@/components/motion/hero-title";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { PostRow } from "@/components/post-row";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getFeaturedProjects,
  getProfile,
  getPublishedPosts,
  getPublishedProjects,
} from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const profile = getProfile();
  const posts = getPublishedPosts(3);
  const featuredProjects = getFeaturedProjects(3);
  const projects =
    featuredProjects.length > 0 ? featuredProjects : getPublishedProjects(3);
  const [featured, ...rest] = projects;
  const sentences = profile.bio.split(/(?<=[.!?])\s+/);
  const intro = sentences.slice(0, 2).join(" ");

  return (
    <>
      <section className="shell flex min-h-[calc(88svh-6rem)] flex-col justify-center py-12 md:min-h-[calc(88svh-7rem)] md:py-16">
        <div className="flex flex-1 flex-col justify-center py-12 lg:py-16">
          <div className="max-w-[68rem]">
            <HeroTitle headline={profile.headline} />
          </div>
          <div className="mt-7 max-w-sm lg:ml-auto">
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
              {intro}
            </p>
            <div className="mt-6 flex flex-col items-start gap-2.5">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 text-sm font-medium link-quiet"
              >
                {profile.email}
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="text-xs text-muted-foreground">
                {profile.role}
              </span>
              <span className="text-xs text-muted-foreground">
                {profile.location}
                {profile.availability && (
                  <>
                    <span aria-hidden> · </span>
                    {profile.availability}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-10 gap-2 rounded-sm px-4 text-xs",
            )}
          >
            Selected work
            <ArrowDownIcon className="size-3.5" />
          </Link>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <SectionHeading
          title="Selected work."
          description="A selection of product design, front-end development, and systems work."
          action={{ href: "/projects", label: "All projects" }}
        />

        {featured && (
          <div className="mt-10 md:mt-12">
            <ProjectCard project={featured} wide priority />
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
            {rest.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {projects.length === 0 && (
          <p className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            New work is on its way. Check back soon.
          </p>
        )}
      </section>

      {posts.length > 0 && (
        <section className="border-y border-border bg-card/45">
          <div className="shell py-20 md:py-28">
            <SectionHeading
              title="Notes and ideas."
              description="Writing about design, code, and making things for the web."
              action={{ href: "/blog", label: "All writing" }}
            />
            <div className="mt-10 md:mt-12">
              {posts.map((post) => <PostRow key={post.id} post={post} />)}
              <div className="border-t border-border" />
            </div>
          </div>
        </section>
      )}

      <section id="about" className="shell scroll-mt-24 py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-12">
            <h2 className="display-lg max-w-3xl text-balance">A little about me.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {profile.bio}
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-2">
              <div>
                <dt className="label-mono">Based in</dt>
                <dd className="mt-2 text-sm">{profile.location}</dd>
              </div>
              <div>
                <dt className="label-mono">Focus</dt>
                <dd className="mt-2 text-sm">Fullstack development and conversion optimization</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="label-mono">Tools &amp; technologies</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Laravel · React · Next.js · TypeScript · jQuery · WordPress · Google Optimize · CleverTap · Mailchimp · Figma · Adobe XD
                </dd>
              </div>
              {profile.availability && <div>
                <dt className="label-mono">Currently</dt>
                <dd className="mt-2 text-sm">{profile.availability}</dd>
              </div>}
              <div>
                <dt className="label-mono">Contact</dt>
                <dd className="mt-2 text-sm">
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-quiet text-foreground"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
