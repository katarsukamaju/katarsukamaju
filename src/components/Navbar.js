import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FiSun, FiMoon, FiGlobe, FiMenu, FiX, FiChevronRight } from 'react-icons/fi';

const sections = [
  { id: 'home', label_id: 'Beranda', label_en: 'Home' },
  { id: 'about', label_id: 'Tentang', label_en: 'About' },
  { id: 'gallery', label_id: 'Galeri', label_en: 'Gallery' },
  { id: 'program', label_id: 'Program', label_en: 'Programs' },
  { id: 'divisi', label_id: 'Divisi', label_en: 'Divisions' },
  { id: 'contact', label_id: 'Kontak', label_en: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const scrollY = window.scrollY + 140;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActive(s.id);
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`relative px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                active === s.id
                  ? scrolled
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-white'
                  : scrolled
                    ? 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
                    : 'text-white/70 hover:text-white'
              }`}>
              {lang === 'id' ? s.label_id : s.label_en}
              {active === s.id && (
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
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${
                  active === s.id
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-800'
                }`}>
                {lang === 'id' ? s.label_id : s.label_en}
                <FiChevronRight className={`w-4 h-4 ${active === s.id ? 'text-primary-500' : 'text-gray-300 dark:text-gray-600'}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
