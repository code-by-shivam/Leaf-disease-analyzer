import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Leaf, Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Analyzer", path: "/analyzer" },
  { name: "Pipeline", path: "/pipeline" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // Subtle shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    cn(
      "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md transition-shadow",
        scrolled && "shadow-sm"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Leaf className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-heading text-base font-semibold leading-none tracking-tight">
                Plant Leaf
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                Disease Analyzer
              </p>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={linkClass}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/analyzer"
              className={cn(
                buttonVariants({ size: "default" }),
                "hidden md:inline-flex"
              )}
            >
              Start Analysis
              <ArrowRight className="size-4" />
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex size-10 items-center justify-center rounded-lg hover:bg-muted md:hidden"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t bg-background md:hidden animate-in fade-in-0 slide-in-from-top-2 duration-150"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(linkClass({ isActive }), "px-4 py-3 text-base")
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/analyzer"
              onClick={closeMenu}
              className={cn(buttonVariants({ size: "lg" }), "mt-2 w-full")}
            >
              Start Analysis
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
