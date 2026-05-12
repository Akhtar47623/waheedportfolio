import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../index.css";
import { PROJECTS, projectCategories } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

const PAGE_SIZE = 6;

type PageButton = number | "ellipsis";

export default function ProjectsPage() {
  const categories = useMemo(() => projectCategories(), []);
  const [filter, setFilter] = useState<string>("All");
  const [page, setPage] = useState(1);

  const tagCount = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return set.size;
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginatedProjects = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const rangeStart =
    filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, filtered.length);

  const pageNumbers: PageButton[] = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: PageButton[] = [];
    if (page <= 4) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) pages.push(i);
      if (totalPages > 5) {
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    } else if (page >= totalPages - 3) {
      pages.push(1);
      pages.push("ellipsis");
      for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("ellipsis");
      pages.push(page - 1);
      pages.push(page);
      pages.push(page + 1);
      pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, page]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080B12] w-full overflow-x-clip relative text-[#F0EDE8]">
      <div className="ambient-stage">
        <div className="ambient-grid" />
        <div className="ambient-blob ambient-blob-cyan" />
        <div className="ambient-blob ambient-blob-violet" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 lg:pt-12 pb-0">
        {/* Banner — layered aesthetic hero */}
        <section className="relative mb-10 lg:mb-14 overflow-hidden rounded-[28px] border border-solid border-[#FFFFFF14] bg-[#0A0E18]/95 shadow-[0_0_0_1px_rgba(0,245,255,0.06),0_32px_80px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          {/* Soft vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 70% at 50% -20%, rgba(0,245,255,0.12), transparent 55%), radial-gradient(ellipse 70% 50% at 100% 80%, rgba(124,58,237,0.14), transparent 50%)",
            }}
          />

          {/* Animated mesh */}
          <div
            className="projects-hero-mesh pointer-events-none absolute -inset-[40%] opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 45% 35% at 25% 35%, rgba(0,245,255,0.22), transparent 60%), radial-gradient(ellipse 40% 38% at 75% 55%, rgba(124,58,237,0.2), transparent 58%), radial-gradient(ellipse 30% 25% at 50% 90%, rgba(0,245,255,0.08), transparent 70%)",
            }}
          />

          {/* Fine grid + light sweep */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 95% 75% at 50% 35%, black 0%, transparent 72%)",
            }}
          />
          <div className="projects-hero-shimmer pointer-events-none absolute inset-0 mix-blend-screen opacity-70" />

          {/* Watermark index */}
          <span
            className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-mono text-[clamp(5rem,18vw,12rem)] font-bold leading-none tracking-tighter text-[#FFFFFF06]"
            aria-hidden
          >
            01
          </span>

          {/* Corner brackets */}
          <span className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-[#00F5FF44]" />
          <span className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-[#7C3AED44]" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b-2 border-l-2 border-[#FFFFFF14]" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-[#FFFFFF14]" />

          {/* Bottom accent line */}
          <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF55] to-transparent opacity-80" />

          <div className="relative z-[1] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
            <Link
              to="/"
              className="group mb-7 inline-flex items-center gap-2 text-sm text-[#8B8FA8] transition hover:text-[#00F5FF] lg:mb-9"
            >
              <span
                className="inline-block transition group-hover:-translate-x-0.5"
                aria-hidden
              >
                ←
              </span>
              Back to home
            </Link>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between lg:gap-14">
              <div className="relative flex max-w-3xl flex-col gap-5 lg:pl-2">
                <div
                  className="absolute -left-1 top-2 bottom-2 w-px bg-gradient-to-b from-[#00F5FF] via-[#7C3AED] to-transparent opacity-70 sm:-left-2"
                  aria-hidden
                />

                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00F5FF2E] bg-[#00F5FF0A] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#00F5FF]">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[#00F5FF] shadow-[0_0_8px_#00F5FF]" />
                  Curated archive
                </span>

                <h1 className="text-[2.35rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.06]">
                  <span className="text-[#F0EDE8]">Shipped work,</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00F5FF] via-[#5EEAD4] to-[#A78BFA] bg-clip-text text-transparent">
                    documented end-to-end
                  </span>
                </h1>

                <p className="max-w-lg text-[15px] leading-relaxed text-[#8B8FA8] lg:text-base">
                  A living catalog of full-stack builds — APIs, dashboards, and
                  payments — each with stack tags and links so you can see how
                  things were put together.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:w-[min(100%,380px)] lg:shrink-0">
                {/* Terminal accent */}
                <div className="rounded-2xl border border-[#FFFFFF12] bg-[#060912]/90 px-4 py-3.5 font-mono shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-2 border-b border-[#FFFFFF0D] pb-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF5F57]/90" />
                    <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/90" />
                    <span className="h-2 w-2 rounded-full bg-[#28C840]/90" />
                    <span className="ml-2 text-[10px] text-[#5C6178]">
                      portfolio — zsh
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#8B8FA8]">
                    <span className="text-[#00F5FF]">~/work</span>{" "}
                    <span className="text-[#5C6178]">$</span>{" "}
                    <span className="text-[#C4C9E0]">ls ./projects</span>
                  </p>
                  <p className="mt-1 text-[11px] text-[#6B728E]">
                    → {PROJECTS.length} entries · {tagCount} unique tags
                    <span className="projects-hero-cursor text-[#00F5FF]">
                      ▍
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="rounded-2xl border border-[#FFFFFF10] bg-[#080B12]/75 px-3 py-3.5 text-center backdrop-blur-sm transition hover:border-[#00F5FF22]">
                    <div className="text-xl font-bold tabular-nums text-[#F0EDE8] lg:text-2xl">
                      {PROJECTS.length}
                    </div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#6B728E]">
                      Builds
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#FFFFFF10] bg-[#080B12]/75 px-3 py-3.5 text-center backdrop-blur-sm transition hover:border-[#00F5FF22]">
                    <div className="text-xl font-bold tabular-nums text-[#F0EDE8] lg:text-2xl">
                      {tagCount}
                    </div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#6B728E]">
                      Tags
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#FFFFFF10] bg-[#080B12]/75 px-3 py-3.5 text-center backdrop-blur-sm transition hover:border-[#00F5FF22]">
                    <div className="text-xl font-bold tabular-nums text-[#F0EDE8] lg:text-2xl">
                      {categories.length}
                    </div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-[0.14em] text-[#6B728E]">
                      Lanes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters + grid */}
        <header className="flex flex-col gap-6 border-b border-[#FFFFFF1A] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#8B8FA8] text-xs uppercase tracking-[2px]">
            {filtered.length === 0 ? (
              <>No matches · {PROJECTS.length} total in catalog</>
            ) : (
              <>
                Showing {rangeStart}–{rangeEnd} of {filtered.length}{" "}
                {filtered.length !== PROJECTS.length && (
                  <span className="text-[#5C6178]">
                    ({PROJECTS.length} total)
                  </span>
                )}
              </>
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition ${
                filter === "All"
                  ? "border-[#00F5FF] bg-[#00F5FF14] text-[#00F5FF]"
                  : "border-[#FFFFFF1A] text-[#8B8FA8] hover:border-[#00F5FF66]"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition ${
                  filter === cat
                    ? "border-[#00F5FF] bg-[#00F5FF14] text-[#00F5FF]"
                    : "border-[#FFFFFF1A] text-[#8B8FA8] hover:border-[#00F5FF66]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 py-10 lg:py-14">
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#8B8FA8] py-16">
            No projects in this category yet.
          </p>
        )}

        {filtered.length > 0 && totalPages > 1 && (
          <nav
            className="-mt-6 mb-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF22] px-4 py-2 text-xs uppercase tracking-wider text-[#8B8FA8] transition hover:border-[#00F5FF66] hover:text-[#00F5FF] disabled:pointer-events-none disabled:opacity-30"
            >
              ← Prev
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1">
              {pageNumbers.map((n, idx) =>
                n === "ellipsis" ? (
                  <span
                    key={`e-${idx}`}
                    className="px-2 text-[#5C6178]"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`min-w-[2.25rem] rounded-full border px-3 py-1.5 text-xs font-medium tabular-nums transition ${
                      page === n
                        ? "border-[#00F5FF] bg-[#00F5FF14] text-[#00F5FF]"
                        : "border-transparent text-[#8B8FA8] hover:border-[#FFFFFF1A] hover:text-[#F0EDE8]"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-2 rounded-full border border-[#FFFFFF22] px-4 py-2 text-xs uppercase tracking-wider text-[#8B8FA8] transition hover:border-[#00F5FF66] hover:text-[#00F5FF] disabled:pointer-events-none disabled:opacity-30"
            >
              Next →
            </button>
          </nav>
        )}
      </div>

      <footer className="relative z-10 mt-auto flex w-full flex-col items-center justify-between gap-6 border-t border-solid border-[#FFFFFF1A] bg-[#080B12] px-4 py-8 lg:flex-row lg:px-20">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:gap-8 lg:text-left">
          <div className="flex flex-col items-center gap-1 lg:items-start">
            <span className="text-xl font-bold text-[#F0EDE8]">
              WAHEED AKHTAR
            </span>
            <span className="text-[10px] text-[#8B8FA8]">
              Full-Stack Web Developer
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/projects"
              className="text-xs text-[#00F5FF] transition hover:text-white"
            >
              Projects
            </Link>
            <Link
              to="/#work"
              className="text-xs text-[#8B8FA8] transition hover:text-white"
            >
              Work
            </Link>
            <Link
              to="/#skills"
              className="text-xs text-[#8B8FA8] transition hover:text-white"
            >
              Skills
            </Link>
            <Link
              to="/#contact"
              className="text-xs text-[#8B8FA8] transition hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-center text-[10px] text-[#8B8FA8]">
            © 2026 Waheed Akhtar. All Rights Reserved
          </span>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-solid border-[#00F5FF33] bg-[#00F5FF1A]">
            <span className="text-sm font-bold text-[#00F5FF]">WA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
