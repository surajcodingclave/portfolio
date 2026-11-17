import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';
import { FaCode, FaServer, FaDatabase, FaMobileAlt, FaCloud, FaRocket } from 'react-icons/fa';

const iconMap = {
  FaCode: FaCode,
  FaServer: FaServer,
  FaDatabase: FaDatabase,
  FaMobileAlt: FaMobileAlt,
  FaCloud: FaCloud,
  FaRocket: FaRocket,
};

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery(['services'], () =>
    axios.get('/api/services').then((r) => r.data)
  );
  const { data: siteInfo } = useQuery(['siteInfo'], () => axios.get('/api/siteinfo').then((r) => r.data));
  const content = getSiteContent(siteInfo);

  return (
    <>
      <Head>
        <title>{content.services.title} — {siteInfo?.name || 'Suraj Gupta'}</title>
        <meta name="description" content={content.services.metaDescription} />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-4">
                {content.services.eyebrow}
              </div>
              <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
                {content.services.title}
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                {content.services.description}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services?.map((service) => {
                  const IconComponent = iconMap[service.icon] || FaCode;
                  return (
                    <article
                      key={service._id}
                      className="group relative rounded-2xl border border-slate-700/60 bg-slate-900/55 p-8 transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-950/20"
                    >
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/60 text-blue-400 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-colors">
                        <IconComponent className="h-7 w-7" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-50 group-hover:text-blue-300 transition-colors mb-3">
                        {service.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-slate-400 mb-6">
                        {service.description}
                      </p>

                      {service.features && service.features.length > 0 && (
                        <ul className="space-y-2 border-t border-slate-800 pt-4">
                          {service.features.map((feat, i) => (
                            <li key={i} className="flex items-center text-xs text-slate-300">
                              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">
              {content.services.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {content.services.ctaDescription}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:from-blue-500 hover:to-blue-400"
              >
                {content.services.ctaButton}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
