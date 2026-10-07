import { cn } from "@/lib/utils";

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className = "",
}) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      )}

      <Heading
        className={cn(
          "mt-2 text-2xl sm:text-3xl",
          Heading === "h1" && "text-3xl sm:text-4xl lg:text-5xl"
        )}
      >
        {title}
      </Heading>

      {description && (
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
