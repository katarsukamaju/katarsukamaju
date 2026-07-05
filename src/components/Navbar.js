import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n/useTranslation';
import { FiSun, FiMoon, FiGlobe, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';

const sectionKeys = [
  'home', 'about', 'gallery', 'programs', 'divisi', 'services', 'contact',
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const { t } = useTranslation();
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionId = (key) => key === 'programs' ? 'program' : key === 'services' ? 'layanan' : key;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const scrollY = window.scrollY + 140;
      for (const key of sectionKeys) {
        const el = document.getElementById(sectionId(key));
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActive(key);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (key) => {
    setOpen(false);
    document.getElementById(sectionId(key))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-2xl border-b border-gray-100 dark:border-gray-800/50'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
          <span className="w-9 h-9 bg-primary-600 dark:bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm group-hover:scale-105 transition-transform">KT</span>
          <span className={`font-medium text-sm tracking-wide ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>Sukamaju</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sectionKeys.map(key => (
            <button key={key} onClick={() => scrollTo(key)}
              className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                active === key
                  ? scrolled
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-white'
                  : scrolled
                    ? 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                    : 'text-white/70 hover:text-white'
              }`}>
              {t('nav_' + key)}
              {active === key && (
                <span className={`absolute -bottom-px left-4 right-4 h-[2px] rounded-full transition-colors ${
                  scrolled ? 'bg-primary-500 dark:bg-primary-400' : 'bg-white'
                }`} />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-0.5">
          <button onClick={toggleLang} className={`p-2.5 rounded-xl transition-all duration-300 ${
            scrolled
              ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-800'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}>
            <FiGlobe className="w-[15px] h-[15px]" />
            <span className="text-[10px] font-semibold ml-0.5 tracking-widest">{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className={`p-2.5 rounded-xl transition-all duration-300 ${
            scrolled
              ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-800'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}>
            {theme === 'light' ? <FiMoon className="w-[15px] h-[15px]" /> : <FiSun className="w-[15px] h-[15px]" />}
          </button>

          <button onClick={() => setOpen(!open)} className={`md:hidden ml-1 p-2.5 rounded-xl transition-all ${
            scrolled
              ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-800'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}>
            {open ? <FiX className="w-[18px] h-[18px]" /> : <FiMenu className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-surface-900 border-t border-gray-100 dark:border-gray-800 shadow-elevated">
          <div className="px-4 py-3 space-y-0.5">
            {sectionKeys.map(key => (
              <button key={key} onClick={() => scrollTo(key)}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  active === key
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-800'
                }`}>
                {t('nav_' + key)}
                <FiChevronRight className={`w-4 h-4 ${active === key ? 'text-primary-500' : 'text-gray-300 dark:text-gray-600'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
