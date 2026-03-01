"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Brain,
  CalendarDays,
  ChevronDown,
  CloudRain,
  Frown,
  Home,
  ImageIcon,
  Menu,
  Moon,
  Plus,
  SendHorizontal,
  Smile,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ── Types ─────────────────────────────────────── */

interface MemoryEntry {
  id: string;
  text: string;
  emotions: string[];
  timestamp: Date;
}

/* ── Constants ─────────────────────────────────── */

const EMOTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Happy", icon: Smile },
  { label: "Calm", icon: Sun },
  { label: "Excited", icon: Zap },
  { label: "Anxious", icon: CloudRain },
  { label: "Tired", icon: Moon },
  { label: "Sad", icon: Frown },
];

const INITIAL_MEMORIES: MemoryEntry[] = [
  {
    id: "seed-1",
    text: "Had a lovely walk in the park today...",
    emotions: ["Happy"],
    timestamp: new Date(2026, 1, 28, 10, 30),
  },
  {
    id: "seed-2",
    text: "Quiet morning with tea and music...",
    emotions: ["Calm"],
    timestamp: new Date(2026, 1, 27, 9, 15),
  },
  {
    id: "seed-3",
    text: "Finally finished my painting project!",
    emotions: ["Excited"],
    timestamp: new Date(2026, 1, 25, 16, 45),
  },
];

/* ── Helpers ───────────────────────────────────── */

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getEmotionIcon(label: string): LucideIcon {
  return EMOTIONS.find((e) => e.label === label)?.icon ?? Smile;
}

/* ── Sidebar ───────────────────────────────────── */

function SidebarContent({
  memories,
  onSelectMemory,
  onNewMemory,
}: {
  memories: MemoryEntry[];
  onSelectMemory: (mem: MemoryEntry) => void;
  onNewMemory: () => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const filtered = selectedEmotion
    ? memories.filter((m) => m.emotions.includes(selectedEmotion))
    : memories;

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5">
        <Brain className="h-6 w-6 text-sage" />
        <span className="font-heading text-lg font-bold text-cream">
          MindCanvas
        </span>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto px-3">
        {/* New memory */}
        <Button
          variant="ghost"
          onClick={onNewMemory}
          className="w-full justify-start gap-2 text-cream/70 hover:bg-sidebar-accent hover:text-cream cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          New Memory
        </Button>

        {/* Home link */}
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-cream/70 hover:bg-sidebar-accent hover:text-cream cursor-pointer"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Timeline / Calendar */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-cream/70 hover:bg-sidebar-accent hover:text-cream cursor-pointer"
            >
              <CalendarDays className="h-4 w-4" />
              Visit Timeline
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" side="right" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border-sand"
            />
          </PopoverContent>
        </Popover>

        {/* Emotion filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-cream/70 hover:bg-sidebar-accent hover:text-cream cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Smile className="h-4 w-4" />
                {selectedEmotion ?? "Filter by Emotion"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="w-48">
            <DropdownMenuItem
              onClick={() => setSelectedEmotion(null)}
              className="cursor-pointer"
            >
              All Emotions
            </DropdownMenuItem>
            {EMOTIONS.map((e) => (
              <DropdownMenuItem
                key={e.label}
                onClick={() => setSelectedEmotion(e.label)}
                className="cursor-pointer gap-2"
              >
                <e.icon className="h-4 w-4" />
                {e.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="my-3 border-t border-cream/10" />

        {/* Recent memories */}
        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-cream/40">
          Recent Memories
        </p>
        <div className="space-y-1">
          {filtered.map((mem) => {
            const Icon = getEmotionIcon(mem.emotions[0]);
            return (
              <button
                key={mem.id}
                onClick={() => onSelectMemory(mem)}
                className="w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-cream/50">
                  <Icon className="h-3 w-3" />
                  <span>{formatDate(mem.timestamp)}</span>
                </div>
                <p className="mt-0.5 text-sm text-cream/80 truncate">
                  {mem.text}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Placeholder Comic Image ───────────────────── */

function PlaceholderComic({ text }: { text: string }) {
  return (
    <div className="mt-4 flex justify-start">
      <div className="max-w-[85%] space-y-3">
        <div className="rounded-2xl rounded-bl-md bg-white border border-sand/60 p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-olive">
            Generated Comic
          </p>
          {/* 3-panel comic strip placeholder */}
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((panel) => (
              <div
                key={panel}
                className="flex aspect-square flex-col items-center justify-center rounded-xl bg-cream border border-sand/40"
              >
                <ImageIcon className="h-8 w-8 text-sand" />
                <span className="mt-1 text-[10px] text-charcoal/30">
                  Panel {panel}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-charcoal/40 italic">
            &quot;{text.length > 80 ? text.slice(0, 80) + "..." : text}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ─────────────────────────────────── */

export default function ChatPage() {
  const [memory, setMemory] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [activeMemory, setActiveMemory] = useState<MemoryEntry | null>(null);
  const [memories, setMemories] = useState<MemoryEntry[]>(INITIAL_MEMORIES);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasSentMessage = activeMemory !== null;

  // Auto-scroll when a memory is submitted
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMemory]);

  const toggleEmotion = (label: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label],
    );
  };

  const handleSubmit = () => {
    if (!memory.trim()) return;
    const newEntry: MemoryEntry = {
      id: Date.now().toString(),
      text: memory.trim(),
      emotions: [...selectedEmotions],
      timestamp: new Date(),
    };
    setActiveMemory(newEntry);
    setMemories((prev) => [newEntry, ...prev]);
    setMemory("");
    setSelectedEmotions([]);
  };

  const handleNewMemory = () => {
    setActiveMemory(null);
    setMemory("");
    setSelectedEmotions([]);
  };

  const handleSelectMemory = (mem: MemoryEntry) => {
    setActiveMemory(mem);
  };

  return (
    <div className="flex h-full">
      {/* ── Desktop Sidebar ─────────────────────── */}
      <aside className="hidden w-72 flex-shrink-0 bg-forest md:flex md:flex-col">
        <SidebarContent
          memories={memories}
          onSelectMemory={handleSelectMemory}
          onNewMemory={handleNewMemory}
        />
      </aside>

      {/* ── Main Content ────────────────────────── */}
      <main className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-sand/40 bg-cream px-6 py-3">
          {/* Mobile sidebar trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-forest cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-forest p-0">
              <SidebarContent
                memories={memories}
                onSelectMemory={handleSelectMemory}
                onNewMemory={handleNewMemory}
              />
            </SheetContent>
          </Sheet>
          <h1 className="font-heading text-lg font-semibold text-forest">
            Your Canvas
          </h1>
          <div className="w-9 md:hidden" /> {/* spacer for mobile centering */}
        </header>

        {/* Canvas area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-2xl">
            {!hasSentMessage ? (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-olive/10">
                  <Brain className="h-10 w-10 text-olive" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-forest">
                  What&apos;s on your mind?
                </h2>
                <p className="mt-2 max-w-sm text-sm text-charcoal/50">
                  Write a memory below and we&apos;ll transform it into a visual
                  comic strip you can revisit anytime.
                </p>
              </div>
            ) : (
              /* Sent memory + placeholder comic */
              <div className="space-y-4">
                {/* User message bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-forest px-4 py-3 text-cream shadow-sm">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {activeMemory.text}
                    </p>
                    {activeMemory.emotions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {activeMemory.emotions.map((emotionLabel) => {
                          const Icon = getEmotionIcon(emotionLabel);
                          return (
                            <span
                              key={emotionLabel}
                              className="inline-flex items-center gap-1 rounded-full bg-cream/15 px-2 py-0.5 text-xs text-cream/80"
                            >
                              <Icon className="h-3 w-3" />
                              {emotionLabel}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    <p className="mt-1.5 text-right text-[10px] text-cream/40">
                      {activeMemory.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Placeholder comic response */}
                <PlaceholderComic text={activeMemory.text} />
              </div>
            )}
          </div>
        </div>

        {/* ── Input Bar / New Memory Button ──────── */}
        <div className="border-t border-sand/40 bg-white px-4 py-3 md:px-6">
          <div className="mx-auto max-w-2xl">
            {hasSentMessage ? (
              /* After sending — show New Memory button */
              <div className="flex items-center justify-center">
                <Button
                  onClick={handleNewMemory}
                  className="bg-olive text-white hover:bg-olive/90 cursor-pointer gap-2"
                >
                  <Plus className="h-4 w-4" />
                  New Memory
                </Button>
              </div>
            ) : (
              /* Input form */
              <>
                {/* Emotion quick-pick */}
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="mr-1 text-xs text-charcoal/40">
                    Feeling:
                  </span>
                  {EMOTIONS.map((e) => (
                    <button
                      key={e.label}
                      onClick={() => toggleEmotion(e.label)}
                      title={e.label}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                        selectedEmotions.includes(e.label)
                          ? "bg-olive/15 text-olive ring-2 ring-olive/40"
                          : "text-charcoal/50 hover:bg-sand/40 hover:text-charcoal"
                      }`}
                    >
                      <e.icon className="h-3.5 w-3.5" />
                      {e.label}
                    </button>
                  ))}
                </div>

                {/* Text + send */}
                <div className="flex items-end gap-2">
                  <Textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="Write your memory here... (no rules, no pressure)"
                    className="min-h-[48px] max-h-36 resize-none border-sand/60 bg-cream/40 text-charcoal placeholder:text-charcoal/30 focus-visible:ring-olive"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    onClick={handleSubmit}
                    disabled={!memory.trim()}
                    className="h-12 w-12 shrink-0 bg-olive text-white hover:bg-olive/90 disabled:opacity-40 cursor-pointer"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
