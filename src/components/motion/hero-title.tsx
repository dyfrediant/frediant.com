export function HeroTitle({ headline }: { headline: string }) {
  const words = headline.split(" ");

  return (
    <h1 className="display-xl text-balance">
      {words.map((word, index) => {
        const isLast = index === words.length - 1;
        return (
          <span
            key={`${word}-${index}`}
            className={isLast ? "italic text-accent" : undefined}
          >
            {word}
            {!isLast ? " " : ""}
          </span>
        );
      })}
    </h1>
  );
}
