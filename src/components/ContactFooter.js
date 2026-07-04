import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiMail, FiPhone, FiInstagram } from 'react-icons/fi';

export default function ContactFooter() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/data/settings.json')
      .then(r => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  if (!settings) return null;

  const contacts = [
    { icon: FiPhone, href: `https://wa.me/${settings.whatsapp}`, label: `+${settings.whatsapp}`, color: 'hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600' },
    { icon: FiInstagram, href: `https://instagram.com/${settings.instagram}`, label: `@${settings.instagram}`, color: 'hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600' },
    { icon: FiMail, href: `mailto:${settings.email}`, label: settings.email, color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('contact_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('contact_subtitle')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {contacts.map((c, i) => (
            <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-md ${c.color}`}>
              <c.icon className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{c.label}</span>
            </a>
          ))}
        </div>

        <div className="text-center text-sm text-gray-400 dark:text-gray-500">
          {t('footer_text')}
        </div>
      </div>
    </footer>
  );
}
