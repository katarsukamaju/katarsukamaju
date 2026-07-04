import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function MemberModal({ division, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = '' };
  }, []);

  const baseUrl = process.env.PUBLIC_URL || '';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[80vh] overflow-y-auto shadow-2xl animate-slide-up">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">{division.division}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {division.members.map((m, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <img
                src={`${baseUrl}/storage/profile/${m.slug}.jpg`}
                alt={m.name}
                className="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-gray-600"
                onError={e => { e.target.src = `${baseUrl}/storage/profile/default-avatar.svg`; e.target.onerror = null }}
              />
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{m.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{m.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
        @media (min-width: 640px) {
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
}
