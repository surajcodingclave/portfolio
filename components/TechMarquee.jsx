import { useSite } from '../lib/siteContext';

export default function TechMarquee() {
  const { content: { marqueeSkills: techs } } = useSite();

  const doubled = [...techs, ...techs];

  return (
    <section className="border-y border-slate-800/60 bg-slate-900/25 py-4 backdrop-blur-sm">
      <div className="marquee-container">
        <div className="marquee-track gap-6">
          {doubled.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-4 text-sm font-medium text-slate-500 transition-colors hover:text-blue-300"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700/60 bg-slate-800/50 text-xs text-blue-400 font-mono font-bold">
                {tech.charAt(0)}
              </span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
