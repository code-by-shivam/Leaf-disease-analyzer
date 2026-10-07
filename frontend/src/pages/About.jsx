import { AlertCircle, BarChart3, Leaf, Target, Workflow } from "lucide-react";

import PageContainer from "../components/layout/PageContainer";
import { Card } from "@/components/ui/card";
import { pipelineSteps } from "@/data/pipeline";

const analyzed = [
  "Uploaded plant leaf image",
  "Leaf region and background",
  "Potential abnormal color regions",
  "Pixel-level affected area",
];

function IconBadge({ icon: Icon }) {
  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
      <Icon className="size-5" />
    </div>
  );
}

function About() {
  return (
    <PageContainer size="lg">
      {/* Introduction */}
      <section className="text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Leaf className="size-7" />
        </div>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          About the project
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl">
          Plant Leaf Disease Analyzer
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          Plant Leaf Disease Analyzer is a Digital Image Processing based
          project that analyzes plant leaf images to identify potential
          abnormal visual regions and calculate the potentially affected area of
          the leaf.
        </p>
      </section>

      {/* Objective */}
      <section className="mt-14 grid gap-8 sm:mt-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <IconBadge icon={Target} />

          <h2 className="mt-5 text-2xl sm:text-3xl">Project objective</h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The main objective of this project is to apply Digital Image
            Processing techniques to plant leaf images and generate a
            transparent visual and quantitative analysis.
          </p>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The system processes the image through multiple stages such as
            preprocessing, enhancement, segmentation, edge detection, potential
            disease region detection, morphological processing, and quantitative
            analysis.
          </p>
        </div>

        <Card className="self-start p-5 sm:p-6">
          <h3 className="font-semibold">What the system analyzes</h3>

          <ul className="mt-5 space-y-4">
            {analyzed.map((item) => (
              <li key={item} className="flex gap-3 text-sm">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Modules */}
      <section className="mt-14 sm:mt-16">
        <div className="max-w-3xl">
          <IconBadge icon={Workflow} />

          <h2 className="mt-5 text-2xl sm:text-3xl">How our project works</h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            The uploaded plant leaf image passes through a sequence of Digital
            Image Processing modules. Each stage performs a specific operation
            and contributes to the final analysis.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipelineSteps.map(({ number, title, description }) => (
            <li key={number}>
              <Card className="h-full p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-semibold text-primary/60">
                    {number}
                  </span>
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    MODULE
                  </span>
                </div>

                <h3 className="mt-4 font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* Output */}
      <Card className="mt-14 p-5 sm:mt-16 sm:p-8">
        <div className="flex items-start gap-4">
          <IconBadge icon={BarChart3} />

          <div className="min-w-0">
            <h2 className="text-2xl">Project output</h2>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              The system presents the intermediate image processing outputs
              along with quantitative measurements calculated from the segmented
              leaf and detected potential abnormal regions.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Visual results</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Processed, enhanced, segmented, edge-detected and disease-region
              images.
            </p>
          </div>

          <div className="rounded-xl border bg-muted/40 p-4">
            <p className="text-sm font-medium">Quantitative results</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Leaf pixels, potential disease-region pixels and potentially
              affected area.
            </p>
          </div>
        </div>
      </Card>

      {/* Limitation */}
      <div className="mt-6 flex items-start gap-4 rounded-2xl border bg-muted/40 p-5 sm:p-6">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

        <div>
          <h2 className="font-sans text-base font-semibold tracking-normal">
            Project limitation
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            The detected regions are potential visual indicators generated
            through Digital Image Processing techniques. They should not be
            interpreted as a definitive plant disease diagnosis.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

export default About;
