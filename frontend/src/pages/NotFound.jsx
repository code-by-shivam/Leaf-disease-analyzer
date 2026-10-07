import { Leaf, ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-lg text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Leaf className="size-8" />
        </div>

        <p className="mt-6 font-heading text-7xl font-semibold tracking-tight text-primary/80 sm:text-8xl">
          404
        </p>

        <h1 className="mt-3 text-2xl sm:text-3xl">Page not found</h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          The page you are looking for does not exist or may have been moved to
          another location.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className={cn(buttonVariants({ size: "lg" }))}>
            <Home className="size-4" />
            Go to Home
          </Link>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
