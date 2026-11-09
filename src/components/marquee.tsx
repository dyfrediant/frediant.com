const items = [
  "Product design",
  "Front-end engineering",
  "Design systems",
  "Motion",
  "Typography",
  "Prototyping",
];

export function Marquee() {
  return (
    <div className="marquee border-y border-border py-4" aria-hidden>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((item) => (
              <div key={`${copy}-${item}`} className="flex items-center">
                <span className="label-mono px-6 text-foreground/75 md:px-10">
                  {item}
                </span>
                <span className="text-xs text-accent">✳</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
