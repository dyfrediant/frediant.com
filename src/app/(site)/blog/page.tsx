import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { CoverImage } from "@/components/cover-image";
import { PageHeader } from "@/components/page-header";
import { PostRow } from "@/components/post-row";
import { formatDate, readingTime } from "@/lib/content";
import { getPublishedPosts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Occasional essays about design, engineering, restraint, and making things for the web.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pb-8">
      <PageHeader
        meta={`${posts.length} essays`}
        title={
          <>
            Notes on design, code,
            <br />
            and <span className="italic text-accent">making things.</span>
          </>
        }
        description="Occasional essays about craft, restraint, and building for the web. No schedule, no newsletter popup — just when there is something worth saying."
      />

      {featured && (
        <section className="shell mt-16 md:mt-24">
          <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 border-t border-border pt-8 lg:grid-cols-12 lg:items-center"
            >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted sm:aspect-[3/2] lg:col-span-7">
                <CoverImage
                  src={featured.coverImage}
                  alt={`${featured.title} cover`}
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur-sm">
                  Latest
                </span>
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3">
                  <span className="label-mono">{formatDate(featured.publishedAt)}</span>
                  <span className="label-mono">—</span>
                  <span className="label-mono">{readingTime(featured.content)} min read</span>
                </div>
                <h2 className="display-md mt-4 text-balance transition-colors duration-300 group-hover:text-accent">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm">
                  Read the essay
                  <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="shell mt-20 md:mt-28">
          <div className="mb-2 flex items-center gap-4">
            <span className="label-mono">Archive</span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          {rest.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
          <div className="border-t border-border" />
        </section>
      )}

      {posts.length === 0 && (
        <section className="shell mt-20 border-t border-border pt-10">
          <p className="text-muted-foreground">
            Nothing published yet. Check back soon.
          </p>
        </section>
      )}
    </div>
  );
}
