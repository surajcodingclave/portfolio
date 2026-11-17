import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function ProjectCard({ project }) {
  const { data: siteInfo } = useQuery(['siteInfo'], () => axios.get('/api/siteinfo').then((r) => r.data));
  const content = getSiteContent(siteInfo).projects;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/55 transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/20">
      {project.imageUrl && (
        <div className="relative aspect-video overflow-hidden border-b border-slate-800 bg-slate-950">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-50 transition-colors group-hover:text-blue-300">
            {project.title}
          </h3>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>
        <div className="flex gap-3">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              {content.demoLinkLabel} &rarr;
            </a>
          )}
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
        <p className="mt-auto text-xs font-medium text-slate-500 transition-colors group-hover:text-blue-400">
          {content.detailsLabel} &rarr;
        </p>
      </div>
    </article>
  );
}
