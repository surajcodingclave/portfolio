import { useSite } from '../lib/siteContext';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { content } = useSite();
  const navigation = content.navigation;

  const links = [
    { href: '/', label: navigation.homeLabel },
    { href: '/about', label: navigation.aboutLabel },
    { href: '/services', label: navigation.servicesLabel },
    { href: '/skills', label: navigation.skillsLabel },
    { href: '/experience', label: navigation.experienceLabel },
    { href: '/projects', label: navigation.projectsLabel },
    { href: '/contact', label: navigation.contactLabel },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/40 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-slate-50 hover:text-blue-400 transition-colors">
          {navigation.logoText}<span className="text-blue-400">{navigation.logoSuffix}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onMouseEnter={() => router.prefetch(link.href)}
                onFocus={() => router.prefetch(link.href)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? 'bg-slate-800/60 text-slate-50'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-slate-50'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Project CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400"
          >
            {navigation.hireMeLabel}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800/40 bg-slate-950/95 backdrop-blur-md px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onTouchStart={() => router.prefetch(link.href)}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive(link.href) ? 'bg-slate-800/60 text-white' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-2 text-center text-sm font-medium text-white"
            >
              {navigation.hireMeLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
