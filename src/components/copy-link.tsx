"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyLink({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "label-mono inline-flex items-center gap-2 text-foreground transition-colors hover:text-accent",
        className,
      )}
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-accent" />
      ) : (
        <LinkIcon className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy link"}
    </button>
  );
}
