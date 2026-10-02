import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories, courseLevels, courseModes, courses } from "@/data/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses — Data Analytics, Power Platform & AI | A² Technologies" },
      {
        name: "description",
        content:
          "Browse A² Technologies career tracks in data analytics, Power Platform and AI automation. Detailed curriculum, fees, duration and eligibility for every programme.",
      },
      { property: "og:title", content: "Courses at A² Technologies" },
      {
        property: "og:description",
        content: "Explore data analytics, Power Platform and AI automation programmes with online and weekend offline batches.",
      },
    ],
  }),
  component: CoursesPage,
});

const ANY = "any";

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ANY);
  const [level, setLevel] = useState(ANY);
  const [mode, setMode] = useState(ANY);
  const [duration, setDuration] = useState(ANY);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (q && !`${c.name} ${c.category} ${c.summary}`.toLowerCase().includes(q)) return false;
      if (category !== ANY && c.category !== category) return false;
      if (level !== ANY && c.level !== level) return false;
      if (mode !== ANY && c.mode !== mode) return false;
      if (duration === "short" && c.durationMonths > 3) return false;
      if (duration === "medium" && (c.durationMonths < 4 || c.durationMonths > 5)) return false;
      if (duration === "long" && c.durationMonths < 6) return false;
      return true;
    });
  }, [query, category, level, mode, duration]);

  const hasFilters = query !== "" || [category, level, mode, duration].some((v) => v !== ANY);

  function resetFilters() {
    setQuery("");
    setCategory(ANY);
    setLevel(ANY);
    setMode(ANY);
    setDuration(ANY);
  }

  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Career tracks in data, low-code and AI"
        description="Three practical programmes across data analytics, Power Platform and AI automation. Filter by discipline, level or mode to find the track that matches where you are now."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <form
          role="search"
          aria-label="Filter courses"
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <SlidersHorizontal aria-hidden className="size-4 text-secondary" />
            Find a course
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Label htmlFor="course-search">Search</Label>
              <div className="relative mt-1.5">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="course-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Excel, Power BI, Copilot"
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="filter-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="filter-category" className="mt-1.5">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>All categories</SelectItem>
                  {courseCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-level">Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="filter-level" className="mt-1.5">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>All levels</SelectItem>
                  {courseLevels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="filter-mode">Mode</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger id="filter-mode" className="mt-1.5">
                  <SelectValue placeholder="All modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>All modes</SelectItem>
                  {courseModes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <Label htmlFor="filter-duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="filter-duration" className="mt-1.5">
                  <SelectValue placeholder="Any duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any duration</SelectItem>
                  <SelectItem value="short">Up to 3 months</SelectItem>
                  <SelectItem value="medium">4 – 5 months</SelectItem>
                  <SelectItem value="long">6 months and above</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button type="button" variant="ghost" onClick={resetFilters} disabled={!hasFilters}>
                Clear filters
              </Button>
            </div>
          </div>
        </form>

        <p aria-live="polite" className="mt-8 text-sm text-muted-foreground">
          Showing {filtered.length} of {courses.length} programmes
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <h2 className="font-display text-lg font-semibold">No courses match those filters</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Try widening the level or mode, or clear the filters to see all three programmes.
            </p>
            <Button className="mt-6" variant="outline" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
