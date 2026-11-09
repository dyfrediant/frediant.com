"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export function SiteHeader({
  brand,
  email,
  hasWriting,
}: {
  brand: string;
  email: string;
  hasWriting: boolean;
}) {
  const links = [
    { href: "/projects", label: "Work" },
    ...(hasWriting ? [{ href: "/blog", label: "Writing" }] : []),
    { href: "/#about", label: "About" },
  ];
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

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md"
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="font-sans text-base font-semibold tracking-[-0.04em] md:text-lg"
            aria-label={`${brand} — home`}
          >
            {brand}
            <span className="text-accent">.</span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-9 md:flex"
          >
            {links.map((link) => {
              const active =
                link.href !== "/#about" &&
                pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  className="nav-link text-sm text-foreground/80 hover:text-foreground data-[active=true]:text-foreground"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a
              href={`mailto:${email}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-9 gap-1.5 rounded-sm px-3.5 text-xs",
              )}
            >
              Let&apos;s talk
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted"
            >
              <MenuIcon className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="shell flex h-16 items-center justify-between">
              <Link
                href="/"
                className="font-serif text-2xl tracking-tight"
                onClick={() => setOpen(false)}
              >
                {brand}
                <span className="text-accent">.</span>
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-full hover:bg-muted"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="shell flex flex-1 flex-col justify-center gap-2"
            >
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-border py-5 font-serif text-5xl tracking-tight"
                  >
                    {link.label}
                    <span className="label-mono">0{index + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell flex items-center justify-between border-t border-border py-6">
              <a
                href={`mailto:${email}`}
                className="text-sm link-quiet"
                onClick={() => setOpen(false)}
              >
                {email}
              </a>
              <span className="label-mono">CPH</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
