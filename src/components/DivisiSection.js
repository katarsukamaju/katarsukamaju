import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiUsers, FiX } from 'react-icons/fi';

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
    if (selected) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = '' };
  }, [selected]);

  return (
    <section id="divisi" className="py-24 px-4 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">04 / {t('divisi_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{t('divisi_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t('divisi_subtitle')}</p>
          <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {divisions.map(div => (
            <button key={div.id} onClick={() => setSelected(div)}
              className="group text-left bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FiUsers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{div.division}</h3>
              <p className="text-sm text-gray-400 dark:text-gray-500">{div.members.length} {t('members')}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white dark:bg-gray-800 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{selected.division}</h2>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {selected.members.map((m, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <img
                    src={`/storage/profile/${m.slug}.jpg`}
                    alt={m.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-gray-600"
                    onError={e => { e.target.src = '/storage/profile/default-avatar.svg'; e.target.onerror = null }}
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{m.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{m.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            .animate-slide-up { animation: slideUp 0.3s ease-out; }
            @media (min-width: 640px) {
              @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
