import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-xs",
        className
      )}
      {...props}
    />
  );
}

export { Card };
