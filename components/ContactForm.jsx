import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactForm({ name, email, phone, location, content, socialLinks }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', projectType: '', timeline: '', message: '' });
  const [sent, setSent] = useState(false);
  const whatsappNumber = (phone || '').replace(/\D/g, '');
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Suraj, I would like to discuss a project.')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.projectType || 'Not specified'}\nTimeline: ${form.timeline || 'Not specified'}\n\n${form.message}`;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    } else {
      const phoneNumber = (phone || '').replace(/\D/g, '');
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`${form.subject}\n\n${body}`)}`, '_blank', 'noopener,noreferrer');
    }
    setSent(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300">
            {content.description}
          </p>
          <div className="mx-auto mt-7 grid max-w-5xl grid-cols-1 gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/55 p-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-slate-800/40 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Name</p>
              <p className="mt-1 text-sm font-semibold text-slate-100">{name || 'Suraj Gupta'}</p>
            </div>
            {phone && <a className="rounded-xl bg-slate-800/40 px-4 py-3 text-slate-200 hover:bg-slate-800" href={`tel:${phone}`}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Mobile</p>
              <p className="mt-1 text-sm font-semibold"><FaPhone className="mr-2 inline text-blue-300" />{phone}</p>
            </a>}
            {email && <a className="rounded-xl bg-slate-800/40 px-4 py-3 text-slate-200 hover:bg-slate-800" href={`mailto:${email}`}>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Email</p>
              <p className="mt-1 break-all text-sm font-semibold"><FaEnvelope className="mr-2 inline text-blue-300" />{email}</p>
            </a>}
            <a className="rounded-xl bg-green-500/10 px-4 py-3 text-green-100 hover:bg-green-500/15" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <p className="text-xs font-medium uppercase tracking-wider text-green-200/70">WhatsApp</p>
              <p className="mt-1 text-sm font-semibold"><FaWhatsapp className="mr-2 inline" />Message me</p>
            </a>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-50 mb-6">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="-mt-2 text-sm text-slate-400">{content.projectBriefHint}</p>
              <div>
                <label htmlFor="inquiry-name" className="mb-1.5 block text-sm font-medium text-slate-300">{content.nameLabel}</label>
                <input id="inquiry-name" name="name" autoComplete="name" type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={content.namePlaceholder} />
              </div>
              <div>
                <label htmlFor="inquiry-email" className="mb-1.5 block text-sm font-medium text-slate-300">{content.emailLabel}</label>
                <input id="inquiry-email" name="email" autoComplete="email" type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={content.emailPlaceholder} />
              </div>
              <div>
                <label htmlFor="inquiry-subject" className="mb-1.5 block text-sm font-medium text-slate-300">{content.subjectLabel}</label>
                <input id="inquiry-subject" name="subject" type="text" required value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={content.subjectPlaceholder} />
              </div>
              <div>
                <label htmlFor="inquiry-project-type" className="mb-1.5 block text-sm font-medium text-slate-300">{content.projectTypeLabel}</label>
                <select id="inquiry-project-type" name="projectType" value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">{content.projectTypePlaceholder}</option>
                  <option>{content.businessWebsiteOption}</option>
                  <option>{content.webApplicationOption}</option>
                  <option>{content.mobileApplicationOption}</option>
                  <option>{content.ecommerceOption}</option>
                  <option>{content.apiOption}</option>
                  <option>{content.otherProjectOption}</option>
                </select>
              </div>
              <div>
                <label htmlFor="inquiry-timeline" className="mb-1.5 block text-sm font-medium text-slate-300">{content.timelineLabel}</label>
                <input id="inquiry-timeline" name="timeline" type="text" value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={content.timelinePlaceholder} />
              </div>
              <div>
                <label htmlFor="inquiry-message" className="mb-1.5 block text-sm font-medium text-slate-300">{content.messageLabel}</label>
                <textarea id="inquiry-message" name="message" required rows={6} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder={content.messagePlaceholder} />
              </div>
              <button type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:opacity-50">
                {sent ? content.sentButton : email ? content.sendButton : 'Continue in WhatsApp'}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50 mb-6">{content.contactInfoTitle}</h2>
              <div className="space-y-4">
                {email && <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaEnvelope /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.emailInfoLabel}</p>
                    <a href={`mailto:${email}`} className="text-sm font-medium text-slate-200 hover:text-blue-300 transition">{email}</a>
                  </div>
                </div>}
                {phone && <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaPhone /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.phoneInfoLabel}</p>
                    <p className="text-sm font-medium text-slate-200">{phone || ''}</p>
                  </div>
                </div>}
                {location && <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaMapMarkerAlt /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.locationInfoLabel}</p>
                    <p className="text-sm font-medium text-slate-200">{location || ''}</p>
                  </div>
                </div>}
              </div>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50">{content.nextStepTitle}</h2>
              <ol className="mt-5 space-y-4">
                {[content.nextStep1, content.nextStep2, content.nextStep3].filter(Boolean).map((step, index) => <li key={index} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-500/15 text-xs font-semibold text-blue-300">{index + 1}</span>
                  <span>{step}</span>
                </li>)}
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">{content.socialTitle}</h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.github && <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaGithub className="h-5 w-5" /> GitHub
                </a>}
                {socialLinks.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaLinkedin className="h-5 w-5" /> LinkedIn
                </a>}
                {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="X / Twitter"
                  className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaTwitter className="h-5 w-5" /> X / Twitter
                </a>}
                {email && <a href={`mailto:${email}`} aria-label="Email"
                  className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/50 px-4 py-3 text-sm text-slate-200 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaEnvelope className="h-5 w-5" /> Email
                </a>}
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                  className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200 hover:border-green-400/60 hover:bg-green-500/15 transition">
                  <FaWhatsapp className="h-5 w-5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
