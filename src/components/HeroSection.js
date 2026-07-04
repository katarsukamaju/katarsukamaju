import { useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/useTranslation';

export default function HeroSection() {
  const { t } = useTranslation();
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-blue-800">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }} />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-4 max-w-4xl">
        <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6 border border-white/10">
          Karang Taruna Sukamaju
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          {t('hero_title')}
        </h1>
        <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-light">
          {t('hero_subtitle')}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
