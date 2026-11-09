"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { EyeIcon, PencilLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarkdownEditor({
  name,
  defaultValue = "",
  id,
}: {
  name: string;
  defaultValue?: string;
  id?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"write" | "preview">("write");

  const words = value
    .replace(/[#>*_`[\]()-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-md border border-input bg-background">
      <div className="flex items-center border-b border-border bg-muted/40">
        <button
          type="button"
          onClick={() => setMode("write")}
          aria-pressed={mode === "write"}
          className={cn(
            "inline-flex items-center gap-1.5 border-r border-border px-3.5 py-2 text-xs transition-colors",
            mode === "write"
              ? "bg-background text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <PencilLineIcon className="size-3.5" />
          Write
        </button>
        <button
          type="button"
          onClick={() => setMode("preview")}
          aria-pressed={mode === "preview"}
          className={cn(
            "inline-flex items-center gap-1.5 border-r border-border px-3.5 py-2 text-xs transition-colors",
            mode === "preview"
              ? "bg-background text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <EyeIcon className="size-3.5" />
          Preview
        </button>
        <span className="label-mono ml-auto px-3.5">
          {words} {words === 1 ? "word" : "words"}
        </span>
      </div>

      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        spellCheck
        className={cn(
          "min-h-[440px] w-full resize-y bg-transparent p-4 font-mono text-[0.8125rem] leading-relaxed outline-none placeholder:text-muted-foreground/60",
          mode !== "write" && "hidden",
        )}
        placeholder="Write in Markdown. Headings, lists, links, quotes, and code blocks are supported."
      />

      {mode === "preview" && (
        <div className="min-h-[440px] max-h-[720px] overflow-y-auto p-6">
          {value.trim() ? (
            <div className="article text-[0.95rem]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nothing to preview yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
