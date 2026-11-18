import { useState } from 'react';
import { defaultSiteContent, themeColors, themeStyle } from '../../lib/siteContent';
import { publicRoutes } from '../../lib/publicRoutes';

const fieldClass = 'w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-slate-100 focus:border-blue-500';
const panel = 'rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8';

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block text-sm text-slate-300">
      <span className="mb-1.5 block">{label}</span>
      <input className={fieldClass} value={value || ''} onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder} />
    </label>
  );
}

function ImageField({ label, value, onChange, setNotice, onBusy }) {
  const [uploading, setUploading] = useState(false);

  async function upload(event) {
    const file = event.target.files[0];
    event.target.value = '';
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    setUploading(true);
    onBusy(true);
    try {
      const response = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed.');
      onChange(data.url);
      setNotice({ text: 'Image uploaded. Save changes to publish it.' });
    } catch (error) {
      setNotice({ text: error.message, error: true });
    } finally {
      setUploading(false);
      onBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <Field label={label + ' URL'} value={value} onChange={onChange} placeholder="https://…" />
      <label className="block text-sm text-slate-300">
        <span className="mb-1 block">{uploading ? 'Uploading…' : 'Upload ' + label.toLowerCase()}</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={upload} className="w-full text-sm" />
      </label>
    </div>
  );
}

export default function SiteSettings({ tab, siteForm, update, save, saving, setNotice }) {
  const { siteContent } = siteForm;
  const [page, setPage] = useState('home');
  const [uploads, setUploads] = useState(0);
  const onBusy = (busy) => setUploads((current) => current + (busy ? 1 : -1));
  const field = (section, key, label) => <Field label={label} value={siteContent[section][key]} onChange={(value) => update(section, key, value)} />;
  const image = (section, key, label) => <ImageField label={label} value={siteContent[section][key]}
    onChange={(value) => update(section, key, value)} setNotice={setNotice} onBusy={onBusy} />;

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      {tab === 'appearance' ? (
        <>
          <section className={panel}>
            <h2 className="mb-2 text-xl font-bold">Theme colors</h2>
            <p className="mb-6 text-sm text-slate-400">Choose base colors for the public website. Reset a color to restore its original palette.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(themeColors).map(([key, fallback]) => (
                <div key={key} className="flex items-center gap-3 rounded-lg border border-slate-700 p-3">
                  <label className="flex flex-1 items-center gap-3 text-sm capitalize">
                    <input type="color" value={siteContent.appearance[key] || fallback} className="h-8 w-10 cursor-pointer bg-transparent"
                      onChange={(event) => update('appearance', key, event.target.value)} />
                    {key}
                  </label>
                  <button type="button" onClick={() => update('appearance', key, '')} className="text-xs text-blue-300">Reset</button>
                </div>
              ))}
            </div>
            <div style={themeStyle(siteForm)} className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-5">
              <p className="text-sm text-slate-300">Theme preview</p>
              <p className="text-xl font-bold text-slate-50">{siteForm.name || 'Portfolio'}</p>
              <span className="mt-3 inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white">Button</span>
              <span className="ml-3 text-sm text-cyan-400">Highlight</span>
            </div>
          </section>
          <section className={panel + ' space-y-4'}>
            <h2 className="text-xl font-bold">Site images</h2>
            {image('seo', 'favicon', 'Browser icon')}
            {image('about', 'imageUrl', 'About photo')}
            {field('about', 'imageAlt', 'About photo alternative text')}
            {image('home', 'imageUrl', 'Home photo override')}
            {field('home', 'imageAlt', 'Home photo alternative text')}
          </section>
        </>
      ) : (
        <>
          <section className={panel + ' space-y-4'}>
            <h2 className="text-xl font-bold">Search and sharing settings</h2>
            <p className="text-sm text-slate-400">Set the live public URL to generate canonical links and the XML sitemap.</p>
            <Field label="Public site URL" value={siteContent.seo.siteUrl} placeholder="https://your-domain.com"
              onChange={(value) => update('seo', 'siteUrl', value)} />
            {image('seo', 'shareImage', 'Default sharing image')}
          </section>
          <section className={panel + ' space-y-4'}>
            <h2 className="text-xl font-bold">Page metadata</h2>
            <label className="block text-sm text-slate-300">
              <span className="mb-1.5 block">Public page</span>
              <select className={fieldClass} value={page} disabled={uploads > 0} onChange={(event) => setPage(event.target.value)}>
                {Object.keys(publicRoutes).map((key) => (
                  <option key={key} value={key}>{defaultSiteContent.navigation[key + 'Label']}</option>
                ))}
              </select>
            </label>
            {field(page, 'metaTitle', 'SEO title')}
            {field(page, 'metaDescription', 'SEO description')}
            {image(page, 'shareImage', 'Page sharing image')}
          </section>
        </>
      )}
      <button type="submit" disabled={saving || uploads > 0} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white disabled:opacity-50">
        {saving ? 'Publishing…' : 'Save changes'}
      </button>
    </form>
  );
}
