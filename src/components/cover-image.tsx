import Image from "next/image";
import { cn } from "@/lib/utils";

type CoverImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CoverImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: CoverImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--muted),var(--muted)_10px,var(--background)_10px,var(--background)_20px)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isLocal = src.startsWith("/");
  const isUnsplash = src.startsWith("https://images.unsplash.com");

  if (isLocal || isUnsplash) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={src.endsWith(".svg")}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}
