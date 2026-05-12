import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const href =
    project.url && project.url !== "#"
      ? project.url
      : undefined;

  return (
    <div
      className="
        group
        flex flex-col
        rounded-3xl
        border border-[#FFFFFF1A]
        bg-[#0D1120]
        overflow-hidden
        hover:-translate-y-2
        hover:border-[#00F5FF33]
        transition-all duration-500
        h-full
      "
    >
      <div className="bg-[#1A1D2E] px-3 pt-3 pb-0">
        <div className="bg-[#0D1120] rounded-t-xl px-3 py-2 flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 bg-[#1A1D2E] rounded-full px-3 py-1 mx-2 overflow-hidden">
            <span className="text-[#8B8FA8] text-[10px] truncate block">
              {project.url && project.url !== "#"
                ? project.url
                : "www.project-demo.com"}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1120]/80 to-transparent z-10 pointer-events-none" />

          {project.type === "video" ? (
            <video
              src={project.image}
              className="
                w-full
                h-[220px] sm:h-[240px] lg:h-[250px]
                object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
              controls
              playsInline
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="
                w-full
                h-[220px] sm:h-[240px] lg:h-[250px]
                object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />
          )}
        </div>
      </div>

      <div className="flex flex-col p-5 lg:p-6 gap-4 flex-1">
        <span className="text-[#00F5FF] text-[10px] uppercase tracking-[2px]">
          {project.category}
        </span>

        <h3 className="text-[#F0EDE8] text-lg lg:text-xl font-bold leading-tight min-h-[56px]">
          {project.title}
        </h3>

        <div className="flex items-center gap-3 text-xs text-[#8B8FA8]">
          <span>{project.category}</span>
          <span>•</span>
          <span>2026</span>
        </div>

        <p className="text-[#8B8FA8] text-sm leading-6 min-h-[120px]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag: string) => (
            <span
              key={tag}
              className="
                text-[#8B8FA8]
                text-[10px]
                bg-[#FFFFFF0D]
                border border-[#FFFFFF1A]
                px-3 py-1
                rounded-full
                hover:border-[#00F5FF33]
                hover:text-[#F0EDE8]
                transition-all duration-300
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group/btn
              w-fit
              mt-2
              inline-flex
              items-center
              gap-2
              text-xs lg:text-sm
              text-[#F0EDE8]
              border border-[#FFFFFF22]
              px-5 py-2.5
              rounded-full
              hover:bg-[#00F5FF]
              hover:text-[#080B12]
              hover:border-[#00F5FF]
              transition-all duration-300
            "
          >
            View Project
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </a>
        ) : (
          <span className="text-[#8B8FA8] text-xs mt-2">Demo coming soon</span>
        )}
      </div>
    </div>
  );
}
