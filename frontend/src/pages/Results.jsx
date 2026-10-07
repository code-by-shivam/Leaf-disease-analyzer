import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    AlertCircle,
    ArrowLeft,
    Loader2,
} from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/layout/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AIDiseaseAnalysis from "../components/results/AIDiseaseAnalysis";
import { getAnalysisResult } from "../services/api";
import ResultSummary from "../components/results/ResultSummary";
import QuantitativeAnalysis from "../components/results/QuantitativeAnalysis";
import ImageComparison from "../components/results/ImageComparison";
import ImageResultCard from "../components/results/ImageResultCard";

function Results() {
    const { id } = useParams();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ================= LOAD RESULT =================
    useEffect(() => {
        async function loadResult() {
            try {
                setLoading(true);
                setError("");

                const data = await getAnalysisResult(id);

                setResult(data);
            } catch (err) {
                console.error("Failed to load result:", err);

                setError(
                    err.message || "Unable to load analysis result."
                );
            } finally {
                setLoading(false);
            }
        }

        loadResult();
    }, [id]);

    // ================= LOADING STATE =================
    if (loading) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="text-center" role="status">
                    <Loader2 className="mx-auto size-8 animate-spin text-primary" />

                    <h2 className="mt-4 font-sans text-lg font-semibold tracking-normal">
                        Loading analysis result
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Fetching result #{id}...
                    </p>
                </div>
            </main>
        );
    }

    // ================= ERROR STATE =================
    if (error || !result) {
        return (
            <main className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center px-4 py-10">
                <Card className="w-full p-6 text-center sm:p-8">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10">
                        <AlertCircle className="size-6 text-destructive" />
                    </div>

                    <h1 className="mt-5 text-2xl">Analysis result not found</h1>

                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {error || "Unable to load this analysis result."}
                    </p>

                    <Link
                        to="/analyzer"
                        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
                    >
                        <ArrowLeft className="size-4" />
                        Back to Analyzer
                    </Link>
                </Card>
            </main>
        );
    }

    // ================= PROCESSING RESULT IMAGES =================
    const imageResults = [
        {
            moduleNumber: "01",
            title: "Original Image",
            description:
                "Original uploaded plant leaf image.",
            imageUrl:
                result.image_url || result.image,
        },
        {
            moduleNumber: "02",
            title: "Preprocessed Image",
            description:
                "Resized and denoised image.",
            imageUrl:
                result.processed_image_url ||
                result.processed_image,
        },
        {
            moduleNumber: "03",
            title: "Enhanced Image",
            description:
                "Contrast-enhanced image generated during color processing.",
            imageUrl:
                result.enhanced_image_url ||
                result.enhanced_image,
        },
        {
            moduleNumber: "04",
            title: "Leaf Segmentation",
            description:
                "Binary mask representing the segmented target leaf.",
            imageUrl:
                result.leaf_mask_url ||
                result.leaf_mask,
        },
        {
            moduleNumber: "05",
            title: "Edge Detection",
            description:
                "Structural boundaries detected using edge detection.",
            imageUrl:
                result.edge_image_url ||
                result.edge_image,
        },
        {
            moduleNumber: "06",
            title: "Potential Disease Regions",
            description:
                "Potential abnormal regions detected using color-based analysis.",
            imageUrl:
                result.disease_mask_url ||
                result.disease_mask,
        },
    ];

    const sections = [
        { id: "summary", label: "Summary" },
        { id: "ai-analysis", label: "AI Analysis" },
        { id: "quantitative", label: "Quantitative" },
        { id: "compare", label: "Compare" },
        { id: "outputs", label: "Outputs" },
    ];

    return (
        <PageContainer>

            {/* ================= HEADER ================= */}
            <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        Analysis result
                    </p>

                    <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl">
                        Plant leaf analysis
                    </h1>

                    <p className="mt-3 inline-flex rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
                        Result ID: #{result.id}
                    </p>
                </div>

                <Link
                    to="/analyzer"
                    className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full sm:w-auto"
                    )}
                >
                    <ArrowLeft className="size-4" />
                    Analyze Another Image
                </Link>

            </section>

            {/* ================= SECTION NAV ================= */}
            <nav
                aria-label="Result sections"
                className="sticky top-16 z-30 -mx-4 mt-6 border-b bg-background/90 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
            >
                <ul className="flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {sections.map((section) => (
                        <li key={section.id} className="shrink-0">
                            <a
                                href={`#${section.id}`}
                                className="inline-flex rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ================= SUMMARY ================= */}
            <section id="summary" className="mt-8 scroll-mt-28">
                <ResultSummary result={result} />
            </section>

            <AIDiseaseAnalysis result={result} />

            <QuantitativeAnalysis result={result} />

            <ImageComparison images={imageResults} />

            {/* ================= VISUAL OUTPUTS ================= */}
            <section id="outputs" className="mt-12 scroll-mt-28 sm:mt-14">

                <SectionHeader
                    eyebrow="Visual outputs"
                    title="Processing results"
                    description="Visual outputs generated at different stages of the digital image-processing pipeline."
                />

                <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {imageResults.map((item) => (
                        <ImageResultCard
                            key={item.title}
                            moduleNumber={item.moduleNumber}
                            title={item.title}
                            description={item.description}
                            imageUrl={item.imageUrl}
                        />
                    ))}
                </div>

            </section>

            {/* ================= DISCLAIMER ================= */}
            <section className="mt-10 flex items-start gap-3 rounded-2xl border bg-muted/40 p-4 sm:p-5">
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />

                <p className="text-sm leading-6 text-muted-foreground">
                    <strong className="text-foreground">Important:</strong>{" "}
                    The detected regions are potential visual indicators generated
                    through image-processing techniques. They should not be
                    interpreted as a definitive plant disease diagnosis.
                </p>
            </section>

        </PageContainer>
    );
}

export default Results;
