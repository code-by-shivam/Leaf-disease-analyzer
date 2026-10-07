/**
 * Decorative hero illustration: a leaf with highlighted "potential regions"
 * and an animated scan line. Pure SVG/CSS, scales to any container.
 */
function LeafScanVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* soft glow */}
      <div className="absolute inset-6 rounded-full bg-accent/50 blur-3xl" aria-hidden />

      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border bg-card shadow-xl">
        <div className="bg-leaf-grid absolute inset-0 opacity-70" aria-hidden />

        <svg
          viewBox="0 0 400 400"
          role="img"
          aria-label="Illustration of a leaf with potential abnormal regions highlighted"
          className="relative h-full w-full animate-float-slow"
        >
          <defs>
            <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.17 140)" />
              <stop offset="100%" stopColor="oklch(0.42 0.095 153)" />
            </linearGradient>
          </defs>

          {/* leaf body */}
          <path
            d="M200 48 C 308 96, 340 214, 262 308 C 236 338, 214 350, 200 356 C 186 350, 164 338, 138 308 C 60 214, 92 96, 200 48 Z"
            fill="url(#leafFill)"
          />
          {/* midrib + veins */}
          <g stroke="oklch(0.95 0.04 130)" strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M200 70 L200 372" />
            <path d="M200 150 L260 112" />
            <path d="M200 150 L140 112" />
            <path d="M200 215 L278 168" />
            <path d="M200 215 L122 168" />
            <path d="M200 280 L262 236" />
            <path d="M200 280 L138 236" />
          </g>

          {/* potential abnormal regions */}
          <g>
            <circle cx="244" cy="190" r="22" fill="oklch(0.62 0.15 60)" fillOpacity="0.85" />
            <circle cx="244" cy="190" r="30" fill="none" stroke="oklch(0.98 0.02 90)" strokeWidth="2.5" strokeDasharray="5 5" />
            <circle cx="158" cy="250" r="16" fill="oklch(0.55 0.14 45)" fillOpacity="0.85" />
            <circle cx="158" cy="250" r="24" fill="none" stroke="oklch(0.98 0.02 90)" strokeWidth="2.5" strokeDasharray="5 5" />
            <circle cx="216" cy="276" r="11" fill="oklch(0.62 0.15 60)" fillOpacity="0.85" />
            <circle cx="216" cy="276" r="18" fill="none" stroke="oklch(0.98 0.02 90)" strokeWidth="2.5" strokeDasharray="5 5" />
          </g>
        </svg>

        {/* scan line */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-scan h-full">
            <div className="h-14 bg-gradient-to-b from-transparent to-primary/25" />
            <div className="h-0.5 bg-primary/70" />
          </div>
        </div>

        {/* floating labels */}
        <div className="absolute left-3 top-3 rounded-lg border bg-background/90 px-2.5 py-1.5 text-[11px] font-medium shadow-sm backdrop-blur sm:left-5 sm:top-5 sm:text-xs">
          <span className="mr-1.5 inline-block size-2 rounded-full bg-primary" />
          Leaf segmented
        </div>
        <div className="absolute bottom-3 right-3 rounded-lg border bg-background/90 px-2.5 py-1.5 text-[11px] font-medium shadow-sm backdrop-blur sm:bottom-5 sm:right-5 sm:text-xs">
          <span className="mr-1.5 inline-block size-2 rounded-full bg-amber-500" />
          3 potential regions
        </div>
      </div>
    </div>
  );
}

export default LeafScanVisual;
