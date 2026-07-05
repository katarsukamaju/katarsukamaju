import { useTranslation } from '../i18n/useTranslation';
import { FiExternalLink, FiMonitor, FiSmartphone, FiGlobe } from 'react-icons/fi';

const serviceKeys = ['services_web', 'services_design', 'services_system'];
const serviceIcons = [FiMonitor, FiSmartphone, FiGlobe];

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="layanan" className="relative py-28 px-6 bg-white dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('services_label')}
          </span>
          <h2 className="section-title">{t('services_title')}</h2>
          <p className="section-subtitle">{t('services_subtitle')}</p>
          <div className="section-divider" />
        </div>

        <div className="max-w-3xl mx-auto">
          <a href="https://sukamajuhub.vercel.app" target="_blank" rel="noopener noreferrer"
            className="group block bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 rounded-3xl p-8 lg:p-10 text-white shadow-2xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-500 hover:-translate-y-1">
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-black tracking-tight">SH</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white/70 tracking-wider uppercase">{t('services_portal_name')}</p>
                <p className="text-lg font-bold">{t('services_portal_title')}</p>
              </div>
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
              {t('services_description')}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {serviceKeys.map((key, i) => {
                const Icon = serviceIcons[i];
                return (
                  <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                    <Icon className="w-5 h-5 text-white/70 flex-shrink-0" />
                    <span className="text-sm font-medium text-white/90">{t(key)}</span>
                  </div>
                );
              })}
            </div>

            <div className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-primary-700 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 group-hover:bg-white/90 group-hover:gap-3">
              {t('services_cta')}
              <FiExternalLink className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
