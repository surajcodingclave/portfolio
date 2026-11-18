import PageSEO from '../components/PageSEO';
import { publicPageProps } from '../lib/publicData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TechMarquee from '../components/TechMarquee';
import Link from 'next/link';
import { FaReact, FaNodeJs, FaPhp, FaPython, FaDatabase, FaTools } from 'react-icons/fa';
import { getSiteContent, defaultSkillCategories } from '../lib/siteContent';

export default function SkillsPage({ origin, siteInfo }) {

  const content = getSiteContent(siteInfo);
  const categoryIcons = { FaReact, FaNodeJs, FaPhp, FaPython, FaDatabase, FaTools };
  const skillCategories = siteInfo?.siteContent?.skills?.customCategories ? siteInfo.skillCategories : siteInfo?.skillCategories?.length ? siteInfo.skillCategories : defaultSkillCategories;

  return (
    <>
      <PageSEO page="skills" origin={origin} />

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4">
                {content.skills.eyebrow}
              </div>
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                {content.skills.title}
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                {content.skills.description}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {skillCategories.map((cat, idx) => {
                const Icon = categoryIcons[cat.icon] || FaTools;
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
                <h3 className="text-lg font-semibold text-slate-50 mb-4">{content.skills.additionalSkillsTitle}</h3>
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
              {content.skills.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {content.skills.ctaDescription}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                {content.skills.ctaButton}
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
  return publicPageProps('skills');
}
