import { ImageIcon, ScanSearch, BarChart3, Eye } from "lucide-react";

import { Card } from "@/components/ui/card";
import SectionHeader from "../layout/SectionHeader";

const features = [
  {
    icon: ImageIcon,
    title: "Image Processing",
    description: "Resize, denoise and enhance the uploaded plant leaf image.",
  },
  {
    icon: ScanSearch,
    title: "Region Detection",
    description:
      "Identify potential abnormal regions using color-based image analysis.",
  },
  {
    icon: BarChart3,
    title: "Quantitative Analysis",
    description:
      "Calculate leaf pixels, detected pixels and potentially affected area.",
  },
  {
    icon: Eye,
    title: "Transparent Results",
    description:
      "Inspect the output of each stage side by side with the original.",
  },
];

function Features() {
  return (
    <section className="border-y bg-muted/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          eyebrow="Key features"
          title="Transparent image analysis"
          description="Every major processing stage can be visualized and understood."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold">{title}</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
