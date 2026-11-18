import PageSEO from '../components/PageSEO';
import { publicPageProps } from '../lib/publicData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';
import { getSiteContent } from '../lib/siteContent';

export default function ContactPage({ origin, siteInfo }) {
  const content = getSiteContent(siteInfo);

  return (
    <>
      <PageSEO page="contact" origin={origin} />

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <ContactForm
          email={siteInfo?.contactEmail || ''}
          phone={siteInfo?.phone || ''}
          location={siteInfo?.location || ''}
          content={content.contact}
          socialLinks={siteInfo?.socialLinks || {}}
        />
      </main>

      <Footer />
    </>
  );
}

export function getStaticProps() {
  return publicPageProps('contact');
}
