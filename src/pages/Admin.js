import { useState } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import Header from '../components/Header';
import { FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function Admin() {
  const { t } = useTranslation();
  const [tab, setTab] = useState('members');
  const [toast, setToast] = useState(null);

  const [memberForm, setMemberForm] = useState({ name: '', division: '', position: '', photo: null });
  const [settingsForm, setSettingsForm] = useState({ whatsapp: '', instagram: '', email: '' });

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

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
        body: JSON.stringify({
          type: 'member',
          name: memberForm.name,
          division: memberForm.division,
          position: memberForm.position,
          slug,
          photo: photoBase64
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
        setMemberForm({ name: '', division: '', position: '', photo: null });
      } else {
        showToast('error', data.error || t('admin_error'));
      }
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
        body: JSON.stringify({
          type: 'settings',
          whatsapp: settingsForm.whatsapp,
          instagram: settingsForm.instagram,
          email: settingsForm.email
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', t('admin_success'));
      } else {
        showToast('error', data.error || t('admin_error'));
      }
    } catch {
      showToast('error', t('admin_error'));
    }
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <div className="pt-24 px-4 max-w-2xl mx-auto pb-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('admin_title')}</h1>

        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8">
          <button onClick={() => setTab('members')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${tab === 'members' ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t('admin_members_tab')}
          </button>
          <button onClick={() => setTab('settings')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${tab === 'settings' ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
            {t('admin_settings_tab')}
          </button>
        </div>

        {tab === 'members' ? (
          <form onSubmit={handleMemberSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_member_name')}</label>
              <input type="text" value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_member_division')}</label>
              <input type="text" value={memberForm.division} onChange={e => setMemberForm(f => ({ ...f, division: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_member_position')}</label>
              <input type="text" value={memberForm.position} onChange={e => setMemberForm(f => ({ ...f, position: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_member_photo')}</label>
              <input type="file" accept="image/*" onChange={e => setMemberForm(f => ({ ...f, photo: e.target.files[0] || null }))}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 dark:file:bg-primary-900/30 file:text-primary-600 dark:file:text-primary-400 hover:file:bg-primary-100 dark:hover:file:bg-primary-900/50 transition-colors" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
              <FiSave className="w-4 h-4" /> {t('admin_save')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSettingsSubmit} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_wp')}</label>
              <input type="text" value={settingsForm.whatsapp} onChange={e => setSettingsForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="085817048266"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_ig')}</label>
              <input type="text" value={settingsForm.instagram} onChange={e => setSettingsForm(f => ({ ...f, instagram: e.target.value }))} placeholder="eexxvvn"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('admin_email')}</label>
              <input type="email" value={settingsForm.email} onChange={e => setSettingsForm(f => ({ ...f, email: e.target.value }))} placeholder="karangtarunasukamaju64@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
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
