import { useRef, useState } from "react";
import { ImagePlus, Upload, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function ImageUploader({ onImageSelect }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a JPG, JPEG, or PNG image.");
      return;
    }

    setError("");
    onImageSelect(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "rounded-2xl border-2 border-dashed bg-card p-6 text-center transition-colors sm:p-12",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30 hover:border-primary/60"
        )}
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          {isDragging ? <Upload className="size-8" /> : <ImagePlus className="size-8" />}
        </div>

        <h3 className="mt-5 text-lg font-semibold">Upload leaf image</h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          <span className="hidden sm:inline">
            Drag and drop your image here, or choose one from your device.
          </span>
          <span className="sm:hidden">
            Choose an image from your device or take a photo of the leaf.
          </span>
        </p>

        <Button
          type="button"
          size="lg"
          onClick={() => inputRef.current?.click()}
          className="mt-6 w-full sm:w-auto"
        >
          <Upload className="size-4" />
          Choose Image
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Supported formats: JPG, JPEG, PNG
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={(event) => {
            handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
          className="hidden"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default ImageUploader;
