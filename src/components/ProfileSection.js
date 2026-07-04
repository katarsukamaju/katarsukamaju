import { useTranslation } from '../i18n/useTranslation';
import { FiTarget, FiEye } from 'react-icons/fi';

export default function ProfileSection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:border dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-4">
              <FiTarget className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('visi_title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{t('visi_text')}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg dark:border dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4">
              <FiEye className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('misi_title')}</h3>
            <ul className="space-y-2">
              {[0, 1, 2].map(i => (
                <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 flex-shrink-0" />
                  <span>{t('misi_items')?.[i] || ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
