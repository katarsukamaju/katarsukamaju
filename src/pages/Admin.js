import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FiSave, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiUsers, FiImage, FiCalendar, FiSettings } from 'react-icons/fi';

const tabs = [
  { key: 'members', icon: FiUsers },
  { key: 'gallery', icon: FiImage },
  { key: 'programs', icon: FiCalendar },
  { key: 'settings', icon: FiSettings },
];

export default function Admin() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useApp();
  const [tab, setTab] = useState('members');
  const [toast, setToast] = useState(null);

  const [memberForm, setMemberForm] = useState({ name: '', division: '', position: '', photo: null });
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image: '' });
  const [programForm, setProgramForm] = useState({ title: '', description: '', status: 'upcoming', startDate: '', endDate: '' });
  const [settingsForm, setSettingsForm] = useState({ whatsapp: '', instagram: '', email: '' });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.division || !memberForm.position) {
      showToast('error', 'Semua field wajib diisi');
      return;
    }
    const slug = memberForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let photoBase64 = null;
    if (memberForm.photo) {
      photoBase64 = await fileToBase64(memberForm.photo);
    }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'member', name: memberForm.name, division: memberForm.division, position: memberForm.position, slug, photo: photoBase64 })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
        setMemberForm({ name: '', division: '', position: '', photo: null });
      } else showToast('error', data.error || t('admin_error'));
    } catch {
      showToast('error', t('admin_error'));
    }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) {
      showToast('error', 'Judul dan URL gambar wajib diisi');
      return;
    }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'gallery', ...galleryForm })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
        setGalleryForm({ title: '', description: '', image: '' });
      } else showToast('error', data.error || t('admin_error'));
    } catch {
      showToast('error', t('admin_error'));
    }
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    if (!programForm.title) {
      showToast('error', 'Nama program wajib diisi');
      return;
    }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'program', ...programForm })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
        setProgramForm({ title: '', description: '', status: 'upcoming', startDate: '', endDate: '' });
      } else showToast('error', data.error || t('admin_error'));
    } catch {
      showToast('error', t('admin_error'));
    }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    if (!settingsForm.whatsapp && !settingsForm.instagram && !settingsForm.email) {
      showToast('error', 'Isi minimal satu field');
      return;
    }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'settings', ...settingsForm })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
      } else showToast('error', data.error || t('admin_error'));
    } catch {
      showToast('error', t('admin_error'));
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FiArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{t('admin_title')}</span>
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
            {theme === 'light' ? <FiSettings className="w-4 h-4" /> : <FiSettings className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${tab === t.key ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                <Icon className="w-4 h-4" /> {t('admin_' + t.key + '_tab')}
              </button>
            );
          })}
        </div>

        {tab === 'members' && (
          <form onSubmit={handleMemberSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className={labelClass}>{t('admin_member_name')}</label>
              <input type="text" value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_member_division')}</label>
              <input type="text" value={memberForm.division} onChange={e => setMemberForm(f => ({ ...f, division: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_member_position')}</label>
              <input type="text" value={memberForm.position} onChange={e => setMemberForm(f => ({ ...f, position: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_member_photo')}</label>
              <input type="file" accept="image/*" onChange={e => setMemberForm(f => ({ ...f, photo: e.target.files[0] || null }))}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 dark:file:bg-primary-900/30 file:text-primary-600 dark:file:text-primary-400 hover:file:bg-primary-100 dark:hover:file:bg-primary-900/50 transition-colors" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <FiSave className="w-4 h-4" /> {t('admin_save')}
            </button>
          </form>
        )}

        {tab === 'gallery' && (
          <form onSubmit={handleGallerySubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className={labelClass}>{t('admin_gallery_title')}</label>
              <input type="text" value={galleryForm.title} onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_gallery_desc')}</label>
              <textarea value={galleryForm.description} onChange={e => setGalleryForm(f => ({ ...f, description: e.target.value }))} rows={3} className={inputClass + " resize-none"} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_gallery_image')}</label>
              <input type="text" value={galleryForm.image} onChange={e => setGalleryForm(f => ({ ...f, image: e.target.value }))} placeholder="/storage/gallery/foto.jpg" className={inputClass} />
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <FiSave className="w-4 h-4" /> {t('admin_save')}
            </button>
          </form>
        )}

        {tab === 'programs' && (
          <form onSubmit={handleProgramSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className={labelClass}>{t('admin_program_title')}</label>
              <input type="text" value={programForm.title} onChange={e => setProgramForm(f => ({ ...f, title: e.target.value }))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_program_desc')}</label>
              <textarea value={programForm.description} onChange={e => setProgramForm(f => ({ ...f, description: e.target.value }))} rows={3} className={inputClass + " resize-none"} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_program_status')}</label>
              <select value={programForm.status} onChange={e => setProgramForm(f => ({ ...f, status: e.target.value }))} className={inputClass}>
                <option value="upcoming">{t('admin_program_upcoming')}</option>
                <option value="ongoing">{t('admin_program_ongoing')}</option>
                <option value="completed">{t('admin_program_completed')}</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t('admin_program_start')}</label>
                <input type="date" value={programForm.startDate} onChange={e => setProgramForm(f => ({ ...f, startDate: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t('admin_program_end')}</label>
                <input type="date" value={programForm.endDate} onChange={e => setProgramForm(f => ({ ...f, endDate: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <FiSave className="w-4 h-4" /> {t('admin_save')}
            </button>
          </form>
        )}

        {tab === 'settings' && (
          <form onSubmit={handleSettingsSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className={labelClass}>{t('admin_wp')}</label>
              <input type="text" value={settingsForm.whatsapp} onChange={e => setSettingsForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="085817048266" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_ig')}</label>
              <input type="text" value={settingsForm.instagram} onChange={e => setSettingsForm(f => ({ ...f, instagram: e.target.value }))} placeholder="eexxvvn" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('admin_email')}</label>
              <input type="email" value={settingsForm.email} onChange={e => setSettingsForm(f => ({ ...f, email: e.target.value }))} placeholder="karangtarunasukamaju64@gmail.com" className={inputClass} />
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <FiSave className="w-4 h-4" /> {t('admin_save')}
            </button>
          </form>
        )}
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all duration-300 ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.type === 'success' ? <FiCheckCircle className="w-4 h-4" /> : <FiAlertCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}
    </div>
  );
}
