import Link from "next/link";
import { ExternalLinkIcon, PencilIcon, PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusBanner } from "@/components/admin/status-banner";
import { buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/content";
import { getAllPosts } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Posts" };

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { saved, deleted } = await searchParams;
  const posts = getAllPosts();
  const published = posts.filter((post) => post.published).length;
  const drafts = posts.length - published;

  return (
    <>
      <AdminPageHeader
        title="Posts"
        description={`${published} published · ${drafts} ${drafts === 1 ? "draft" : "drafts"}`}
        actions={
          <Link
            href="/admin/posts/new"
            className={cn(buttonVariants(), "h-9 gap-1.5 px-4")}
          >
            <PlusIcon className="size-4" />
            New post
          </Link>
        }
      />

      <StatusBanner saved={saved} deleted={deleted} />

      {posts.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1fr_110px_140px_120px] gap-4 border-b border-border px-5 py-3 md:grid">
            <span className="label-mono">Title</span>
            <span className="label-mono">Status</span>
            <span className="label-mono">Updated</span>
            <span className="label-mono text-right">Actions</span>
          </div>

          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-3 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-muted/30 md:grid md:grid-cols-[1fr_110px_140px_120px] md:items-center md:gap-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                  /blog/{post.slug}
                </p>
              </div>

              <div>
                <StatusBadge published={post.published} />
              </div>

              <span className="label-mono">{formatDate(post.updatedAt)}</span>

              <div className="flex items-center gap-2 md:justify-end">
                {post.published && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    aria-label={`View ${post.title}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon-sm" }),
                    )}
                  >
                    <ExternalLinkIcon />
                  </Link>
                )}
                <Link
                  href={`/admin/posts/${post.id}`}
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
          <p className="font-serif text-3xl">No posts yet.</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Every archive starts with one essay. Write something small and
            publish it.
          </p>
          <Link
            href="/admin/posts/new"
            className={cn(buttonVariants(), "mt-6 h-9 gap-1.5 px-4")}
          >
            <PlusIcon className="size-4" />
            Write a post
          </Link>
        </div>
      )}
    </>
  );
}
