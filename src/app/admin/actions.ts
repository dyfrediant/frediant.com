"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import type { ActionState } from "@/lib/action-state";
import { clearSessionCookie, getSession, setSessionCookie } from "@/lib/auth";
import { slugify } from "@/lib/content";
import { db } from "@/lib/db";
import { posts, profile, projects } from "@/lib/db/schema";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { isAdminConfigured, verifyPassword } from "@/lib/session";

async function assertAdmin() {
  if (!(await getSession())) {
    redirect("/admin/login");
  }
}

function safeNext(value: string | null) {
  if (value && value.startsWith("/admin") && !value.startsWith("//")) {
    return value;
  }
  return "/admin";
}

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalValue(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value || null;
}

function refreshPublicContent() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/projects");
}

export async function loginAction(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Admin is not configured. Add ADMIN_PASSWORD to .env.local and restart the server.",
    };
  }

  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limit = checkRateLimit(ip);

  if (!limit.allowed) {
    const minutes = Math.max(1, Math.ceil((limit.retryAfter ?? 600) / 60));
    return { error: `Too many attempts. Try again in ${minutes} minutes.` };
  }

  const password = stringValue(formData, "password");
  if (!verifyPassword(password)) {
    return { error: "That password is not right. Try again." };
  }

  resetRateLimit(ip);
  await setSessionCookie();
  redirect(safeNext(stringValue(formData, "next")));
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function savePost(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();

  const idValue = stringValue(formData, "id");
  const id = idValue ? Number(idValue) : null;
  const title = stringValue(formData, "title");
  const excerpt = stringValue(formData, "excerpt");
  const content = stringValue(formData, "content");
  const tags = stringValue(formData, "tags");
  const coverImage = optionalValue(formData, "coverImage");
  const published = formData.get("published") === "on";

  if (!title) return { error: "A title is required." };
  if (!content) return { error: "Content is required." };

  const slug = slugify(stringValue(formData, "slug") || title);
  if (!slug) return { error: "A valid slug is required." };

  const conflict = db.select().from(posts).where(eq(posts.slug, slug)).get();
  if (conflict && conflict.id !== id) {
    return { error: "That slug is already used by another post." };
  }

  const existing = id
    ? db.select().from(posts).where(eq(posts.id, id)).get()
    : null;
  if (id && !existing) return { error: "Post not found." };

  const now = new Date();
  const publishedAt = published ? existing?.publishedAt ?? now : existing?.publishedAt ?? null;

  if (id) {
    db.update(posts)
      .set({
        title,
        slug,
        excerpt,
        content,
        tags,
        coverImage,
        published,
        publishedAt,
        updatedAt: now,
      })
      .where(eq(posts.id, id))
      .run();
  } else {
    db.insert(posts)
      .values({
        title,
        slug,
        excerpt,
        content,
        tags,
        coverImage,
        published,
        publishedAt,
        createdAt: now,
        updatedAt: now,
      })
      .run();
  }

  refreshPublicContent();
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  redirect(`/admin/posts?saved=${id ? "updated" : "created"}`);
}

export async function deletePost(id: number) {
  await assertAdmin();
  db.delete(posts).where(eq(posts.id, id)).run();
  refreshPublicContent();
  revalidatePath("/admin/posts");
  redirect("/admin/posts?deleted=1");
}

export async function saveProject(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();

  const idValue = stringValue(formData, "id");
  const id = idValue ? Number(idValue) : null;
  const title = stringValue(formData, "title");
  const summary = stringValue(formData, "summary");
  const content = stringValue(formData, "content");
  const tech = stringValue(formData, "tech");
  const year = stringValue(formData, "year");
  const role = stringValue(formData, "role");
  const liveUrl = optionalValue(formData, "liveUrl");
  const repoUrl = optionalValue(formData, "repoUrl");
  const coverImage = optionalValue(formData, "coverImage");
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";
  const sortOrder = Number(stringValue(formData, "sortOrder") || "0");

  if (!title) return { error: "A title is required." };
  if (!content) return { error: "Content is required." };

  const slug = slugify(stringValue(formData, "slug") || title);
  if (!slug) return { error: "A valid slug is required." };

  const conflict = db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .get();
  if (conflict && conflict.id !== id) {
    return { error: "That slug is already used by another project." };
  }

  const existing = id
    ? db.select().from(projects).where(eq(projects.id, id)).get()
    : null;
  if (id && !existing) return { error: "Project not found." };

  const now = new Date();
  const values = {
    title,
    slug,
    summary,
    content,
    tech,
    year,
    role,
    liveUrl,
    repoUrl,
    coverImage,
    featured,
    published,
    sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
    updatedAt: now,
  };

  if (id) {
    db.update(projects).set(values).where(eq(projects.id, id)).run();
  } else {
    db.insert(projects)
      .values({ ...values, createdAt: now })
      .run();
  }

  refreshPublicContent();
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/admin/projects");
  redirect(`/admin/projects?saved=${id ? "updated" : "created"}`);
}

export async function deleteProject(id: number) {
  await assertAdmin();
  db.delete(projects).where(eq(projects.id, id)).run();
  refreshPublicContent();
  revalidatePath("/admin/projects");
  redirect("/admin/projects?deleted=1");
}

export async function updateProfile(
  _previous: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await assertAdmin();

  const name = stringValue(formData, "name");
  const brand = stringValue(formData, "brand");
  const email = stringValue(formData, "email");

  if (!name) return { error: "A name is required." };
  if (!brand) return { error: "A brand name is required." };
  if (!email || !email.includes("@")) {
    return { error: "A valid email is required." };
  }

  const values = {
    name,
    brand,
    role: stringValue(formData, "role"),
    headline: stringValue(formData, "headline"),
    bio: stringValue(formData, "bio"),
    location: stringValue(formData, "location"),
    email,
    github: optionalValue(formData, "github"),
    gitlab: optionalValue(formData, "gitlab"),
    twitter: optionalValue(formData, "twitter"),
    linkedin: optionalValue(formData, "linkedin"),
    avatar: optionalValue(formData, "avatar"),
    availability: stringValue(formData, "availability"),
    updatedAt: new Date(),
  };

  db.insert(profile)
    .values({ id: 1, ...values })
    .onConflictDoUpdate({ target: profile.id, set: values })
    .run();

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/projects");
  revalidatePath("/admin");
  redirect("/admin/settings?saved=1");
}
