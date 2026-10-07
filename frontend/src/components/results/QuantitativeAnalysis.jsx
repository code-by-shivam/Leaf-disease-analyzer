import { BarChart3, Percent } from "lucide-react";

import { Card } from "@/components/ui/card";
import SectionHeader from "../layout/SectionHeader";

function QuantitativeAnalysis({ result }) {
  const leafPixels = result.leaf_pixel_count ?? 0;
  const diseasePixels = result.disease_pixel_count ?? 0;
  const affectedPercentage = Number(result.affected_area_percentage ?? 0);
  const safePercentage = Math.min(Math.max(affectedPercentage, 0), 100);

  return (
    <section id="quantitative" className="mt-12 scroll-mt-28 sm:mt-14">
      <SectionHeader
        eyebrow="Quantitative analysis"
        title="Pixel-level analysis"
        description="Quantitative measurements calculated from the segmented leaf and detected potential abnormal regions."
      />

      <Card className="mt-6 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted">
              <Percent className="size-5" />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold">Potentially affected area</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Percentage of detected potential abnormal pixels relative to the
                segmented leaf area.
              </p>
            </div>
          </div>

          <span className="shrink-0 font-heading text-2xl font-semibold text-primary sm:text-4xl">
            {affectedPercentage.toFixed(2)}%
          </span>
        </div>

        <div
          className="mt-6 sm:mt-8"
          role="progressbar"
          aria-valuenow={safePercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Potentially affected area"
        >
          <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
              style={{
                width: `${safePercentage}%`,
                minWidth: safePercentage > 0 ? "8px" : "0px",
              }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </Card>

      <div className="mt-6 flex items-start gap-4 rounded-2xl border bg-muted/40 p-5 sm:p-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background shadow-xs">
          <BarChart3 className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">Calculation</h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The potentially affected area is calculated using the ratio of
            detected potential abnormal pixels to the total segmented leaf
            pixels.
          </p>

          <div className="mt-4 space-y-3 overflow-x-auto rounded-xl border bg-background p-4 font-mono text-xs sm:text-sm">
            <p className="whitespace-nowrap">
              (Potential Disease Pixels ÷ Leaf Pixels) × 100
            </p>
            <p className="whitespace-nowrap text-muted-foreground">
              ({diseasePixels.toLocaleString()} ÷ {leafPixels.toLocaleString()}) ×
              100
            </p>
            <p className="whitespace-nowrap font-semibold text-primary">
              = {affectedPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuantitativeAnalysis;
