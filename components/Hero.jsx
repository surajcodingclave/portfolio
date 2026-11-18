import Link from 'next/link';

export default function Hero({ name, tagline, content }) {
  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 sm:pb-28 sm:pt-36 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-8 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-sm font-medium text-blue-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {content.eyebrow}
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
            {content.greeting}{' '}
            <span className="text-gradient">{name || 'Suraj Gupta'}</span>
            <span className="mt-3 block text-3xl font-medium leading-tight text-slate-200 sm:text-4xl lg:text-5xl">
              {tagline || 'Freelance Web & App Developer'}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
            {content.description}
          </p>

          <p className="mt-5 text-sm font-medium text-slate-400">{content.experienceNote}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400">
              {content.primaryAction} <span aria-hidden="true" className="ml-2">↗</span>
            </Link>
            <Link href="/projects" className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">
              {content.secondaryAction}
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-400">
            {content.browseNote}{' '}
            <Link href="/contact" className="font-medium text-blue-300 underline decoration-blue-300/40 underline-offset-4 hover:text-blue-200">
              {content.browseLinkLabel}
            </Link>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-transparent to-cyan-400/10 blur-2xl" />
          <article className="relative rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <span className="text-xs font-semibold tracking-[0.16em] text-blue-300">{content.visualEyebrow}</span>
              <span aria-hidden="true" className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-slate-600" /><i className="h-2 w-2 rounded-full bg-slate-600" /><i className="h-2 w-2 rounded-full bg-slate-600" /></span>
            </div>
            <h2 className="mt-7 text-2xl font-semibold leading-snug text-slate-50 sm:text-3xl">{content.visualTitle}</h2>
            <p className="mt-3 leading-7 text-slate-400">{content.visualDescription}</p>

            <div className="mt-7 grid gap-3">
              {(content.specialties || []).slice(0, 3).map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-300">0{index + 1}</span>
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                  <span aria-hidden="true" className="ml-auto text-slate-500">↗</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-slate-800 pt-5 text-sm text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {content.eyebrow}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
