import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "Analyzer", path: "/analyzer" },
  { name: "About", path: "/about" },
];

function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">Plant Leaf Disease Analyzer</p>
              <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                A Digital Image Processing project that highlights potential
                abnormal regions on plant leaves.
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Built with React, Django &amp; OpenCV</p>
          <p>Results are visual indicators, not a definitive diagnosis.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
