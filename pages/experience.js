import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

export default function ExperiencePage() {
  const { data: experiences, isLoading } = useQuery(['experience'], () =>
    axios.get('/api/experience').then((r) => r.data)
  );

  return (
    <>
      <Head>
        <title>Experience &amp; Career — Suraj Gupta</title>
        <meta name="description" content="Professional experience and career timeline of Suraj Gupta" />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4">
                Career History
              </div>
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                Work <span className="text-gradient">Experience</span>
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                My professional journey designing, building, and scaling software applications.
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
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
            )}

            {/* Education Milestone */}
            <div className="mt-20 border-t border-slate-800/80 pt-16">
              <h2 className="text-2xl font-bold text-slate-50 mb-8 flex items-center gap-3">
                <FaGraduationCap className="text-blue-400" /> Education &amp; Training
              </h2>
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">Bachelor of Computer Science / Applications</h3>
                    <p className="text-sm text-blue-400 font-medium">Computer Software Engineering</p>
                  </div>
                  <span className="text-xs text-slate-400">Graduated with Honors</span>
                </div>
                <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                  Specialized in Data Structures, Relational &amp; NoSQL Database Design, Object-Oriented Software Architecture, and Full-Stack Web Technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              Interested in My <span className="text-gradient">Background</span>?
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Download my updated curriculum vitae or get directly in touch for recruitment opportunities.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                Connect With Me
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
