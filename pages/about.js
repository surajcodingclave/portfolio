import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function AboutPage() {
  const { data: siteInfo } = useQuery(['siteInfo'], () =>
    axios.get('/api/siteinfo').then((r) => r.data)
  );

  const skills = siteInfo?.skills || [
    'React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB',
    'TypeScript', 'Tailwind CSS', 'PHP', 'Laravel', 'Python',
    'Django', 'PostgreSQL', 'MySQL', 'Redis', 'Docker',
    'Git', 'REST API', 'GraphQL', 'AWS', 'Firebase',
  ];
  const content = getSiteContent(siteInfo);
  const about = content.about;

  return (
    <>
      <Head>
        <title>{about.title} — {siteInfo?.name || 'Suraj Gupta'}</title>
        <meta name="description" content={about.metaDescription} />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[0.4fr_1fr]">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-blue-600/15 blur-3xl"></div>
                  <img
                    src={siteInfo?.avatarUrl || '/images/profile.png'}
                    alt={siteInfo?.name || 'Suraj Gupta'}
                    className="relative h-48 w-48 rounded-full border-2 border-slate-700/50 object-cover shadow-2xl lg:h-64 lg:w-64"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Suraj+Gupta&size=300&background=1e40af&color=fff&font-size=0.35'; }}
                  />
                </div>
              </div>

              {/* Intro */}
              <div>
                <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                  {about.title}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-slate-300">
                  {siteInfo?.bio || "I'm Suraj Gupta, a passionate Full-Stack Web Developer specializing in MERN Stack, PHP with Laravel, and Python with Django. I love building modern, scalable web applications that solve real-world problems."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bio sections */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl grid gap-8 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">{about.whoTitle}</h2>
              <p className="text-sm leading-relaxed text-slate-400">
              {about.whoDescription}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">{about.whatTitle}</h2>
              <p className="text-sm leading-relaxed text-slate-400">
              {about.whatDescription}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">{about.howTitle}</h2>
              <p className="text-sm leading-relaxed text-slate-400">
              {about.howDescription}
              </p>
            </article>
          </div>
        </section>

        {/* Skills */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-50 mb-8">
              {about.skillsTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-blue-500/50 hover:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {about.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">{about.ctaDescription}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400">
                {about.ctaPrimary}
              </Link>
              <Link href="/projects"
                className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-50">
                {about.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
