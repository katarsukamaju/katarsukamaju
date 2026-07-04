import { useTranslation } from '../i18n/useTranslation';
import { FiTarget, FiEye } from 'react-icons/fi';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="relative py-28 px-6 bg-white dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('about_label')}
          </span>
          <h2 className="section-title">{t('about_title')}</h2>
          <p className="section-subtitle">{t('about_subtitle')}</p>
          <div className="section-divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="group relative bg-gradient-to-br from-gray-50/80 to-white dark:from-surface-800 dark:to-surface-800/50 rounded-3xl p-8 lg:p-10 shadow-subtle border border-gray-100 dark:border-gray-700/30 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-0.5">
            <div className="absolute -top-3 -right-3 w-24 h-24 bg-primary-500/5 dark:bg-primary-400/5 rounded-full blur-3xl" />
            <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FiTarget className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-heading-4 font-semibold text-gray-900 dark:text-white mb-4">{t('visi_title')}</h3>
            <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 tracking-wide">
              {t('visi_text')}
            </p>
          </div>

          <div className="group relative bg-gradient-to-br from-gray-50/80 to-white dark:from-surface-800 dark:to-surface-800/50 rounded-3xl p-8 lg:p-10 shadow-subtle border border-gray-100 dark:border-gray-700/30 transition-all duration-500 hover:shadow-card-hover hover:-translate-y-0.5">
            <div className="absolute -top-3 -left-3 w-24 h-24 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl" />
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FiEye className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-heading-4 font-semibold text-gray-900 dark:text-white mb-4">{t('misi_title')}</h3>
            <ul className="space-y-4">
              {[0, 1, 2].map(i => {
                const items = t('misi_items');
                return Array.isArray(items) && items[i] ? (
                  <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 dark:bg-primary-400 mt-2 flex-shrink-0" />
                    <span>{items[i]}</span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
