import { useApp } from '../context/AppContext';
import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Header() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">KT</span>
          <span className="font-semibold text-gray-800 dark:text-white text-sm hidden sm:block">Sukamaju</span>
        </Link>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors" aria-label="Toggle language">
            <FiGlobe className="w-5 h-5" />
            <span className="text-xs font-medium ml-1">{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
