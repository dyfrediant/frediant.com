import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import { CopyLink } from "@/components/copy-link";
import { Markdown } from "@/components/markdown";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { formatDate, extractHeadings, parseList, readingTime } from "@/lib/content";
import { getPostBySlug, getPublishedPosts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const tags = parseList(post.tags);
  const allPosts = getPublishedPosts();
  const index = allPosts.findIndex((item) => item.id === post.id);
  const next = allPosts.length > 1 ? allPosts[index + 1] ?? allPosts[0] : undefined;

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="shell pt-8 md:pt-10">
          <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
            <Link
              href="/blog"
              className="group label-mono inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent"
            >
              <ArrowLeftIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Writing
            </Link>
            <span className="label-mono">
              {formatDate(post.publishedAt)} — {readingTime(post.content)} min read
            </span>
          </div>

          <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h1 className="display-lg max-w-4xl text-balance">{post.title}</h1>
              {post.excerpt && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-5">
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <CopyLink className="ml-auto" />
          </div>
        </header>

        {post.coverImage && (
          <div className="shell mt-12 md:mt-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-muted md:aspect-[3/2]">
              <CoverImage
                src={post.coverImage}
                alt={`${post.title} cover`}
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        )}

        <div className="shell mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Markdown content={post.content} />
          </div>
          <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </article>

      <section className="shell mt-24 md:mt-32">
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <span className="label-mono">Next essay</span>
          <Link
            href="/blog"
            className="label-mono text-foreground transition-colors hover:text-accent"
          >
            All writing
          </Link>
        </div>
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-baseline"
          >
            <span className="display-md max-w-3xl text-balance transition-colors duration-300 group-hover:text-accent">
              {next.title}
            </span>
            <ArrowUpRightIcon className="size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ) : (
          <p className="mt-6 font-serif text-3xl text-muted-foreground">
            That&apos;s all for now.
          </p>
        )}
      </section>
    </>
  );
}
