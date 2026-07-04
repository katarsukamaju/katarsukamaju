import { useApp } from '../context/AppContext';
import id from './id.json';
import en from './en.json';

const translations = { id, en };

export function useTranslation() {
  const { lang } = useApp();
  const t = (key) => translations[lang]?.[key] ?? key;
  return { t, lang };
}
