import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { heroSlides as fallbackSlides, fwaPackages } from '../data';
import { publicBannerService } from '../services/api';
import { useSiteConfig } from '../context/SiteConfigContext';
import { safeOpenExternal } from '../utils/validation';

export default function HeroSlider({ onNavigate, onSelectPlan }) {
  const { siteConfig, buildWhatsAppUrl } = useSiteConfig();
  const [slides, setSlides] = useState(fallbackSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const timerRef = useRef(null);

  const autoPlayInterval = siteConfig.defaultHeroInterval || 6000;

  // Fetch banners from API
  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      try {
        const data = await publicBannerService.getHeroSlides();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          // Merge API banners with fallback images if needed
          const mapped = data.map((b, idx) => {
            const fallback = fallbackSlides[idx] || fallbackSlides[0];
            return {
              id: b.code || b.id || `slide-${idx}`,
              title: b.title || fallback.title,
              badge: b.badge || fallback.badge,
              image: b.image || fallback.image,
              imageAlt: b.imageAlt || fallback.imageAlt,
              primaryCta: b.primaryCta || {
                target: b.target || fallback.primaryCta.target,
                isNav: b.isNav !== undefined ? b.isNav : fallback.primaryCta.isNav,
              },
              tabLabel: b.tabLabel || fallback.tabLabel,
            };
          });
          setSlides(mapped);
        }
      } catch (error) {
        console.warn('Gagal fetch banner dari API, pakai data fallback lokal:', error);
      }
    };

    fetchBanners();
    return () => { isMounted = false; };
  }, []);

  const totalSlides = slides.length || 1;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPaused && totalSlides > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide, currentSlide, autoPlayInterval, totalSlides]);

  // Touch Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const handleSlideClick = (slideItem) => {
    if (!slideItem || !slideItem.primaryCta) return;
    const cta = slideItem.primaryCta;

    if (cta.isNav && onNavigate) {
      onNavigate(cta.target);
    } else if (cta.target === 'order-fwa') {
      if (onSelectPlan) {
        onSelectPlan(fwaPackages[0] || {
          id: 'fwa-premium',
          name: 'XL SATU FWA Premium Unlimited',
          promoPrice: 'Rp249.000'
        });
      }
    } else if (cta.target === 'whatsapp') {
      const text = 'Halo Sales XL SATU Medan & Binjai, saya tertarik dengan promo internet XL SATU.';
      safeOpenExternal(buildWhatsAppUrl(text));
    }
  };

  const slide = slides[currentSlide] || slides[0] || fallbackSlides[0];

  return (
    <section
      className="hero-slider-wrap dot-pattern"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Hero Image Banner Slider"
    >
      <div className="container-xl">
        {/* FULL IMAGE BANNER STAGE */}
        <div
          className="hero-banner-stage"
          onClick={() => handleSlideClick(slide)}
          role="button"
          tabIndex={0}
          aria-label={`Banner: ${slide.title}`}
        >
          {/* Ambient blurred backdrop for wide container */}
          <div 
            className="hero-banner-backdrop"
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden="true"
          />

          {/* Crisp Foreground Image (Fitted 100%) */}
          <img
            key={`img-${slide.id}`}
            src={slide.image}
            alt={slide.imageAlt}
            className="hero-banner-img animate-zoom"
            loading="eager"
            fetchPriority="high"
          />

          {/* Floating Navigation Arrows on Banner */}
          <button
            type="button"
            className="hero-banner-arrow hero-banner-arrow-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            className="hero-banner-arrow hero-banner-arrow-next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Counter Badge */}
          <div className="hero-slide-counter">
            <span>0{currentSlide + 1}</span>
            <span className="counter-sep">/</span>
            <span>0{slides.length}</span>
          </div>
        </div>

        {/* BOTTOM SLIDER CONTROLS BAR */}
        <div className="hero-controls-bar">
          {/* Progress Bar & Dot Indicators */}
          <div className="slider-indicators-wrap">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot-btn ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              >
                {currentSlide === idx && (
                  <span
                    className={`slider-progress-fill ${isPaused ? 'paused' : ''}`}
                    style={{ animationDuration: `${autoPlayInterval}ms` }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Play / Pause Toggle */}
          <button
            type="button"
            className="slider-pause-btn"
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Mulai Putar Otomatis' : 'Jeda Slider'}
            aria-label={isPaused ? 'Play' : 'Pause'}
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>
    </section>
  );
}
