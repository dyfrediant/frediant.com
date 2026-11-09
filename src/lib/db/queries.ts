import { and, asc, count, desc, eq } from "drizzle-orm";
import { db } from "./index";
import { posts, profile, projects, type Post, type Profile, type Project } from "./schema";

export const fallbackProfile: Profile = {
  id: 1,
  name: "Fred",
  brand: "frediant",
  role: "Fullstack Developer & CRO Specialist",
  headline: "I build high-conversion digital products, from architecture to pixel-perfect UI.",
  bio: "Building digital products that convert. Pixel by pixel. My work spans fullstack development, UI/UX, DevOps, and CRO.",
  location: "Jakarta, Indonesia",
  email: "hi@frediant.com",
  github: null,
  gitlab: "https://gitlab.com/aldyfrediant",
  twitter: null,
  linkedin: "https://www.linkedin.com/in/aldyfrediant/",
  avatar: null,
  availability: "",
  updatedAt: new Date(),
};

export function getProfile(): Profile {
  return db.select().from(profile).limit(1).get() ?? fallbackProfile;
}

export function getPublishedPosts(limit?: number) {
  const query = db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));
  return limit ? query.limit(limit).all() : query.all();
}

export function getAllPosts() {
  return db.select().from(posts).orderBy(desc(posts.updatedAt)).all();
}

export function getPostBySlug(slug: string) {
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.published, true)))
    .get();
}

export function getPostById(id: number) {
  return db.select().from(posts).where(eq(posts.id, id)).get();
}

export function getPublishedProjects(limit?: number) {
  const query = db
    .select()
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt));
  return limit ? query.limit(limit).all() : query.all();
}

export function getFeaturedProjects(limit = 3) {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.published, true), eq(projects.featured, true)))
    .orderBy(asc(projects.sortOrder), desc(projects.createdAt))
    .limit(limit)
    .all();
}

export function getAllProjects() {
  return db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), desc(projects.updatedAt))
    .all();
}

export function getProjectBySlug(slug: string) {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .get();
}

export function getProjectById(id: number) {
  return db.select().from(projects).where(eq(projects.id, id)).get();
}

export function getCounts() {
  const postCount = db.select({ value: count() }).from(posts).get()?.value ?? 0;
  const projectCount =
    db.select({ value: count() }).from(projects).get()?.value ?? 0;
  const publishedPosts =
    db
      .select({ value: count() })
      .from(posts)
      .where(eq(posts.published, true))
      .get()?.value ?? 0;
  const publishedProjects =
    db
      .select({ value: count() })
      .from(projects)
      .where(eq(projects.published, true))
      .get()?.value ?? 0;

  return { postCount, projectCount, publishedPosts, publishedProjects };
}

export type { Post, Profile, Project };
