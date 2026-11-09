"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ExternalLinkIcon,
  FileTextIcon,
  FolderKanbanIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/admin/posts", label: "Posts", icon: FileTextIcon },
  { href: "/admin/projects", label: "Projects", icon: FolderKanbanIcon },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

export function AdminShell({
  brand,
  children,
}: {
  brand: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !overlayRef.current) return;

      const focusables = Array.from(
        overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const menuButton = menuButtonRef.current;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  const current = nav.find((item) => isActive(pathname, item.href));

  const navList = (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {nav.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
            {active && (
              <span className="ml-auto size-1.5 rounded-full bg-accent" aria-hidden />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="grain min-h-dvh bg-background lg:flex">
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-20 items-center border-b border-sidebar-border px-6">
          <Link href="/admin" className="font-serif text-2xl tracking-tight">
            {brand}
            <span className="text-accent">.</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-6">
          <p className="label-mono px-3 pb-3">Content studio</p>
          {navList}
        </div>

        <div className="border-t border-sidebar-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
          >
            <ExternalLinkIcon className="size-4" />
            View site
          </Link>
          <div className="flex items-center justify-between rounded-md px-3 py-1.5">
            <span className="label-mono">Theme</span>
            <ThemeToggle />
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
            >
              <LogOutIcon className="size-4" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur-md md:px-8 lg:px-10">
          <div className="flex items-center gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open admin menu"
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted lg:hidden"
            >
              <MenuIcon className="size-5" />
            </button>
            <p className="label-mono">
              Admin <span className="px-1.5">/</span>{" "}
              <span className="text-foreground">{current?.label ?? "Overview"}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              View site
              <ExternalLinkIcon className="size-3.5" />
            </Link>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8 md:px-8 md:py-10 lg:px-10">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Admin menu"
            className="fixed inset-0 z-50 flex flex-col bg-background lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link href="/admin" className="font-serif text-2xl">
                {brand}
                <span className="text-accent">.</span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close admin menu"
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-8">
              <p className="label-mono px-3 pb-3">Content studio</p>
              {navList}
            </div>

            <div className="border-t border-border p-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground"
              >
                <ExternalLinkIcon className="size-4" />
                View site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground"
                >
                  <LogOutIcon className="size-4" />
                  Log out
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
