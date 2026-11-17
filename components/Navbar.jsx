import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/skills', label: 'Skills' },
    { href: '/experience', label: 'Experience' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/40 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="font-display text-xl font-bold text-slate-50 hover:text-blue-400 transition-colors">
          Suraj<span className="text-blue-400">.</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
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

        {/* CTA & Admin */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400"
          >
            Hire Me
          </Link>
          {session ? (
            <Link href="/admin/dashboard" className="text-sm font-medium text-blue-400 hover:underline">
              Admin
            </Link>
          ) : (
            <Link href="/admin/dashboard" className="text-xs text-slate-500 hover:text-slate-300">
              Admin Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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
              Hire Me
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-center text-xs text-slate-400 hover:text-white py-1"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
