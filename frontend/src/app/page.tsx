import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Pencil,
  ImageIcon,
  SmilePlus,
  Play,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-olive/10" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sage/15" />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full bg-olive/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-olive">
              Neurodivergent-First
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-forest md:text-6xl">
              Preserve Your Memories as{" "}
              <span className="text-olive">Visual Stories</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/70">
              MindCanvas turns your daily experiences into AI-generated comic
              strips — easy to create, calming to revisit, and designed for
              brains that think differently.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-olive px-8 text-white hover:bg-olive/90 cursor-pointer"
                >
                  Start Journaling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-sand text-forest hover:bg-sand/30 cursor-pointer"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────── */}
      <section id="features" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <h2 className="font-heading text-3xl font-bold text-forest">
              Designed for Your Mind
            </h2>
            <p className="mt-3 text-charcoal/60">
              Every feature built with cognitive accessibility at its core.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Pencil,
                title: "Effortless Capture",
                desc: "Just type a few words — no minimum length, no pressure. Your memory, your pace.",
              },
              {
                icon: ImageIcon,
                title: "AI Comic Strips",
                desc: "Your entries become soft, calming comic panels that your brain naturally remembers.",
              },
              {
                icon: SmilePlus,
                title: "Emotion Tagging",
                desc: "Tag how you feel with icons and intensity — no need to find the right words.",
              },
              {
                icon: Shield,
                title: "Safe & Private",
                desc: "End-to-end encryption, local-first storage, and no social feeds. Your memories stay yours.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-sand/60 bg-cream/40 p-6 transition-all hover:border-olive/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-olive/10 text-olive transition-colors group-hover:bg-olive group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-forest">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-lg text-center">
            <h2 className="font-heading text-3xl font-bold text-forest">
              How It Works
            </h2>
            <p className="mt-3 text-charcoal/60">
              Three simple steps — no overwhelming setup.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Pencil,
                title: "Write Your Memory",
                desc: "Type a few words, a sentence, or a paragraph — whatever feels right. No rules.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "AI Creates Your Comic",
                desc: "Our AI turns your words into soft, calming comic panels with your personal avatar.",
              },
              {
                step: "03",
                icon: Play,
                title: "Revisit Anytime",
                desc: "Browse your timeline, filter by emotion, and relive memories without stress.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center rounded-2xl p-4 border border-sand">
                <span className="font-heading text-6xl font-black text-olive/60">
                  {item.step}
                </span>
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-cream">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-semibold text-forest">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────── */}
      <section className="bg-forest py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-cream">
            Ready to Start Your Visual Journal?
          </h2>
          <p className="mt-4 text-cream/60">
            No sign-up needed for the demo. Just start writing.
          </p>
          <Link href="/chat">
            <Button
              size="lg"
              className="mt-6 bg-olive px-8 text-white hover:bg-olive/90 cursor-pointer"
            >
              Open MindCanvas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
