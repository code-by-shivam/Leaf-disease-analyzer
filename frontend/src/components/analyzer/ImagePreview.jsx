import { useEffect, useState } from "react";
import { ImageIcon, X } from "lucide-react";

import { Card } from "@/components/ui/card";

function formatSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function ImagePreview({ file, onRemove }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setImageUrl(null);
      return undefined;
    }

    const nextImageUrl = URL.createObjectURL(file);
    setImageUrl(nextImageUrl);

    return () => {
      URL.revokeObjectURL(nextImageUrl);
    };
  }, [file]);

  if (!file) return null;

  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <ImageIcon className="size-5 shrink-0 text-primary" />
          <h3 className="font-semibold">Selected image</h3>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg hover:bg-muted"
          aria-label="Remove image"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border bg-muted/40">
        <img
          src={imageUrl}
          alt="Selected plant leaf"
          className="mx-auto max-h-[60vh] w-full object-contain sm:max-h-[500px]"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-medium">{file.name}</p>
        <p className="shrink-0 text-xs text-muted-foreground">
          {formatSize(file.size)}
        </p>
      </div>
    </Card>
  );
}

export default ImagePreview;
