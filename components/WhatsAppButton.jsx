import { FaWhatsapp } from 'react-icons/fa';
import { useSite } from '../lib/siteContext';

export default function WhatsAppButton() {
  const { siteInfo } = useSite();
  const phoneNumber = (siteInfo?.phone || '').replace(/\D/g, '');

  if (!phoneNumber) return null;

  const message = encodeURIComponent('Hi Suraj, I found your portfolio and would like to discuss a project.');

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Suraj Gupta on WhatsApp"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
      <span>Chat on WhatsApp</span>
    </a>
  );
}
