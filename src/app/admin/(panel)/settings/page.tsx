import type { Metadata } from "next";
import { ProfileForm } from "@/components/admin/profile-form";
import { getProfile } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const profile = getProfile();

  return <ProfileForm profile={profile} saved={saved} />;
}
