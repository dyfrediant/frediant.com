import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import type { Post } from "@/lib/db/schema";
import { formatDate, parseList, readingTime } from "@/lib/content";

export function PostRow({ post }: { post: Post }) {
  const tags = parseList(post.tags);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-3 border-t border-border py-6 transition-colors duration-300 hover:border-foreground/30 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7"
    >
      <div className="flex items-center gap-3 md:col-span-2 md:block">
        <span className="label-mono">{formatDate(post.publishedAt)}</span>
        <span className="label-mono md:hidden">
          {readingTime(post.content)} min
        </span>
      </div>

      <div className="md:col-span-8">
        <h3 className="font-sans text-base font-medium tracking-tight transition-colors duration-200 group-hover:text-accent md:text-lg">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        {tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="label-mono">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="hidden items-center justify-end gap-4 md:col-span-2 md:flex">
        <span className="label-mono">{readingTime(post.content)} min</span>
        <ArrowUpRightIcon className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </div>
    </Link>
  );
}
