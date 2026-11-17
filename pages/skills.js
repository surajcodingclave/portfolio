import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechMarquee from '../components/TechMarquee';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaReact, FaNodeJs, FaPhp, FaPython, FaDatabase, FaTools } from 'react-icons/fa';

export default function SkillsPage() {
  const { data: siteInfo } = useQuery(['siteInfo'], () =>
    axios.get('/api/siteinfo').then((r) => r.data)
  );

  const skillCategories = [
    {
      category: 'Frontend Engineering',
      icon: FaReact,
      skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'HTML5 / CSS3', 'JavaScript (ES6+)'],
    },
    {
      category: 'Backend & Server-side',
      icon: FaNodeJs,
      skills: ['Node.js', 'Express.js', 'PHP (Laravel)', 'Python (Django)', 'RESTful APIs', 'GraphQL', 'Authentication (JWT/OAuth)'],
    },
    {
      category: 'Database & Storage',
      icon: FaDatabase,
      skills: ['MongoDB (Mongoose)', 'PostgreSQL', 'MySQL', 'Redis Cache', 'Firebase Firestore', 'Prisma ORM'],
    },
    {
      category: 'DevOps & Tooling',
      icon: FaTools,
      skills: ['Git & GitHub', 'Docker', 'Linux/Ubuntu CLI', 'Vercel / Netlify', 'AWS Basics', 'Postman API Testing'],
    },
  ];

  return (
    <>
      <Head>
        <title>Technical Skills — Suraj Gupta</title>
        <meta name="description" content="Technical proficiencies and skillset of Suraj Gupta - MERN, Laravel, Django, Next.js" />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4">
                Tech Stack &amp; Tools
              </div>
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                Technical <span className="text-gradient">Proficiencies</span>
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                A structured overview of the frameworks, languages, databases, and development tooling I use to craft performant web software.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {skillCategories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-8 transition-all hover:border-blue-500/50"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-blue-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-50">{cat.category}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-lg border border-slate-700/80 bg-slate-800/60 px-3.5 py-1.5 text-sm font-medium text-slate-200 transition hover:border-blue-500 hover:text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Skills List from DB */}
            {siteInfo?.skills && siteInfo.skills.length > 0 && (
              <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-8">
                <h3 className="text-lg font-semibold text-slate-50 mb-4">Database Configured Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {siteInfo.skills.map((s, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Marquee */}
        <div className="my-8">
          <TechMarquee />
        </div>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              Ready to work with a <span className="text-gradient">Versatile Engineer</span>?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Whether it&apos;s a MERN web application, Django automation backend, or Laravel business portal.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                Explore Projects
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
