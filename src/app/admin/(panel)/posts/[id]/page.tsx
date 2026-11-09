import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostForm } from "@/components/admin/post-form";
import { getPostById } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit post" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPostById(Number(id));

  if (!post) notFound();

  return <PostForm post={post} />;
}
