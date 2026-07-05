import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { Link } from 'react-router-dom';
import { FiSave, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiUsers, FiImage, FiCalendar, FiSettings, FiRefreshCw } from 'react-icons/fi';

const tabs = [
  { key: 'members', icon: FiUsers },
  { key: 'gallery', icon: FiImage },
  { key: 'programs', icon: FiCalendar },
  { key: 'settings', icon: FiSettings },
];

export default function Admin() {
  const { t: tr } = useTranslation();
  const [tab, setTab] = useState('members');
  const [toast, setToast] = useState(null);
  const [data, setData] = useState({ members: [], gallery: [], programs: [], settings: null });

  const [memberForm, setMemberForm] = useState({ name: '', division: '', position: '', photo: null });
  const [galleryForm, setGalleryForm] = useState({ title: '', description: '', image: '' });
  const [programForm, setProgramForm] = useState({ title: '', description: '', status: 'upcoming', startDate: '', endDate: '' });
  const [settingsForm, setSettingsForm] = useState({ whatsapp: '', instagram: '', email: '' });

  const loadData = () => {
    fetch('/data/members.json').then(r => r.json()).then(d => setData(p => ({ ...p, members: d }))).catch(() => {});
    fetch('/data/gallery.json').then(r => r.json()).then(d => setData(p => ({ ...p, gallery: d }))).catch(() => {});
    fetch('/data/programs.json').then(r => r.json()).then(d => setData(p => ({ ...p, programs: d }))).catch(() => {});
    fetch('/data/settings.json').then(r => r.json()).then(d => {
      setData(p => ({ ...p, settings: d }));
      setSettingsForm({ whatsapp: d.whatsapp || '', instagram: d.instagram || '', email: d.email || '' });
    }).catch(() => {});
  };

  useEffect(() => { loadData() }, []);

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
      showToast('error', tr('admin_field_required'));
      return;
    }
    const slug = memberForm.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    let photoBase64 = null;
    if (memberForm.photo) photoBase64 = await fileToBase64(memberForm.photo);
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'member', name: memberForm.name, division: memberForm.division, position: memberForm.position, slug, photo: photoBase64 })
      });
      const d = await res.json();
      if (d.success) { showToast('success', tr('admin_success')); setMemberForm({ name: '', division: '', position: '', photo: null }); loadData(); }
      else showToast('error', d.error || tr('admin_error'));
    } catch { showToast('error', tr('admin_error')); }
  };

  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.image) { showToast('error', tr('admin_field_image_required')); return; }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'gallery', ...galleryForm })
      });
      const d = await res.json();
      if (d.success) { showToast('success', tr('admin_success')); setGalleryForm({ title: '', description: '', image: '' }); loadData(); }
      else showToast('error', d.error || tr('admin_error'));
    } catch { showToast('error', tr('admin_error')); }
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    if (!programForm.title) { showToast('error', tr('admin_field_name_required')); return; }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'program', ...programForm })
      });
      const d = await res.json();
      if (d.success) { showToast('success', tr('admin_success')); setProgramForm({ title: '', description: '', status: 'upcoming', startDate: '', endDate: '' }); loadData(); }
      else showToast('error', d.error || tr('admin_error'));
    } catch { showToast('error', tr('admin_error')); }
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    if (!settingsForm.whatsapp && !settingsForm.instagram && !settingsForm.email) { showToast('error', tr('admin_field_min_one')); return; }
    try {
      const res = await fetch('/api/github-commit', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'settings', ...settingsForm })
      });
      const d = await res.json();
      if (d.success) { showToast('success', tr('admin_success')); loadData(); }
      else showToast('error', d.error || tr('admin_error'));
    } catch { showToast('error', tr('admin_error')); }
  };

  const card = "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg dark:border dark:border-gray-700";
  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const statusBadge = (status) => {
    const cls = status === 'ongoing' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
      status === 'upcoming' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' :
      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    return <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${cls}`}>{tr('admin_program_' + status)}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <FiArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">{tr('admin_title')}</span>
          </Link>
          <button onClick={loadData} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors" title="Refresh">
            <FiRefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6 pb-12">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setTab(item.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${tab === item.key ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                <Icon className="w-4 h-4" /> {tr('admin_' + item.key + '_tab')}
              </button>
            );
          })}
        </div>

        {tab === 'members' && (
          <div className="space-y-6">
            <div className={card}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">{tr('admin_current_members')}</h3>
              {data.members.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">{tr('admin_empty_members')}</p>
              ) : (
                <div className="space-y-3">
                  {data.members.map(div => (
                    <div key={div.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">{div.division} ({tr('admin_member_count').replace('{count}', div.members.length)})</p>
                      <div className="space-y-1.5">
                        {div.members.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
                            <span className="font-medium">{m.name}</span>
                            <span className="text-gray-400 dark:text-gray-500">— {m.position}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleMemberSubmit} className={card + " space-y-4"}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{tr('admin_add_member')}</h3>
              <div><label className={labelClass}>{tr('admin_member_name')}</label><input type="text" value={memberForm.name} onChange={e => setMemberForm(f => ({ ...f, name: e.target.value }))} className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_member_division')}</label><input type="text" value={memberForm.division} onChange={e => setMemberForm(f => ({ ...f, division: e.target.value }))} className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_member_position')}</label><input type="text" value={memberForm.position} onChange={e => setMemberForm(f => ({ ...f, position: e.target.value }))} className={inputClass} /></div>
              <div>
                <label className={labelClass}>{tr('admin_member_photo')}</label>
                <input type="file" accept="image/*" onChange={e => setMemberForm(f => ({ ...f, photo: e.target.files[0] || null }))}
                  className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 dark:file:bg-primary-900/30 file:text-primary-600 dark:file:text-primary-400 hover:file:bg-primary-100 dark:hover:file:bg-primary-900/50 transition-colors" />
              </div>
              <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FiSave className="w-4 h-4" /> {tr('admin_save')}
              </button>
            </form>
          </div>
        )}

        {tab === 'gallery' && (
          <div className="space-y-6">
            <div className={card}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">{tr('admin_current_gallery')}</h3>
              {data.gallery.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">{tr('admin_empty_gallery')}</p>
              ) : (
                <div className="space-y-3">
                  {data.gallery.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="w-16 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = 'none'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleGallerySubmit} className={card + " space-y-4"}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{tr('admin_add_gallery')}</h3>
              <div><label className={labelClass}>{tr('admin_gallery_title')}</label><input type="text" value={galleryForm.title} onChange={e => setGalleryForm(f => ({ ...f, title: e.target.value }))} className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_gallery_desc')}</label><textarea value={galleryForm.description} onChange={e => setGalleryForm(f => ({ ...f, description: e.target.value }))} rows={3} className={inputClass + " resize-none"} /></div>
              <div><label className={labelClass}>{tr('admin_gallery_image')}</label><input type="text" value={galleryForm.image} onChange={e => setGalleryForm(f => ({ ...f, image: e.target.value }))} placeholder="/storage/gallery/foto.jpg" className={inputClass} /></div>
              <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FiSave className="w-4 h-4" /> {tr('admin_save')}
              </button>
            </form>
          </div>
        )}

        {tab === 'programs' && (
          <div className="space-y-6">
            <div className={card}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">{tr('admin_current_programs')}</h3>
              {data.programs.length === 0 ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">{tr('admin_empty_programs')}</p>
              ) : (
                <div className="space-y-3">
                  {data.programs.map(item => (
                    <div key={item.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.title}</p>
                        {statusBadge(item.status)}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.startDate} — {item.endDate}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleProgramSubmit} className={card + " space-y-4"}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{tr('admin_add_program')}</h3>
              <div><label className={labelClass}>{tr('admin_program_title')}</label><input type="text" value={programForm.title} onChange={e => setProgramForm(f => ({ ...f, title: e.target.value }))} className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_program_desc')}</label><textarea value={programForm.description} onChange={e => setProgramForm(f => ({ ...f, description: e.target.value }))} rows={3} className={inputClass + " resize-none"} /></div>
              <div><label className={labelClass}>{tr('admin_program_status')}</label>
                <select value={programForm.status} onChange={e => setProgramForm(f => ({ ...f, status: e.target.value }))} className={inputClass}>
                  <option value="upcoming">{tr('admin_program_upcoming')}</option>
                  <option value="ongoing">{tr('admin_program_ongoing')}</option>
                  <option value="completed">{tr('admin_program_completed')}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>{tr('admin_program_start')}</label><input type="date" value={programForm.startDate} onChange={e => setProgramForm(f => ({ ...f, startDate: e.target.value }))} className={inputClass} /></div>
                <div><label className={labelClass}>{tr('admin_program_end')}</label><input type="date" value={programForm.endDate} onChange={e => setProgramForm(f => ({ ...f, endDate: e.target.value }))} className={inputClass} /></div>
              </div>
              <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FiSave className="w-4 h-4" /> {tr('admin_save')}
              </button>
            </form>
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-6">
            <div className={card}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4">{tr('admin_current_settings')}</h3>
              {!data.settings ? (
                <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-8">{tr('admin_empty_settings')}</p>
              ) : (
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p><span className="font-medium text-gray-800 dark:text-white">{tr('admin_wp')}:</span> +{data.settings.whatsapp}</p>
                  <p><span className="font-medium text-gray-800 dark:text-white">{tr('admin_ig')}:</span> @{data.settings.instagram}</p>
                  <p><span className="font-medium text-gray-800 dark:text-white">{tr('admin_email')}:</span> {data.settings.email}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSettingsSubmit} className={card + " space-y-4"}>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{tr('admin_edit_settings')}</h3>
              <div><label className={labelClass}>{tr('admin_wp')}</label><input type="text" value={settingsForm.whatsapp} onChange={e => setSettingsForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="085817048266" className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_ig')}</label><input type="text" value={settingsForm.instagram} onChange={e => setSettingsForm(f => ({ ...f, instagram: e.target.value }))} placeholder="eexxvvn" className={inputClass} /></div>
              <div><label className={labelClass}>{tr('admin_email')}</label><input type="email" value={settingsForm.email} onChange={e => setSettingsForm(f => ({ ...f, email: e.target.value }))} placeholder="karangtarunasukamaju64@gmail.com" className={inputClass} /></div>
              <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2">
                <FiSave className="w-4 h-4" /> {tr('admin_save')}
              </button>
            </form>
          </div>
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
