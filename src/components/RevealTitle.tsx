export default function RevealTitle({
  text,
  className = "",
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <h2 className={`scroll-anim title-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="reveal-word" style={{ transitionDelay: `${baseDelay + i * 0.07}s` }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
