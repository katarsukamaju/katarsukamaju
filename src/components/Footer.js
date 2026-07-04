import { useTranslation } from '../i18n/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 py-8 px-4 text-center text-sm">
      {t('footer_text')}
    </footer>
  );
}
