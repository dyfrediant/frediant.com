"use client";

import { useRef, useState } from "react";
import { ImagePlusIcon, Loader2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ImageUpload({
  name,
  label = "Image",
  defaultValue,
  square = false,
}: {
  name: string;
  label?: string;
  defaultValue?: string | null;
  square?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Upload failed.");
      }
      const data = (await response.json()) as { url: string };
      setValue(data.url);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="field-label">{label}</p>

      <input type="hidden" name={name} value={value} />

      {value ? (
        <div
          className={cn(
            "group relative overflow-hidden rounded-md border border-border bg-muted",
            square ? "aspect-square" : "aspect-[16/9]",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Selected cover preview"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/70 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-within:opacity-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Remove image"
              onClick={() => setValue("")}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-input bg-muted/30 text-muted-foreground transition-colors hover:border-ring hover:bg-muted/60",
            square ? "aspect-square" : "aspect-[16/9]",
          )}
        >
          {uploading ? (
            <Loader2Icon className="size-5 animate-spin" />
          ) : (
            <ImagePlusIcon className="size-5" />
          )}
          <span className="text-xs">
            {uploading ? "Uploading…" : "Upload an image"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
            JPG, PNG, WebP, AVIF — 5MB
          </span>
        </button>
      )}

      <div className="mt-3">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="/covers/example.svg or https://…"
          aria-label={`${label} URL`}
          className="text-xs"
        />
        <p className="mt-1.5 text-[11px] text-muted-foreground">
          Upload a file, or paste a local path or image URL.
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        aria-label={`Upload ${label.toLowerCase()} file`}
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </div>
  );
}
