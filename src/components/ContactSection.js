import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiSend, FiMail, FiPhone, FiInstagram, FiMapPin } from 'react-icons/fi';

export default function ContactSection() {
  const { t, lang } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  useEffect(() => {
    fetch('/data/settings.json')
      .then(r => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    const history = JSON.parse(localStorage.getItem('contact_history') || '[]');
    history.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('contact_history', JSON.stringify(history));

    const wa = settings?.whatsapp || '085817048266';
    const text = encodeURIComponent(
      `Halo Karang Taruna Sukamaju,\n\nNama: ${form.name}\nEmail: ${form.email}\nPesan: ${form.message}\n\nDikirim dari website.`
    );
    window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">05 / {t('contact_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{t('contact_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t('contact_subtitle')}</p>
          <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">{t('contact_info')}</h3>
              <div className="space-y-4">
                {settings && (
                  <>
                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <FiPhone className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm">+{settings.whatsapp}</span>
                    </a>
                    <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <FiInstagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <span className="text-sm">@{settings.instagram}</span>
                    </a>
                    <a href={`mailto:${settings.email}`}
                      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm">{settings.email}</span>
                    </a>
                  </>
                )}
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <span className="text-sm">Sukamaju, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{t('contact_form')}</h3>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={lang === 'id' ? 'Nama Anda' : 'Your Name'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder={lang === 'id' ? 'Email Anda' : 'Your Email'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm" />
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                placeholder={lang === 'id' ? 'Pesan Anda' : 'Your Message'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm resize-none" />
              <button type="submit"
                className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FiSend className="w-4 h-4" /> {t('contact_send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
