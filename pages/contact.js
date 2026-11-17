import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function ContactPage() {
  const { data: siteInfo } = useQuery(['siteInfo'], () =>
    axios.get('/api/siteinfo').then((r) => r.data)
  );

  return (
    <>
      <Head>
        <title>Contact — {siteInfo?.name || 'Suraj Gupta'}</title>
        <meta name="description" content="Get in touch with Suraj Gupta" />
      </Head>

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <ContactForm
          email={siteInfo?.contactEmail || 'suraj@example.com'}
          phone={siteInfo?.phone || '+91 98765 43210'}
          location={siteInfo?.location || 'India'}
        />
      </main>

      <Footer />
    </>
  );
}
