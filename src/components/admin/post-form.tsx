"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { deletePost, savePost } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { ErrorBanner } from "@/components/admin/status-banner";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { StatusBadge } from "@/components/admin/status-badge";
import { SubmitButton } from "@/components/admin/submit-button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction] = useActionState(savePost, null);
  const isEdit = Boolean(post);

  return (
    <form action={formAction}>
      {post && <input type="hidden" name="id" value={post.id} />}

      <AdminPageHeader
        title={isEdit ? "Edit post" : "New post"}
        description={
          isEdit
            ? `Editing “${post?.title}”. Changes go live as soon as you save.`
            : "Write something worth reading. Markdown, cover image, tags — all optional except the words."
        }
        actions={
          <>
            {post?.published && (
              <Link
                href={`/blog/${post.slug}`}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-9 gap-1.5 px-4",
                )}
              >
                View
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            )}
            <Link
              href="/admin/posts"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 px-4",
              )}
            >
              Cancel
            </Link>
            <SubmitButton className="h-9 gap-2 px-5">
              {isEdit ? "Save changes" : "Create post"}
            </SubmitButton>
          </>
        }
      />

      <ErrorBanner message={state?.error} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <Field label="Title" htmlFor="title">
              <Input
                id="title"
                name="title"
                defaultValue={post?.title}
                placeholder="A title that earns the click"
                required
                className="h-11 text-base"
              />
            </Field>
            <Field
              label="Excerpt"
              htmlFor="excerpt"
              hint="One or two sentences. Used in listings and social previews."
            >
              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={post?.excerpt}
                rows={3}
                placeholder="What is this essay about?"
              />
            </Field>
          </div>

          <div>
            <label htmlFor="content" className="field-label">
              Content
            </label>
            <MarkdownEditor
              id="content"
              name="content"
              defaultValue={post?.content}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Markdown is supported: headings, lists, links, blockquotes, and
              fenced code blocks.
            </p>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium">Publishing</h2>
              <StatusBadge published={post?.published ?? false} />
            </div>

            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border p-3">
              <span>
                <span className="block text-sm">Published</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Visible on the public site
                </span>
              </span>
              <input
                type="checkbox"
                name="published"
                defaultChecked={post?.published ?? false}
                className="mt-0.5 size-4 accent-[var(--accent)]"
              />
            </label>

            <Field
              label="Slug"
              htmlFor="slug"
              hint="Leave blank to generate from the title."
            >
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug}
                placeholder="a-small-site-carefully-made"
                className="font-mono text-xs"
              />
            </Field>

            <Field
              label="Tags"
              htmlFor="tags"
              hint="Comma separated, e.g. Design, Process"
            >
              <Input
                id="tags"
                name="tags"
                defaultValue={post?.tags}
                placeholder="Design, Process"
              />
            </Field>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <ImageUpload
              name="coverImage"
              label="Cover image"
              defaultValue={post?.coverImage}
            />
          </div>

          {post && (
            <div className="rounded-lg border border-destructive/25 bg-destructive/[0.03] p-5">
              <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Deleting a post removes it from the site permanently. This
                cannot be undone.
              </p>
              <div className="mt-4">
                <DeleteButton
                  id={post.id}
                  action={deletePost}
                  label="Delete post"
                  description={`“${post.title}” will be permanently deleted.`}
                />
              </div>
            </div>
          )}
        </aside>
      </div>
    </form>
  );
}
