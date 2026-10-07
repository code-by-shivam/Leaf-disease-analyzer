import { useState } from "react";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { uploadLeafImage } from "../services/api";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import ImageUploader from "../components/analyzer/ImageUploader";
import ImagePreview from "../components/analyzer/ImagePreview";
import AnalyzeButton from "../components/analyzer/AnalyzeButton";
import ProcessingStatus from "../components/analyzer/ProcessingStatus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const tips = [
  "Use a well-lit, in-focus photo",
  "Keep a single leaf in the frame",
  "A plain background works best",
];

function Analyzer() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setIsAnalyzing(false);
    setError("");
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setIsAnalyzing(false);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      setError("");
      setIsAnalyzing(true);

      const result = await uploadLeafImage(selectedFile);

      navigate(`/results/${result.id}`, { state: { result } });
    } catch (err) {
      console.error("Analysis failed:", err);
      setError(err.message || "Something went wrong while analyzing the image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <PageContainer size="md" className="max-w-4xl">
      <SectionHeader
        as="h1"
        align="center"
        eyebrow="Image analyzer"
        title="Analyze your plant leaf"
        description="Upload a plant leaf image and process it through our digital image-processing pipeline."
        className="max-w-3xl"
      />

      <div className="mt-8 sm:mt-10">
        {/* Upload */}
        {!selectedFile && !isAnalyzing && (
          <>
            <ImageUploader onImageSelect={handleImageSelect} />

            <ul className="mt-6 grid gap-2 sm:grid-cols-3">
              {tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-primary" />
                  {tip}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Preview + actions */}
        {selectedFile && (
          <div className="space-y-4 sm:space-y-5">
            <ImagePreview file={selectedFile} onRemove={handleRemove} />

            {error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="font-medium">Analysis failed</p>
                  <p className="mt-1 leading-6">{error}</p>
                </div>
              </div>
            )}

            <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-medium">Image ready for analysis</p>
                  <p className="text-xs text-muted-foreground">
                    {isAnalyzing
                      ? "Processing your image..."
                      : "Start the digital image-processing pipeline."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleRemove}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto"
                >
                  <ArrowLeft className="size-4" />
                  Change Image
                </Button>

                <AnalyzeButton onClick={handleAnalyze} loading={isAnalyzing} />
              </div>
            </Card>
          </div>
        )}
      </div>

      {isAnalyzing && <ProcessingStatus />}
    </PageContainer>
  );
}

export default Analyzer;
