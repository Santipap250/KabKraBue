interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: string;
  titleThai?: string;
  align?: "left" | "center";
}

export function SectionHeading({ index, eyebrow, title, titleThai, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div
        className={`flex items-baseline gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        {index && <span className="font-mono text-xs text-clay">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="heading-display mt-3 text-4xl text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {titleThai && (
        <p className="mt-2 font-body text-lg text-ink/60">{titleThai}</p>
      )}
    </div>
  );
}
