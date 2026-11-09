import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New post" };

export default function NewPostPage() {
  return <PostForm />;
}
