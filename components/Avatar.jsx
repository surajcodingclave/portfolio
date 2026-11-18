import { useState } from 'react';

export default function Avatar({ src, name = 'Suraj Gupta', alt = name, priority }) {
  const [failedSource, setFailedSource] = useState('');
  const frame = 'relative h-48 w-48 rounded-full border-2 border-slate-700/50 sm:h-56 sm:w-56 lg:h-72 lg:w-72';
  if (!src || src === '/images/profile.png' || failedSource === src) {
    const initials = name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('');
    return (
      <span aria-hidden="true" className={frame + ' grid place-items-center bg-slate-900 font-display text-5xl font-bold text-blue-400'}>
        {initials}
      </span>
    );
  }
  return (
    <img src={src} alt={alt} width={288} height={288} decoding="async"
      fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailedSource(src)}
      className={frame + ' object-cover shadow-2xl'} />
  );
}
