import Link from 'next/link';

export default function Hero({ name, tagline, avatarUrl, content }) {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Text column */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              {content.eyebrow}
            </div>

            <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
              Hi, I&apos;m{' '}
              <span className="font-display text-gradient">{name || 'Suraj Gupta'}</span>
              <br />
              <span className="text-slate-200">{tagline || 'Full-Stack Web Developer'}</span>
            </h1>

            <p className="animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl" style={{ animationDelay: '0.2s' }}>
              {content.description}
            </p>

            <div className="animate-fade-in-up mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400 hover:shadow-xl"
              >
                {content.primaryAction}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-50"
              >
                {content.secondaryAction}
              </Link>
            </div>

            <p className="animate-fade-in-up mt-4 text-sm text-slate-500" style={{ animationDelay: '0.4s' }}>
              {content.browseNote}{' '}
              <Link href="/projects" className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
                {content.browseLinkLabel}
              </Link>
            </p>
          </div>

          {/* Image column */}
          <div className="order-1 flex justify-center lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-600/15 blur-3xl"></div>
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-2xl"></div>
              <img
                src={avatarUrl || '/images/profile.png'}
                alt={name || 'Suraj Gupta'}
                className="relative h-48 w-48 rounded-full border-2 border-slate-700/50 object-cover shadow-2xl sm:h-56 sm:w-56 lg:h-72 lg:w-72"
                onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Suraj+Gupta&size=300&background=1e40af&color=fff&font-size=0.35'; }}
              />
            </div>
          </div>
        </div>
      </div>

      <a href="#projects-section" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
        <span className="text-xs font-medium">Scroll</span>
        <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
