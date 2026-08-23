import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { heroSlides as SLIDES, siteConfig, buildWhatsAppUrl, fwaPackages } from '../data';

const AUTO_PLAY_INTERVAL = siteConfig.defaultHeroInterval || 6000;

export default function HeroSlider({ onNavigate, onSelectPlan }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide, currentSlide]);

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
      window.open(buildWhatsAppUrl(siteConfig.salesWhatsApp, text), '_blank');
    }
  };

  const slide = SLIDES[currentSlide];

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
            <span>0{SLIDES.length}</span>
          </div>
        </div>

        {/* BOTTOM SLIDER CONTROLS BAR */}
        <div className="hero-controls-bar">
          {/* Progress Bar & Dot Indicators */}
          <div className="slider-indicators-wrap">
            {SLIDES.map((_, idx) => (
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
                    style={{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }}
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
