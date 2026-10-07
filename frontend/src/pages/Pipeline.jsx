import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import ProcessingPipeline from "../components/pipeline/ProcessingPipeline";
import { Card } from "@/components/ui/card";

const flow = [
  "Image",
  "Preprocessing",
  "Enhancement",
  "Segmentation",
  "Detection",
  "Analysis",
  "Results",
];

function Pipeline() {
  return (
    <PageContainer size="lg">
      <SectionHeader
        as="h1"
        eyebrow="Digital image processing"
        title="Image processing pipeline"
        description="Explore the complete sequence of digital image-processing operations used by the Plant Leaf Disease Analyzer to transform an uploaded leaf image into visual and quantitative results."
        className="max-w-3xl"
      />

      <ProcessingPipeline />

      {/* Flow summary */}
      <Card className="mt-12 p-5 sm:mt-14 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckCircle2 className="size-5" />
          </div>

          <div className="min-w-0">
            <h2 className="font-sans text-base font-semibold tracking-normal">
              Complete processing flow
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The stages work together as a structured pipeline. Each stage
              produces information that is used by the following stage to
              generate the final analysis.
            </p>
          </div>
        </div>

        <ol className="mt-5 flex flex-wrap items-center gap-2 text-sm font-medium">
          {flow.map((label, index) => (
            <li key={label} className="flex items-center gap-2">
              <span className="rounded-lg bg-muted px-3 py-2">{label}</span>
              {index < flow.length - 1 && (
                <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
              )}
            </li>
          ))}
        </ol>
      </Card>

      {/* Note */}
      <div className="mt-6 flex items-start gap-4 rounded-2xl border bg-muted/40 p-5 sm:p-6">
        <Info className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal">
            About the analysis
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The system identifies potential abnormal visual regions using
            image-processing techniques. These regions are indicators generated
            from the image and should not be considered a definitive plant
            disease diagnosis.
          </p>
        </div>
      </div>

      {/* CTA */}
      <section className="mt-10 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl">Ready to analyze a leaf?</h2>

            <p className="mt-2 text-sm leading-6 text-primary-foreground/80">
              Upload an image and run it through the complete digital
              image-processing pipeline.
            </p>
          </div>

          <Link
            to="/analyzer"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-6 font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Start Analysis
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}

export default Pipeline;
