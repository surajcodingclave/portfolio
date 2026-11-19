import { FaWhatsapp } from 'react-icons/fa';
import { useSite } from '../lib/siteContext';

export default function WhatsAppButton() {
  const { siteInfo } = useSite();
  const phoneNumber = (siteInfo?.phone || '').replace(/\D/g, '');

  const message = encodeURIComponent('Hi Suraj, I found your portfolio and would like to discuss a project.');
  const whatsappUrl = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${message}`
    : `https://wa.me/?text=${message}`;

  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={phoneNumber ? 'Chat with Suraj Gupta on WhatsApp' : 'Open WhatsApp to start a message'}
      title={phoneNumber ? 'Chat on WhatsApp' : 'Add your WhatsApp number in admin settings for direct chat'}
    >
      <FaWhatsapp aria-hidden="true" />
      <span>{phoneNumber ? 'Chat on WhatsApp' : 'Set WhatsApp number in admin settings'}</span>
    </a>
  );
}
