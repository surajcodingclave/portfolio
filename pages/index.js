import PageSEO from '../components/PageSEO';
import { publicPageProps } from '../lib/publicData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';
import { getSiteContent } from '../lib/siteContent';

export default function Home({ origin, siteInfo, projects, services, hasMoreProjects }) {

  const featured = projects?.slice(0, 6) || [];
  const content = getSiteContent(siteInfo);

  return (
    <>
      <PageSEO page="home" origin={origin} />

      <Navbar />

      <main id="main-content" className="flex-1 scroll-mt-20">
        {/* Hero */}
        <Hero
          name={siteInfo?.name}
          tagline={siteInfo?.tagline}
          avatarUrl={siteInfo?.avatarUrl}
          content={{ ...content.home, specialties: content.footer.services }}
        />

        {/* Tech marquee */}
        <TechMarquee />

        {/* Featured projects when published, or editable service offers while the case-study list is empty. */}
        <section id="projects-section" className="border-b border-slate-800/60 py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
                {featured.length ? content.home.projectsTitle : content.home.servicesTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                {featured.length ? content.home.projectsDescription : content.home.servicesDescription}
              </p>
            </div>

            {featured.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <ProjectCard key={p._id} project={p} />
                ))}
              </div>
            ) : services?.length ? (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {services.slice(0, 3).map((service, index) => (
                    <article key={service._id || service.title} style={{ '--card-delay': `${index * 65}ms` }} className="portfolio-card-enter rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 transition hover:border-blue-500/50 hover:-translate-y-0.5">
                      <span className="text-xs font-semibold tracking-[0.16em] text-blue-300">0{index + 1} / SERVICE</span>
                      <h3 className="mt-4 text-xl font-semibold text-slate-50">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-300">{service.description}</p>
                      {service.features?.length > 0 && <ul className="mt-5 flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature) => <li key={feature} className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">{feature}</li>)}
                      </ul>}
                      <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200">Discuss this service <span aria-hidden="true" className="ml-2">↗</span></Link>
                    </article>
                  ))}
                </div>
                {services.length > 3 && <div className="mt-8 text-center">
                  <Link href="/services" className="inline-flex items-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-50">
                    {content.home.viewAllServicesLabel} &rarr;
                  </Link>
                </div>}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
                <p className="text-slate-400">{content.home.projectsEmpty}</p>
              </div>
            )}

            {hasMoreProjects && (
              <div className="mt-8 text-center">
                <Link href="/projects"
                  className="inline-flex items-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-50">
                  {content.home.viewAllProjectsLabel} &rarr;
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {content.home.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {content.home.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400">
                {content.home.ctaPrimary}
              </Link>
              <Link href="/services"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-50">
                {content.home.ctaSecondary}
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
  return publicPageProps('home', ['projects', 'services'], 7);
}
