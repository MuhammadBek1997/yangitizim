import { useEffect, useRef, useState } from 'react'
import { anime } from '../hooks/useAnime'
import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const heroRef = useRef(null)
  const animated = useRef(false)
  const [certOpen, setCertOpen] = useState(false)

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Esc tugmasi bilan yopish
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setCertOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el || animated.current) return
    animated.current = true

    const $ = (s) => el.querySelector(s)
    const $$ = (s) => el.querySelectorAll(s)

    anime.set($('.hero-badge'), { opacity: 0, translateY: -20 })
    anime.set($$('.clip-inner'), { translateY: '105%' })
    anime.set($('.hero-subtitle'), { opacity: 0, translateY: 20 })
    anime.set($$('.hero-actions > button'), { opacity: 0, translateY: 14, scale: 0.95 })
    anime.set($('.hero-stats'), { opacity: 0, translateY: 28 })
    anime.set($('.hero-scroll-hint'), { opacity: 0 })

    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets: $('.hero-badge'),
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 650,
      })
      .add({
        targets: $$('.clip-inner'),
        translateY: ['105%', '0%'],
        duration: 820,
        delay: anime.stagger(90),
      }, '-=400')
      .add({
        targets: $('.hero-subtitle'),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, '-=550')
      .add({
        targets: $$('.hero-actions > button'),
        opacity: [0, 1],
        translateY: [14, 0],
        scale: [0.95, 1],
        duration: 580,
        delay: anime.stagger(110),
      }, '-=500')
      .add({
        targets: $('.hero-stats'),
        opacity: [0, 1],
        translateY: [28, 0],
        duration: 650,
      }, '-=380')
      .add({
        targets: $('.hero-scroll-hint'),
        opacity: [0, 1],
        duration: 500,
      }, '-=100')
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow g1" />
        <div className="hero-glow g2" />
      </div>

      <div className="container hero-content">
        {/* Badge — bosilganda sertifikat ochiladi */}
        <button className="hero-badge" onClick={() => setCertOpen(true)}>
          <span className="badge-dot" />
          {t.hero.badge}
          <svg className="badge-arrow" viewBox="0 0 16 16" fill="currentColor" width="12" height="12">
            <path d="M6 3a1 1 0 000 2h4.586L3.293 12.293a1 1 0 101.414 1.414L12 6.414V11a1 1 0 102 0V4a1 1 0 00-1-1H6z"/>
          </svg>
        </button>

        <h1 className="hero-title">
          <span className="clip-wrap">
            <span className="clip-inner">{t.hero.title}</span>
          </span>
          <span className="clip-wrap">
            <span className="clip-inner accent">{t.hero.titleAccent}</span>
          </span>
        </h1>

        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('services')}>
            {t.hero.cta}
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>
            {t.hero.ctaSecondary}
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-val">{t.about.stat1.value}</span>
            <span className="hero-stat-label">{t.about.stat1.label}</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val">{t.about.stat2.value}</span>
            <span className="hero-stat-label">{t.about.stat2.label}</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-val">{t.about.stat3.value}</span>
            <span className="hero-stat-label">{t.about.stat3.label}</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>

      {/* Sertifikat modali */}
      {certOpen && (
        <div className="cert-overlay" onClick={() => setCertOpen(false)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-close" onClick={() => setCertOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src="/images/certificate.png"
              alt="IT Park Rezidenti guvohnomasi"
              className="cert-img"
            />
          </div>
        </div>
      )}
    </section>
  )
}
