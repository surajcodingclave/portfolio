import { createContext, useContext } from 'react';
import { getSiteContent } from './siteContent';

const SiteContext = createContext(null);
export const SiteProvider = SiteContext.Provider;

export function useSite() {
  const siteInfo = useContext(SiteContext);
  return { siteInfo, content: getSiteContent(siteInfo) };
}
