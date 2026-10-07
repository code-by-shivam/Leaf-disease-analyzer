import { Card } from "@/components/ui/card";
import { pipelineSteps } from "@/data/pipeline";
import SectionHeader from "../layout/SectionHeader";

function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="From leaf image to analysis"
          description="The system processes the uploaded image through a sequence of digital image-processing modules to generate visual and quantitative results."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pipelineSteps.map(({ number, title, description, icon: Icon }) => (
            <li key={number}>
              <Card className="group h-full p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-semibold text-primary/60">
                    {number}
                  </span>

                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-4" />
                  </div>
                </div>

                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
