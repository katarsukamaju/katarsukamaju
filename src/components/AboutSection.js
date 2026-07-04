import { useTranslation } from '../i18n/useTranslation';
import { FiTarget, FiEye } from 'react-icons/fi';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">01 / {t('about_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{t('visi_title')} & {t('misi_title')}</h2>
          <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-lg dark:border dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <FiTarget className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('visi_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">{t('visi_text')}</p>
          </div>

          <div className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 shadow-lg dark:border dark:border-gray-700 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <FiEye className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('misi_title')}</h3>
            <ul className="space-y-3">
              {[0, 1, 2].map(i => {
                const items = t('misi_items');
                return Array.isArray(items) && items[i] ? (
                  <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
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
