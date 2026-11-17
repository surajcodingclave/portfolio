import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getSiteContent } from '../lib/siteContent';

export default function ContactPage() {
  const { data: siteInfo } = useQuery(['siteInfo'], () =>
    axios.get('/api/siteinfo').then((r) => r.data)
  );
  const content = getSiteContent(siteInfo);

  return (
    <>
      <Head>
        <title>Contact — {siteInfo?.name || 'Suraj Gupta'}</title>
        <meta name="description" content={content.contact.metaDescription} />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <ContactForm
          email={siteInfo?.contactEmail || 'suraj@example.com'}
          phone={siteInfo?.phone || '+91 98765 43210'}
          location={siteInfo?.location || 'India'}
          content={content.contact}
          socialLinks={siteInfo?.socialLinks || {}}
        />
      </main>

      <Footer />
    </>
  );
}
