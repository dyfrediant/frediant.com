export function Availability({ label }: { label: string }) {
  if (!label) return null;

  return (
    <p className="label-mono inline-flex items-center gap-2.5">
      <span className="relative flex size-2">
        <span className="absolute inset-0 rounded-full bg-accent" />
      </span>
      {label}
    </p>
  );
}
