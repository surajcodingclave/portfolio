import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useQuery(['projects'], () =>
    axios.get('/api/projects').then((r) => r.data)
  );
  const { data: siteInfo } = useQuery(['siteInfo'], () => axios.get('/api/siteinfo').then((r) => r.data));
  const content = getSiteContent(siteInfo);

  return (
    <>
      <Head>
        <title>{content.projects.title} — {siteInfo?.name || 'Suraj Gupta'}</title>
        <meta name="description" content={content.projects.metaDescription} />
      </Head>

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

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : projects && projects.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 p-16 text-center">
                <p className="text-slate-400 text-lg">{content.projects.emptyTitle}</p>
                <p className="text-sm text-slate-500 mt-2">{content.projects.emptyDescription}</p>
              </div>
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
