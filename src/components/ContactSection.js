import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiSend, FiMail, FiPhone, FiInstagram, FiMapPin, FiArrowUpRight } from 'react-icons/fi';

export default function ContactSection() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch('/data/settings.json')
      .then(r => r.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;
    setSending(true);
    const history = JSON.parse(localStorage.getItem('contact_history') || '[]');
    history.push({ ...form, date: new Date().toISOString() });
    localStorage.setItem('contact_history', JSON.stringify(history));
    const wa = settings?.whatsapp || '085817048266';
    const text = encodeURIComponent(
      `Halo, saya ${form.name}.\n\n${form.message}\n\nEmail: ${form.email || '-'}\n---\nPesan dikirim melalui website Karang Taruna Sukamaju.`
    );
    window.open(`https://wa.me/${wa}?text=${text}`, '_blank');
    setTimeout(() => { setSending(false); setForm({ name: '', email: '', message: '' }); }, 500);
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-white dark:bg-surface-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('contact_label')}
          </span>
          <h2 className="section-title">{t('contact_title')}</h2>
          <p className="section-subtitle">{t('contact_subtitle')}</p>
          <div className="section-divider" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-7">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 tracking-wide">{t('contact_info')}</h3>
              <div className="space-y-5">
                {settings && (
                  <>
                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                      <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-900/15 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FiPhone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold tracking-wide">WhatsApp</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">+{settings.whatsapp}</p>
                      </div>
                      <FiArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                    </a>
                    <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                      <div className="w-11 h-11 bg-pink-50 dark:bg-pink-900/15 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FiInstagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold tracking-wide">Instagram</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">@{settings.instagram}</p>
                      </div>
                      <FiArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-pink-500 transition-colors flex-shrink-0" />
                    </a>
                    <a href={`mailto:${settings.email}`}
                      className="group flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <div className="w-11 h-11 bg-blue-50 dark:bg-blue-900/15 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FiMail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold tracking-wide">Email</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{settings.email}</p>
                      </div>
                      <FiArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    </a>
                  </>
                )}
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                  <div className="w-11 h-11 bg-gray-100 dark:bg-surface-800 rounded-xl flex items-center justify-center">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold tracking-wide">{t('contact_location')}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t('contact_location_val')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card-base p-7 lg:p-9 space-y-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">{t('contact_form')}</h3>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder={t('contact_form_name')}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 outline-none transition-all text-sm tracking-wide" />
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder={t('contact_form_email')}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 outline-none transition-all text-sm tracking-wide" />
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4}
                placeholder={t('contact_form_message')}
                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-surface-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500/25 focus:border-primary-500 outline-none transition-all text-sm tracking-wide resize-none" />
              <button type="submit" disabled={sending || !form.name || !form.message}
                className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-surface-800 dark:disabled:text-gray-500 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/25 disabled:shadow-none">
                <FiSend className={`w-4 h-4 ${sending ? 'animate-pulse' : ''}`} />
                {sending ? t('contact_sending') : t('contact_send')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
