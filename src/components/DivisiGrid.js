import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiUsers } from 'react-icons/fi';
import MemberModal from './MemberModal';

export default function DivisiGrid() {
  const { t } = useTranslation();
  const [divisions, setDivisions] = useState([]);
  const [selectedDiv, setSelectedDiv] = useState(null);

  useEffect(() => {
    fetch('/data/members.json')
      .then(r => r.json())
      .then(setDivisions)
      .catch(() => setDivisions([]));
  }, []);

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{t('divisi_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400">{t('divisi_subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {divisions.map(div => (
            <button
              key={div.id}
              onClick={() => setSelectedDiv(div)}
              className="group text-left bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FiUsers className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{div.division}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{div.members.length} {t('members')}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedDiv && <MemberModal division={selectedDiv} onClose={() => setSelectedDiv(null)} />}
    </section>
  );
}
