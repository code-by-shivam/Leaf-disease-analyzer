import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LeafScanVisual from "./LeafScanVisual";

const stats = [
  { value: "8", label: "Processing modules" },
  { value: "6", label: "Visual outputs" },
  { value: "Pixel", label: "Level measurement" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-leaf-grid absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-28">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-xs font-medium shadow-xs sm:text-sm">
            <Leaf className="size-4 text-primary" />
            <span>Digital Image Processing Project</span>
          </div>

          <h1 className="text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            See what&apos;s hiding on a{" "}
            <span className="text-primary">plant leaf</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
            Upload a leaf image, isolate the leaf, detect potential abnormal
            regions and measure the potentially affected area — with every
            processing stage visible.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/analyzer" className={cn(buttonVariants({ size: "lg" }))}>
              Start Analysis
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/pipeline"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Explore Pipeline
            </Link>
          </div>

          <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 border-t pt-6 lg:mx-0">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs leading-4 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <LeafScanVisual />
      </div>
    </section>
  );
}

export default Hero;
