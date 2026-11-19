import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { SiteProvider } from '../lib/siteContext';
import { themeStyle } from '../lib/siteContent';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WhatsAppButton from '../components/WhatsAppButton';

const AdminProviders = dynamic(() => import('../components/AdminProviders'));

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const start = () => setRouteLoading(true);
    const finish = () => setRouteLoading(false);
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', finish);
    router.events.on('routeChangeError', finish);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', finish);
      router.events.off('routeChangeError', finish);
    };
  }, [router]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return undefined;

    const routes = ['/about', '/services', '/skills', '/experience', '/projects', '/contact'];
    const warmRoutes = () => routes.forEach((route) => router.prefetch(route));
    const idleWindow = window;
    if ('requestIdleCallback' in idleWindow) {
      const idleId = idleWindow.requestIdleCallback(warmRoutes, { timeout: 1200 });
      return () => idleWindow.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(warmRoutes, 350);
    return () => window.clearTimeout(timeoutId);
  }, [router]);

  if (!pageProps.page) {
    if (Component.adminPage) {
      return <AdminProviders><Component {...pageProps} /></AdminProviders>;
    }
    return <Component {...pageProps} />;
  }

  return (
    <SiteProvider value={pageProps.siteInfo}>
      <div className="portfolio-theme min-h-screen bg-slate-950 text-slate-100 font-body" style={themeStyle(pageProps.siteInfo)}>
        <div aria-hidden="true" className={`route-progress${routeLoading ? ' route-progress--active' : ''}`} />
        <div key={router.asPath} className="page-transition">
          <Component {...pageProps} />
        </div>
        <WhatsAppButton />
      </div>
    </SiteProvider>
  );
}
