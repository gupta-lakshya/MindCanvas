import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-sage" />
              <span className="font-heading text-lg font-bold">MindCanvas</span>
            </div>
            <p className="max-w-xs text-sm text-cream/60">
              Preserving memories as visual narratives — safely, emotionally,
              and without cognitive strain.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sage">
                Product
              </span>
              <a
                href="#features"
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm text-cream/70 transition-colors hover:text-cream"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          Project by Team Zenex
        </div>
      </div>
    </footer>
  );
}
