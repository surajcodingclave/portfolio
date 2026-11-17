import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function Footer() {
  const { data: siteInfo } = useQuery(['siteInfo'], () => axios.get('/api/siteinfo').then((r) => r.data));
  const content = getSiteContent(siteInfo);
  const footer = content.footer;
  const navigation = content.navigation;
  const email = siteInfo?.contactEmail || 'surajgupta.dev@example.com';
  const socialLinks = [
    { href: siteInfo?.socialLinks?.github, icon: FaGithub, label: 'GitHub' },
    { href: siteInfo?.socialLinks?.linkedin, icon: FaLinkedin, label: 'LinkedIn' },
    { href: siteInfo?.socialLinks?.twitter, icon: FaTwitter, label: 'Twitter' },
    { href: `mailto:${email}`, icon: FaEnvelope, label: 'Email' },
  ].filter((social) => social.href);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: navigation.aboutLabel },
    { href: '/services', label: navigation.servicesLabel },
    { href: '/skills', label: navigation.skillsLabel },
    { href: '/experience', label: navigation.experienceLabel },
    { href: '/projects', label: navigation.projectsLabel },
    { href: '/contact', label: navigation.contactLabel },
  ];

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950 text-slate-300">
      {/* Glow decorative top bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 max-w-5xl bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-bold text-slate-50 hover:text-blue-400 transition-colors inline-block">
              {navigation.logoText}<span className="text-blue-400">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              {footer.bio}
            </p>
            <div className="pt-2 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition-all hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-300 hover:scale-105"
                  aria-label={s.label}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">{footer.navigationTitle}</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <span className="text-blue-500 text-xs">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">{footer.servicesTitle}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {footer.services.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-100 mb-4">{footer.contactTitle}</h4>
            <div className="flex items-start gap-3 text-sm text-slate-400">
              <FaMapMarkerAlt className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
              <span>{siteInfo?.location || 'India'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <FaEnvelope className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <a href={`mailto:${email}`} className="hover:text-blue-400 transition-colors">
                {email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-400">
              <FaPhone className="h-4 w-4 text-blue-400 flex-shrink-0" />
              <span>{siteInfo?.phone || ''}</span>
            </div>
            <div className="pt-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-md hover:from-blue-500 hover:to-blue-400 transition"
              >
                {footer.ctaButton} &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            &copy; {new Date().getFullYear()} <span className="text-slate-300 font-medium">{footer.copyrightName}</span>. Handcrafted with <FaHeart className="text-rose-500 inline h-3 w-3" /> & Next.js.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="hover:text-slate-400 transition-colors">
              Admin Portal
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-400 hover:border-blue-500/40 hover:text-blue-300 transition"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FaArrowUp className="h-2.5 w-2.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
