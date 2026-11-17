import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import TechMarquee from '../components/TechMarquee';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function Home() {
  const { data: siteInfo } = useQuery(['siteInfo'], () =>
    axios.get('/api/siteinfo').then((r) => r.data)
  );
  const { data: projects } = useQuery(['projects'], () =>
    axios.get('/api/projects').then((r) => r.data)
  );

  const featured = projects?.slice(0, 6) || [];
  const content = getSiteContent(siteInfo);

  return (
    <>
      <Head>
        <title>{siteInfo?.name || 'Suraj Gupta'} — Portfolio</title>
        <meta name="description" content={content.home.metaDescription || siteInfo?.tagline} />
      </Head>

      <Navbar />

      <main id="main-content" className="flex-1 scroll-mt-20">
        {/* Hero */}
        <Hero
          name={siteInfo?.name}
          tagline={siteInfo?.tagline}
          avatarUrl={siteInfo?.avatarUrl}
          content={content.home}
        />

        {/* Tech marquee */}
        <TechMarquee />

        {/* Featured Projects */}
        <section id="projects-section" className="border-b border-slate-800/60 py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
                {content.home.projectsTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                {content.home.projectsDescription}
              </p>
            </div>

            {featured.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <ProjectCard key={p._id} project={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
                <p className="text-slate-400">{content.home.projectsEmpty}</p>
              </div>
            )}

            {projects && projects.length > 6 && (
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
              <Link href="/projects"
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
