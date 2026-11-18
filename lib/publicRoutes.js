export const publicRoutes = {
  home: '/',
  about: '/about',
  services: '/services',
  skills: '/skills',
  experience: '/experience',
  projects: '/projects',
  contact: '/contact',
};

export function siteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL) {
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? url.origin
      : '';
  } catch {
    return '';
  }
}

export function publicUrl(value, origin) {
  if (!value) return '';
  try {
    const url = new URL(value, origin || undefined);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}
