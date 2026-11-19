import PageSEO from '../components/PageSEO';
import { publicPageProps } from '../lib/publicData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { getSiteContent } from '../lib/siteContent';

export default function ExperiencePage({ origin, siteInfo, experience: experiences }) {
  const content = getSiteContent(siteInfo);

  return (
    <>
      <PageSEO page="experience" origin={origin} />

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4">
                {content.experience.eyebrow}
              </div>
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                {content.experience.title}
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                {content.experience.description}
              </p>
            </div>

            <div className="mb-16 grid gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 text-center">
                <p className="text-3xl font-bold text-blue-300">3 years</p>
                <p className="mt-2 text-sm text-slate-400">Web and app development experience</p>
              </article>
              <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 text-center">
                <p className="text-3xl font-bold text-blue-300">30+</p>
                <p className="mt-2 text-sm text-slate-400">Projects worked across</p>
              </article>
              <article className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 text-center">
                <p className="text-3xl font-bold text-blue-300">Web · App · API</p>
                <p className="mt-2 text-sm text-slate-400">Product work from interface to backend</p>
              </article>
            </div>

            <div className="mb-16 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50">Experience across the product lifecycle</h2>
              <p className="mt-3 leading-7 text-slate-300">Across these projects, my work has included clarifying requirements, shaping responsive interfaces, implementing application features, connecting APIs and databases, and refining flows from feedback. I keep scope and progress visible so clients can make informed decisions throughout delivery.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Requirements and scope', 'Responsive web development', 'Application features', 'API and database integration', 'Testing and launch support', 'Ongoing improvements'].map((item) => <span key={item} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300">{item}</span>)}
              </div>
            </div>

            {experiences.length ? (
              <div className="relative border-l border-slate-800 ml-4 md:ml-8 pl-6 md:pl-8 space-y-12">
                {experiences?.map((exp) => (
                  <div key={exp._id} className="relative group">
                    {/* Timeline dot */}
                    <div className="absolute -left-[35px] md:-left-[43px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-blue-500/40 bg-slate-900 text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FaBriefcase className="h-3.5 w-3.5" />
                    </div>

                    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 md:p-8 transition hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-950/20">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-slate-50 group-hover:text-blue-300 transition-colors">
                            {exp.role}
                          </h3>
                          <p className="text-base font-medium text-blue-400">{exp.company}</p>
                        </div>
                        <div className="flex flex-col sm:items-end text-xs text-slate-400 gap-1">
                          <span className="flex items-center gap-1.5 font-medium text-slate-300">
                            <FaCalendarAlt className="text-blue-400" /> {exp.period}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1.5">
                              <FaMapMarkerAlt /> {exp.location}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-300 mb-5">
                        {exp.description}
                      </p>

                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                          {exp.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-center text-slate-400">{content.experience.emptyMessage}</p>}

            {/* Education Milestone */}
            {(content.experience.educationDegree || content.experience.educationField) && <div className="mt-20 border-t border-slate-800/80 pt-16">
              <h2 className="text-2xl font-bold text-slate-50 mb-8 flex items-center gap-3">
                <FaGraduationCap className="text-blue-400" /> {content.experience.educationTitle}
              </h2>
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{content.experience.educationDegree}</h3>
                    <p className="text-sm text-blue-400 font-medium">{content.experience.educationField}</p>
                  </div>
                  <span className="text-xs text-slate-400">{content.experience.educationResult}</span>
                </div>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                  {content.experience.educationDescription}
                </p>
              </div>
            </div>}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {content.experience.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {content.experience.ctaDescription}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                {content.experience.ctaButton}
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
  return publicPageProps('experience', 'experience');
}
