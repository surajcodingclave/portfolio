import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactForm({ email, phone, location, content, socialLinks }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailto = `mailto:${email || 'suraj@example.com'}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
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
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-50 mb-6">{content.formTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">{content.nameLabel}</label>
                <input type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">{content.emailLabel}</label>
                <input type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="john@example.com" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">{content.subjectLabel}</label>
                <input type="text" required value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Project inquiry" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">{content.messageLabel}</label>
                <textarea required rows={5} value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Tell me about your project..." />
              </div>
              <button type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-500 hover:to-blue-400">
                {sent ? content.sentButton : content.sendButton}
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50 mb-6">{content.contactInfoTitle}</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaEnvelope /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.emailInfoLabel}</p>
                    <a href={`mailto:${email || 'suraj@example.com'}`} className="text-sm font-medium text-slate-200 hover:text-blue-300 transition">{email || 'suraj@example.com'}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaPhone /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.phoneInfoLabel}</p>
                    <p className="text-sm font-medium text-slate-200">{phone || '+91 XXXXX XXXXX'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-blue-400"><FaMapMarkerAlt /></div>
                  <div>
                    <p className="text-sm text-slate-400">{content.locationInfoLabel}</p>
                    <p className="text-sm font-medium text-slate-200">{location || 'India'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/55 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-50 mb-4">{content.socialTitle}</h2>
              <div className="flex gap-3">
                <a href={socialLinks.github || 'https://github.com/'} target="_blank" rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaGithub className="h-5 w-5" />
                </a>
                <a href={socialLinks.linkedin || 'https://linkedin.com/'} target="_blank" rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaLinkedin className="h-5 w-5" />
                </a>
                <a href={socialLinks.twitter || 'https://twitter.com/'} target="_blank" rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a href={`mailto:${email}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/60 bg-slate-800/50 text-slate-400 hover:border-blue-500/50 hover:text-blue-300 transition">
                  <FaEnvelope className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
