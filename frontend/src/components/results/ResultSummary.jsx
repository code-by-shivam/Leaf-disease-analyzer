import { Activity, ImageIcon, ScanSearch, Percent } from "lucide-react";

import { Card } from "@/components/ui/card";

function ResultSummary({ result }) {
  const cards = [
    {
      title: "Leaf Pixels",
      value: result.leaf_pixel_count?.toLocaleString() ?? "—",
      icon: ImageIcon,
    },
    {
      title: "Potential Disease Pixels",
      value: result.disease_pixel_count?.toLocaleString() ?? "—",
      icon: ScanSearch,
    },
    {
      title: "Potentially Affected Area",
      value:
        result.affected_area_percentage !== undefined &&
        result.affected_area_percentage !== null
          ? `${Number(result.affected_area_percentage).toFixed(2)}%`
          : "—",
      icon: Percent,
      highlight: true,
    },
    {
      title: "Image Resolution",
      value:
        result.width && result.height ? `${result.width} × ${result.height}` : "—",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {cards.map(({ title, value, icon: Icon, highlight }) => (
        <Card
          key={title}
          className={
            highlight
              ? "border-primary/30 bg-primary/5 p-4 sm:p-5"
              : "p-4 sm:p-5"
          }
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
              {title}
            </p>
            <Icon className="size-4 shrink-0 text-primary sm:size-5" />
          </div>

          <p className="mt-3 break-words font-heading text-xl font-semibold sm:text-3xl">
            {value}
          </p>
        </Card>
      ))}
    </div>
  );
}

export default ResultSummary;
