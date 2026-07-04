import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FiSun, FiMoon, FiGlobe, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const sections = [
  { id: 'home', label_id: 'Beranda', label_en: 'Home' },
  { id: 'about', label_id: 'Tentang', label_en: 'About' },
  { id: 'gallery', label_id: 'Galeri', label_en: 'Gallery' },
  { id: 'program', label_id: 'Program', label_en: 'Program' },
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
      setScrolled(window.scrollY > 50);
      const scrollY = window.scrollY + 120;
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
          <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">KT</span>
          <span className="font-semibold text-gray-800 dark:text-white text-sm">Sukamaju</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map(s => (
            <button key={s.id} onClick={() => scrollTo(s.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${active === s.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : scrolled ? 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white' : 'text-white/80 hover:text-white'}`}>
              {lang === 'id' ? s.label_id : s.label_en}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={toggleLang} className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
            <FiGlobe className="w-4 h-4" />
            <span className="text-xs font-medium ml-0.5">{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
            {theme === 'light' ? <FiMoon className="w-4 h-4" /> : <FiSun className="w-4 h-4" />}
          </button>
          <Link to="/admin" className={`p-2 rounded-lg text-xs font-medium transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>
            Admin
          </Link>
          <button onClick={() => setOpen(!open)} className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/80'}`}>
            {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active === s.id ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                {lang === 'id' ? s.label_id : s.label_en}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
