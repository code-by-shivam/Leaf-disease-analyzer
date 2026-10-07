import {
  Activity,
  AlertCircle,
  Bug,
  CheckCircle2,
  Leaf,
  Lightbulb,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionHeader from "../layout/SectionHeader";

function severityStyle(severity) {
  const value = String(severity).toLowerCase();

  if (/(high|severe|critical)/.test(value))
    return "bg-red-100 text-red-800 border-red-200";
  if (/(moderate|medium)/.test(value))
    return "bg-amber-100 text-amber-800 border-amber-200";
  if (/(low|mild|none|healthy)/.test(value))
    return "bg-green-100 text-green-800 border-green-200";

  return "bg-muted text-muted-foreground";
}

function InfoList({ icon: Icon, title, items, empty }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-6">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted-foreground">{empty}</p>
      )}
    </Card>
  );
}

function AIDiseaseAnalysis({ result }) {
  const disease = result?.ai_disease || "Unknown";
  const plant = result?.ai_plant || "Unknown";
  const confidence = Number(result?.ai_confidence ?? 0);
  const severity = result?.ai_severity || "Unknown";

  const symptoms = Array.isArray(result?.ai_symptoms) ? result.ai_symptoms : [];
  const causes = Array.isArray(result?.ai_possible_causes)
    ? result.ai_possible_causes
    : [];
  const recommendation = result?.ai_recommendation || "";

  const hasPrediction = disease !== "Unknown" && confidence > 0;
  const safeConfidence = Math.min(Math.max(confidence, 0), 100);

  return (
    <section id="ai-analysis" className="mt-12 scroll-mt-28 sm:mt-14">
      <SectionHeader
        eyebrow="AI disease analysis"
        title="Disease prediction"
        description="AI-based analysis of the uploaded plant leaf image."
      />

      <Card className="mt-6 p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-stretch">
          {/* Plant */}
          <div className="flex items-start gap-4 rounded-xl border bg-muted/30 p-4 sm:p-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Leaf className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Detected plant
              </p>
              <h3 className="mt-1 break-words text-lg font-semibold sm:text-xl">
                {plant}
              </h3>
            </div>
          </div>

          {/* Disease */}
          <div className="flex items-start gap-4 rounded-xl border bg-muted/30 p-4 sm:p-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bug className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Potential disease
              </p>
              <h3 className="mt-1 break-words text-lg font-semibold sm:text-xl">
                {disease}
              </h3>
            </div>
          </div>

          {/* Confidence */}
          <div className="rounded-xl border bg-primary px-6 py-4 text-primary-foreground lg:min-w-40">
            <p className="text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
              Confidence
            </p>
            <p className="mt-1 font-heading text-3xl font-semibold">
              {confidence.toFixed(0)}%
            </p>
          </div>
        </div>

        {hasPrediction && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Prediction confidence</span>
              <span className="text-muted-foreground">
                {confidence.toFixed(0)}%
              </span>
            </div>

            <div
              className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={safeConfidence}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Prediction confidence"
            >
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${safeConfidence}%` }}
              />
            </div>
          </div>
        )}

        {/* Severity */}
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border p-4">
          <Activity className="size-5 shrink-0 text-primary" />

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Estimated severity
            </p>
          </div>

          <span
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-semibold",
              severityStyle(severity)
            )}
          >
            {severity}
          </span>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
        <InfoList
          icon={AlertCircle}
          title="Observed symptoms"
          items={symptoms}
          empty="No symptoms were returned by the AI analysis."
        />
        <InfoList
          icon={Bug}
          title="Possible causes"
          items={causes}
          empty="No possible causes were returned."
        />
      </div>

      {recommendation && (
        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-xs">
            <Lightbulb className="size-5" />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold">AI recommendation</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {recommendation}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-start gap-3 rounded-2xl border bg-muted/40 p-4 sm:p-5">
        <AlertCircle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

        <p className="text-sm leading-6 text-muted-foreground">
          <strong className="text-foreground">Important:</strong> This is an
          AI-based visual prediction and should not be considered a definitive
          plant disease diagnosis. The prediction depends on the image quality,
          training data, and model behavior.
        </p>
      </div>
    </section>
  );
}

export default AIDiseaseAnalysis;
