"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { deleteProject, saveProject } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { StatusBadge } from "@/components/admin/status-badge";
import { SubmitButton } from "@/components/admin/submit-button";
import { ErrorBanner } from "@/components/admin/status-banner";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export function ProjectForm({ project }: { project?: Project }) {
  const [state, formAction] = useActionState(saveProject, null);
  const isEdit = Boolean(project);

  return (
    <form action={formAction}>
      {project && <input type="hidden" name="id" value={project.id} />}

      <AdminPageHeader
        title={isEdit ? "Edit project" : "New project"}
        description={
          isEdit
            ? `Editing “${project?.title}”. Changes go live as soon as you save.`
            : "A case study, a side project, a system — show the problem and how you solved it."
        }
        actions={
          <>
            {project?.published && (
              <Link
                href={`/projects/${project.slug}`}
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
              href="/admin/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 px-4",
              )}
            >
              Cancel
            </Link>
            <SubmitButton className="h-9 gap-2 px-5">
              {isEdit ? "Save changes" : "Create project"}
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
                defaultValue={project?.title}
                placeholder="Project name"
                required
                className="h-11 text-base"
              />
            </Field>
            <Field
              label="Summary"
              htmlFor="summary"
              hint="One or two sentences for listings and the project header."
            >
              <Textarea
                id="summary"
                name="summary"
                defaultValue={project?.summary}
                rows={3}
                placeholder="What is it, and why does it matter?"
              />
            </Field>
          </div>

          <div>
            <label htmlFor="content" className="field-label">
              Case study
            </label>
            <MarkdownEditor
              id="content"
              name="content"
              defaultValue={project?.content}
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Markdown is supported. Use headings to structure the problem,
              approach, and outcome.
            </p>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium">Publishing</h2>
              <StatusBadge published={project?.published ?? false} />
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
                defaultChecked={project?.published ?? false}
                className="mt-0.5 size-4 accent-[var(--accent)]"
              />
            </label>

            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border border-border p-3">
              <span>
                <span className="block text-sm">Featured</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Shown on the homepage
                </span>
              </span>
              <input
                type="checkbox"
                name="featured"
                defaultChecked={project?.featured ?? false}
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
                defaultValue={project?.slug}
                placeholder="meridian"
                className="font-mono text-xs"
              />
            </Field>

            <Field
              label="Sort order"
              htmlFor="sortOrder"
              hint="Lower numbers appear first."
            >
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min={0}
                defaultValue={project?.sortOrder ?? 0}
              />
            </Field>
          </div>

          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-medium">Details</h2>
            <Field label="Year" htmlFor="year">
              <Input
                id="year"
                name="year"
                defaultValue={project?.year}
                placeholder="2026"
              />
            </Field>
            <Field label="Role" htmlFor="role">
              <Input
                id="role"
                name="role"
                defaultValue={project?.role}
                placeholder="Product design & front-end"
              />
            </Field>
            <Field
              label="Tech stack"
              htmlFor="tech"
              hint="Comma separated, e.g. Next.js, TypeScript"
            >
              <Input
                id="tech"
                name="tech"
                defaultValue={project?.tech}
                placeholder="Next.js, TypeScript, PostgreSQL"
              />
            </Field>
          </div>

          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-medium">Links</h2>
            <Field label="Live URL" htmlFor="liveUrl">
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl ?? ""}
                placeholder="https://example.com"
              />
            </Field>
            <Field label="Repository URL" htmlFor="repoUrl">
              <Input
                id="repoUrl"
                name="repoUrl"
                type="url"
                defaultValue={project?.repoUrl ?? ""}
                placeholder="https://github.com/…"
              />
            </Field>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <ImageUpload
              name="coverImage"
              label="Cover image"
              defaultValue={project?.coverImage}
            />
          </div>

          {project && (
            <div className="rounded-lg border border-destructive/25 bg-destructive/[0.03] p-5">
              <h2 className="text-sm font-medium text-destructive">Danger zone</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Deleting a project removes it from the site permanently. This
                cannot be undone.
              </p>
              <div className="mt-4">
                <DeleteButton
                  id={project.id}
                  action={deleteProject}
                  label="Delete project"
                  description={`“${project.title}” will be permanently deleted.`}
                />
              </div>
            </div>
          )}
        </aside>
      </div>
    </form>
  );
}
