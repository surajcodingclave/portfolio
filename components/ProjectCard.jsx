import { useSite } from '../lib/siteContext';

export default function ProjectCard({ project }) {
  const { content: { projects: content } } = useSite();

  return (
    <article className="portfolio-card-enter group overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/55 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/20">
      {project.imageUrl && (
        <div className="relative aspect-video overflow-hidden border-b border-slate-800 bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.imageAlt || project.title}
            loading="lazy" decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-50 transition-colors group-hover:text-blue-300">
            {project.title}
          </h3>
          {project.isSample && <span className="shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-200">Sample</span>}
        </div>
        <p className="text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>
        <div className="flex gap-3">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Live demo &rarr;
            </a>
          )}
          {!project.demoUrl && project.isSample && <span className="text-sm text-slate-500">Live demo link can be added from the admin panel.</span>}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors">
              {content.sourceLinkLabel}
            </a>
          )}
        </div>
        {project.techStack && project.techStack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-1">
            {project.techStack.map((tech, i) => (
              <li key={i} className="rounded-md bg-slate-800/80 px-2 py-0.5 text-xs text-slate-300">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
