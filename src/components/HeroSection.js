import { useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/useTranslation';
import { FiArrowDown } from 'react-icons/fi';

export default function HeroSection() {
  const { t } = useTranslation();
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  const scrollNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-blue-950">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400/5 rounded-full blur-[150px]" />
      </div>

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-[13px] font-medium tracking-[0.15em] uppercase mb-8 border border-white/10">
          {t('hero_badge')}
        </span>

        <h1 className="text-[2.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-black text-white leading-[1.05] sm:leading-[0.95] tracking-[-0.03em] sm:tracking-[-0.04em] mb-6 sm:mb-8">
          {t('hero_title')}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-normal tracking-wide">
          {t('hero_subtitle')}
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button onClick={scrollNext}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-gray-900 rounded-2xl text-sm font-semibold tracking-wide hover:bg-white/90 transition-all duration-300 shadow-xl shadow-black/10">
            {t('hero_cta')}
            <FiArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
