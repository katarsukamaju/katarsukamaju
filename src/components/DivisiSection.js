import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiUsers, FiX, FiChevronRight } from 'react-icons/fi';

export default function DivisiSection() {
  const { t } = useTranslation();
  const [divisions, setDivisions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/data/members.json')
      .then(r => r.json())
      .then(setDivisions)
      .catch(() => setDivisions([]));
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [selected]);

  return (
    <section id="divisi" className="relative py-28 px-6 bg-gray-50/80 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('divisi_label')}
          </span>
          <h2 className="section-title">{t('divisi_title')}</h2>
          <p className="section-subtitle">{t('divisi_subtitle')}</p>
          <div className="section-divider" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {divisions.map(div => (
            <button key={div.id} onClick={() => setSelected(div)}
              className="card-hover p-6 text-left">
              <div className="w-11 h-11 bg-primary-50 dark:bg-primary-900/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                <FiUsers className="w-5.5 h-5.5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5 leading-snug">{div.division}</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500 tracking-wide">{div.members.length} {t('members')}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white dark:bg-surface-850 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto shadow-elevated animate-slide-up">
            <div className="sticky top-0 bg-white dark:bg-surface-850 border-b border-gray-100 dark:border-gray-700/30 px-6 py-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">{selected.division}</h2>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-surface-800 text-gray-400 dark:text-gray-500 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              {selected.members.map((m, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-surface-800/50 transition-colors">
                  <img
                    src={`/storage/profile/${m.slug}.jpg`}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100 dark:bg-surface-800 ring-2 ring-gray-100 dark:ring-gray-700/50"
                    onError={e => { e.target.src = '/storage/profile/default-avatar.svg'; e.target.onerror = null }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{m.name}</p>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">{m.position}</p>
                  </div>
                  <FiChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
