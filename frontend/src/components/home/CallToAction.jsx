import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
        <div
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Ready to analyze a leaf?</h2>

          <p className="mt-4 text-sm leading-7 text-primary-foreground/80 sm:text-base">
            Upload a JPG or PNG image and watch it move through the complete
            digital image-processing pipeline.
          </p>

          <Link
            to="/analyzer"
            className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-background px-6 text-base font-medium text-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            Start Analysis
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
