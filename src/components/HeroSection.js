import { useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/useTranslation';

export default function HeroSection() {
  const { t } = useTranslation();
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-300 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {t('hero_subtitle')}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
