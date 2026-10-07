import { Maximize2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function ImageResultCard({ title, description, imageUrl, moduleNumber }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Image unavailable
          </div>
        )}

        {moduleNumber && (
          <div className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur">
            MODULE {moduleNumber}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-semibold tracking-tight">{title}</h3>

        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        {imageUrl && (
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" className="mt-4 w-full">
                  <Maximize2 className="size-4" />
                  View Image
                </Button>
              }
            />

            <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-5xl">
              <DialogHeader className="pr-8">
                <DialogTitle>
                  {moduleNumber ? `Module ${moduleNumber} — ${title}` : title}
                </DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>

              <div className="flex items-center justify-center overflow-hidden rounded-lg bg-muted/40 p-2 sm:p-3">
                <img
                  src={imageUrl}
                  alt={title}
                  className="max-h-[65vh] max-w-full object-contain sm:max-h-[70vh]"
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
}

export default ImageResultCard;
