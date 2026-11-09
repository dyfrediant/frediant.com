import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { requireSession } from "@/lib/auth";
import { getProfile } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();
  const profile = getProfile();

  return <AdminShell brand={profile.brand}>{children}</AdminShell>;
}
