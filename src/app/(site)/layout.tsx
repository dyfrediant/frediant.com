import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProfile, getPublishedPosts } from "@/lib/db/queries";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  const profile = getProfile();
  const hasWriting = getPublishedPosts(1).length > 0;

  return (
    <div className="site-theme flex min-h-dvh flex-col bg-background text-foreground">
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader brand={profile.brand} email={profile.email} hasWriting={hasWriting} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter profile={profile} hasWriting={hasWriting} />
    </div>
  );
}
