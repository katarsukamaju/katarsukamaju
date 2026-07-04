import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiClock, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';

const statusConfig = {
  upcoming: { icon: FiClock, label: 'program_upcoming', class: 'bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40' },
  ongoing: { icon: FiRefreshCw, label: 'program_ongoing', class: 'bg-emerald-50 dark:bg-emerald-900/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40' },
  completed: { icon: FiCheckCircle, label: 'program_completed', class: 'bg-blue-50 dark:bg-blue-900/15 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40' },
};

export default function ProgramSection() {
  const { t } = useTranslation();
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
    <section id="program" className="relative py-28 px-6 bg-white dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('program_label')}
          </span>
          <h2 className="section-title">{t('program_title')}</h2>
          <p className="section-subtitle">{t('program_subtitle')}</p>
          <div className="section-divider" />
        </div>

        {sorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-gray-500 text-sm tracking-wide">{t('program_empty')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sorted.map(p => {
              const cfg = statusConfig[p.status] || statusConfig.upcoming;
              const Icon = cfg.icon;
              return (
                <div key={p.id} className="card-hover p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-[17px] font-semibold text-gray-900 dark:text-white leading-snug tracking-tight">{p.title}</h3>
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap ${cfg.class}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {t(cfg.label)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed tracking-wide">{p.description}</p>
                  <div className="flex items-center gap-3 text-[12px] font-medium text-gray-400 dark:text-gray-500 tracking-wide">
                    <span>{p.startDate || '—'}</span>
                    <span className="text-gray-300 dark:text-gray-600">/</span>
                    <span>{p.endDate || '—'}</span>
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
