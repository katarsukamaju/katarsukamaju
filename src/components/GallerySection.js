import { useState, useEffect } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiImage } from 'react-icons/fi';

export default function GallerySection() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/data/gallery.json')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm tracking-widest uppercase">02 / {t('gallery_label')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4">{t('gallery_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{t('gallery_subtitle')}</p>
          <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto mt-4" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <FiImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{t('gallery_empty')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md dark:border dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.description}</p>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
