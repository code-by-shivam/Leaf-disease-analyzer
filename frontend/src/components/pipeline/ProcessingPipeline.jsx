import { CheckCircle2 } from "lucide-react";

import { pipelineSteps } from "@/data/pipeline";
import SectionHeader from "../layout/SectionHeader";

function ProcessingPipeline({ className = "mt-12 sm:mt-14" }) {
  return (
    <section className={className}>
      <SectionHeader
        eyebrow="Processing pipeline"
        title="Digital image processing workflow"
        description="The uploaded image passes through a sequence of digital image-processing modules before the final results are generated."
      />

      <ol className="relative mt-8 space-y-4">
        {/* vertical connector, aligned with the icon column */}
        <span
          className="absolute bottom-6 left-[1.9rem] top-6 hidden w-px bg-border sm:block"
          aria-hidden
        />

        {pipelineSteps.map(({ number, title, description, icon: Icon }) => (
          <li
            key={number}
            className="relative flex gap-4 rounded-2xl border bg-card p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5"
          >
            <div className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-4 border-card bg-primary/10 text-primary ring-1 ring-primary/20">
              <Icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold">{title}</h3>

                <span className="text-xs font-medium tracking-wide text-muted-foreground">
                  MODULE {number}
                </span>
              </div>

              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>

            <CheckCircle2 className="mt-1 hidden size-5 shrink-0 text-primary/70 sm:block" />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ProcessingPipeline;
