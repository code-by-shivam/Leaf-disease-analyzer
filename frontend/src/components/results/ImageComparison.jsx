import { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SectionHeader from "../layout/SectionHeader";

function ImageComparison({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const selectedImage = images[selectedIndex];
  const last = images.length - 1;

  const go = (direction) =>
    setSelectedIndex((index) => Math.min(Math.max(index + direction, 0), last));

  return (
    <section id="compare" className="mt-12 scroll-mt-28 sm:mt-14">
      <SectionHeader
        eyebrow="Image viewer"
        title="Compare processing outputs"
        description="Select a processing stage to inspect its generated image output in detail."
      />

      <Card className="mt-6 overflow-hidden">
        {/* Main image */}
        <div className="relative flex min-h-[260px] items-center justify-center bg-muted/40 p-3 sm:min-h-[420px] sm:p-6">
          {selectedImage?.imageUrl ? (
            <img
              key={selectedImage.title}
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="max-h-[320px] max-w-full rounded-lg object-contain animate-in fade-in-0 duration-200 sm:max-h-[500px]"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <ImageIcon className="mx-auto size-10" />
              <p className="mt-3 text-sm">Image unavailable</p>
            </div>
          )}

          {/* Prev / next */}
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={selectedIndex === 0}
            aria-label="Previous stage"
            className="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur transition-opacity hover:bg-background disabled:opacity-30 sm:left-4"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={selectedIndex === last}
            aria-label="Next stage"
            className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur transition-opacity hover:bg-background disabled:opacity-30 sm:right-4"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Info */}
        <div className="border-t p-4 sm:p-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold">{selectedImage?.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedImage?.description}
              </p>
            </div>

            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Thumbnails: horizontal scroll on phones, grid on larger screens */}
        <div className="border-t p-3 sm:p-4">
          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
            {images.map((image, index) => (
              <button
                key={image.title}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedIndex === index}
                className={cn(
                  "w-32 shrink-0 snap-start rounded-xl border p-2 text-left transition-all sm:w-auto",
                  selectedIndex === index
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:bg-muted"
                )}
              >
                <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-muted">
                  {image.imageUrl ? (
                    <img
                      src={image.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="size-5 text-muted-foreground" />
                  )}
                </div>

                <p className="mt-2 line-clamp-2 text-xs font-medium">
                  {image.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}

export default ImageComparison;
