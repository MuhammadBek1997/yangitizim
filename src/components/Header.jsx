import { useState, useEffect, useRef } from 'react'
import { anime } from '../hooks/useAnime'
import { useLanguage } from '../contexts/LanguageContext'
import LogoMark from './LogoMark'

export default function Header() {
  const { lang, setLang, t } = useLanguage()
  const [menuOpen, setMenuOpen]   = useState(false)
  const [langOpen, setLangOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const langRef = useRef(null)
  const headerRef   = useRef(null)
  const logoTextRef = useRef(null)
  const entranceDone = useRef(false)

  // Frosted glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lang dropdown tashqarisiga bosilsa yopiladi
  useEffect(() => {
    if (!langOpen) return
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [langOpen])

  // Header slide-down + logo text fade-in
  useEffect(() => {
    const el  = headerRef.current
    const txt = logoTextRef.current
    if (!el) return

    anime.set(el,  { translateY: -80, opacity: 0 })
    if (txt) anime.set(txt, { opacity: 0, translateX: -10 })

    anime.timeline({ easing: 'easeOutExpo' })
      .add({
        targets:    el,
        translateY: ['-80px', '0px'],
        opacity:    [0, 1],
        duration:   700,
        delay:      80,
        complete:   () => { entranceDone.current = true },
      })
      .add({
        targets:    txt,
        opacity:    [0, 1],
        translateX: [-10, 0],
        duration:   700,
        easing:     'easeOutExpo',
      }, '+=400')
  }, [])

  // Footer ko'rinsa — header tepaga ko'tariladi
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        const el = headerRef.current
        if (!el) return
        if (entry.isIntersecting) {
          anime({ targets: el, translateY: '-110%', duration: 420, easing: 'easeInExpo' })
        } else if (entranceDone.current) {
          anime({ targets: el, translateY: '0%', duration: 500, easing: 'easeOutExpo' })
        }
      },
      { threshold: 0.05 }
    )

    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header ref={headerRef} className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner container">

        {/* Logo */}
        <button className="logo" onClick={() => scrollTo('home')}>
          <LogoMark size={64} />
          <span ref={logoTextRef} className="logo-name" style={{ opacity: 0 }}>
            Yangi <span className="accent">Tizim</span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="nav">
          <button onClick={() => scrollTo('home')}>{t.nav.home}</button>
          <button onClick={() => scrollTo('services')}>{t.nav.services}</button>
          <button onClick={() => scrollTo('about')}>{t.nav.about}</button>
          <button onClick={() => scrollTo('contact')}>{t.nav.contact}</button>
        </nav>

        <div className="header-right">
          {/* Desktop: pill buttons | Mobile: dropdown */}
          <div className="lang-switcher" ref={langRef}>
            {/* Desktop buttons */}
            <div className="lang-pills">
              {['uz', 'ru', 'en'].map((l) => (
                <button
                  key={l}
                  className={`lang-btn${lang === l ? ' active' : ''}`}
                  onClick={() => setLang(l)}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* Mobile dropdown */}
            <div className="lang-drop-wrap">
              <button
                className="lang-drop-trigger"
                onClick={() => setLangOpen(!langOpen)}
              >
                {lang.toUpperCase()}
                <svg viewBox="0 0 10 6" width="10" height="10" fill="currentColor"
                  style={{ transform: langOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                  <path d="M0 0l5 6 5-6z"/>
                </svg>
              </button>
              {langOpen && (
                <div className="lang-drop-menu">
                  {['uz', 'ru', 'en'].filter(l => l !== lang).map((l) => (
                    <button
                      key={l}
                      className="lang-drop-item"
                      onClick={() => { setLang(l); setLangOpen(false) }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className={`burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav">
          <button onClick={() => scrollTo('home')}>{t.nav.home}</button>
          <button onClick={() => scrollTo('services')}>{t.nav.services}</button>
          <button onClick={() => scrollTo('about')}>{t.nav.about}</button>
          <button onClick={() => scrollTo('contact')}>{t.nav.contact}</button>
        </div>
      )}
    </header>
  )
}
