import PageSEO from '../components/PageSEO';
import { publicPageProps } from '../lib/publicData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';
import { getSiteContent } from '../lib/siteContent';

export default function ProjectsPage({ origin, siteInfo, projects, services }) {
  const content = getSiteContent(siteInfo);

  return (
    <>
      <PageSEO page="projects" origin={origin} />

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                {content.projects.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                {content.projects.description}
              </p>
            </div>

            {projects && projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-slate-900/80 p-8 sm:p-10">
                  <p className="text-xl font-semibold text-slate-100">{content.projects.emptyTitle}</p>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-300">{content.projects.emptyDescription}</p>
                </div>
                {services?.length > 0 && <div className="mt-14">
                  <div className="mb-7">
                    <h2 className="text-2xl font-bold text-slate-50">{content.projects.projectTypesTitle}</h2>
                    <p className="mt-3 max-w-3xl leading-7 text-slate-400">{content.projects.projectTypesDescription}</p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => <article key={service._id || service.title}
                      style={{ '--card-delay': `${Math.min(index, 5) * 65}ms` }}
                      className="portfolio-card-enter rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 transition hover:-translate-y-1 hover:border-blue-500/50">
                      <h3 className="text-lg font-semibold text-slate-50">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
                      {service.features?.length > 0 && <ul className="mt-5 space-y-2 border-t border-slate-800 pt-4">
                        {service.features.slice(0, 4).map((feature) => <li key={feature} className="flex gap-2 text-sm text-slate-400"><span className="text-blue-400">✓</span>{feature}</li>)}
                      </ul>}
                      <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200">Discuss a similar project <span aria-hidden="true" className="ml-2">↗</span></Link>
                    </article>)}
                  </div>
                </div>}
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {content.projects.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">{content.projects.ctaDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400"
              >
                {content.projects.ctaButton}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export function getStaticProps() {
  return publicPageProps('projects', ['projects', 'services']);
}
