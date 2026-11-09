"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { updateProfile } from "@/app/admin/actions";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Field } from "@/components/admin/field";
import { ImageUpload } from "@/components/admin/image-upload";
import { SubmitButton } from "@/components/admin/submit-button";
import { ErrorBanner, StatusBanner } from "@/components/admin/status-banner";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export function ProfileForm({
  profile,
  saved,
}: {
  profile: Profile;
  saved?: string;
}) {
  const [state, formAction] = useActionState(updateProfile, null);

  return (
    <form action={formAction}>
      <AdminPageHeader
        title="Settings"
        description="The words and links that appear across the public site. Save once, live everywhere."
        actions={
          <>
            <Link
              href="/"
              target="_blank"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 gap-1.5 px-4",
              )}
            >
              View site
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
            <SubmitButton className="h-9 px-5">Save settings</SubmitButton>
          </>
        }
      />

      <StatusBanner saved={saved} />
      <ErrorBanner message={state?.error} />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-medium">Identity</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="name">
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile.name}
                  required
                />
              </Field>
              <Field label="Brand" htmlFor="brand">
                <Input
                  id="brand"
                  name="brand"
                  defaultValue={profile.brand}
                  required
                />
              </Field>
            </div>
            <Field label="Role" htmlFor="role">
              <Input
                id="role"
                name="role"
                defaultValue={profile.role}
                placeholder="Designer & developer"
              />
            </Field>
            <Field
              label="Headline"
              htmlFor="headline"
              hint="The large statement on the homepage. The last word is emphasised in italic."
            >
              <Textarea
                id="headline"
                name="headline"
                defaultValue={profile.headline}
                rows={2}
              />
            </Field>
            <Field
              label="Bio"
              htmlFor="bio"
              hint="The longer paragraph in the About section."
            >
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile.bio}
                rows={6}
              />
            </Field>
            <Field
              label="Availability"
              htmlFor="availability"
              hint="Shown as a status pill in the hero."
            >
              <Input
                id="availability"
                name="availability"
                defaultValue={profile.availability}
                placeholder="Available for new projects"
              />
            </Field>
          </div>

          <div className="space-y-5 rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-medium">Contact &amp; elsewhere</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" htmlFor="email">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email}
                  required
                />
              </Field>
              <Field label="Location" htmlFor="location">
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile.location}
                  placeholder="Copenhagen, Denmark"
                />
              </Field>
              <Field label="GitHub URL" htmlFor="github">
                <Input
                  id="github"
                  name="github"
                  type="url"
                  defaultValue={profile.github ?? ""}
                />
              </Field>
              <Field label="GitLab URL" htmlFor="gitlab">
                <Input
                  id="gitlab"
                  name="gitlab"
                  type="url"
                  defaultValue={profile.gitlab ?? ""}
                />
              </Field>
              <Field label="X / Twitter URL" htmlFor="twitter">
                <Input
                  id="twitter"
                  name="twitter"
                  type="url"
                  defaultValue={profile.twitter ?? ""}
                />
              </Field>
              <Field label="LinkedIn URL" htmlFor="linkedin">
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  defaultValue={profile.linkedin ?? ""}
                />
              </Field>
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <ImageUpload
              name="avatar"
              label="Portrait / avatar"
              defaultValue={profile.avatar}
              square
            />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Optional. The homepage uses a typographic monogram instead, so
              this is only used where a portrait makes sense.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-sm font-medium">Good to know</h2>
            <ul className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
              <li>Changes are applied immediately across the site.</li>
              <li>The headline appears as one sentence on the homepage.</li>
              <li>Empty social fields are hidden from the footer.</li>
            </ul>
          </div>
        </aside>
      </div>
    </form>
  );
}
