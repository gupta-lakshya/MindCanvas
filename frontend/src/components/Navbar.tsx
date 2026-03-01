"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-sand/60 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-7 w-7 text-olive" />
          <span className="font-heading text-xl font-bold text-forest">
            MindCanvas
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-charcoal/70 transition-colors hover:text-forest"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-charcoal/70 transition-colors hover:text-forest"
          >
            How It Works
          </a>
          <Link href="/chat">
            <Button className="bg-olive text-white hover:bg-olive/90 cursor-pointer">
              Start Journaling
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-forest"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-sand/60 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              className="text-sm font-medium text-charcoal/70 hover:text-forest"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-charcoal/70 hover:text-forest"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </a>
            <Link href="/chat" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-olive text-white hover:bg-olive/90">
                Start Journaling
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
