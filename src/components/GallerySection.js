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
    <section id="gallery" className="relative py-28 px-6 bg-gray-50/80 dark:bg-surface-900/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="section-label">
            <span className="w-8 h-px bg-primary-400 dark:bg-primary-500" />
            {t('gallery_label')}
          </span>
          <h2 className="section-title">{t('gallery_title')}</h2>
          <p className="section-subtitle">{t('gallery_subtitle')}</p>
          <div className="section-divider" />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <FiImage className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-400 dark:text-gray-500 text-sm tracking-wide">{t('gallery_empty')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {items.map(item => (
              <div key={item.id} className="group card-hover overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 dark:bg-surface-800 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                </div>
                <div className="p-6 lg:p-7">
                  <time className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400 dark:text-gray-500">{item.date}</time>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-2 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed tracking-wide">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
