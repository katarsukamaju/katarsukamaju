/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'id');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [settings, setSettings] = useState(null);
  const [members, setMembers] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(l => l === 'id' ? 'en' : 'id');

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, settings, setSettings, members, setMembers }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
