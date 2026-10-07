import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { pipelineSteps } from "@/data/pipeline";
import { cn } from "@/lib/utils";

// The first seven modules run on the backend; visualization happens on the results page.
const steps = pipelineSteps.slice(0, 7);

/**
 * Visual progress indicator. The backend returns a single response, so the
 * highlighted step advances on a timer and holds on the last one until done.
 */
function ProcessingStatus() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((index) => Math.min(index + 1, steps.length - 1));
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const progress = Math.round(((activeIndex + 1) / steps.length) * 100);

  return (
    <Card className="mt-8 p-5 sm:p-6" role="status" aria-live="polite">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Loader2 className="size-5 animate-spin" />
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-sans text-base font-semibold tracking-normal">
            Processing image
          </h2>
          <p className="text-sm text-muted-foreground">
            Running the Digital Image Processing pipeline...
          </p>
        </div>

        <span className="shrink-0 text-sm font-semibold text-primary">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="mt-5 space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const done = index < activeIndex;
          const active = index === activeIndex;

          return (
            <li
              key={step.title}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3 transition-colors sm:gap-4 sm:p-4",
                active && "border-primary/40 bg-primary/5",
                done && "bg-muted/40"
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  done || active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {done ? <Check className="size-4" /> : <Icon className="size-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{step.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.short}</p>
              </div>

              {active && (
                <Loader2 className="size-4 shrink-0 animate-spin text-primary" />
              )}
            </li>
          );
        })}
      </ol>

      <p className="mt-5 rounded-xl bg-muted/50 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Please wait:</strong> the backend is
        processing the complete analysis. You will be redirected to the results
        once it is finished.
      </p>
    </Card>
  );
}

export default ProcessingStatus;
