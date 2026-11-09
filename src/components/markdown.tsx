import { renderMarkdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";

export async function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const html = await renderMarkdown(content);

  return (
    <div
      className={cn("article", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
