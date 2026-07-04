import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiClock, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

const statusConfig = {
  upcoming: { icon: FiClock, label: 'Akan Datang', label_en: 'Upcoming', class: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' },
  ongoing: { icon: FiRefreshCw, label: 'Berjalan', label_en: 'Ongoing', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' },
  completed: { icon: FiCheckCircle, label: 'Selesai', label_en: 'Completed', class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' },
};

export default function ProgramSection() {
  const { t, lang } = useTranslation();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch('/data/programs.json')
      .then(r => r.json())
      .then(setPrograms)
      .catch(() => setPrograms([]));
  }, []);

  const statusOrder = { ongoing: 0, upcoming: 1, completed: 2 };
  const sorted = [...programs].sort((a, b) => (statusOrder[a.status] || 9) - (statusOrder[b.status] || 9));

  return (
    <section id="program" className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">03 / {t('program_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{t('program_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t('program_subtitle')}</p>
          <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto mt-4" />
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p>{t('program_empty')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map(p => {
              const cfg = statusConfig[p.status] || statusConfig.upcoming;
              const Icon = cfg.icon;
              return (
                <div key={p.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white">{p.title}</h3>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.class}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {lang === 'id' ? cfg.label : cfg.label_en}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{p.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <span>{p.startDate}</span>
                    <span>—</span>
                    <span>{p.endDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
