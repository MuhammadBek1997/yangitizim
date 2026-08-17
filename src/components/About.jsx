import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useScrollReveal, anime } from '../hooks/useAnime'

export default function About() {
  const { t } = useLanguage()
  const [certOpen, setCertOpen] = useState(false)

  const ref = useScrollReveal(
    (el) => {
      anime.set(el.querySelector('.about-text'), { opacity: 0, translateX: -44 })
      anime.set(el.querySelectorAll('.about-stat-card'), {
        opacity: 0,
        translateY: 32,
        scale: 0.94,
      })
      anime.set(el.querySelector('.about-tech-card'), { opacity: 0, translateY: 20 })
    },
    (el) => {
      anime.timeline({ easing: 'easeOutExpo' })
        .add({
          targets: el.querySelector('.about-text'),
          opacity: [0, 1],
          translateX: [-44, 0],
          duration: 750,
        })
        .add({
          targets: el.querySelectorAll('.about-stat-card'),
          opacity: [0, 1],
          translateY: [32, 0],
          scale: [0.94, 1],
          duration: 650,
          delay: anime.stagger(100),
        }, '-=450')
        .add({
          targets: el.querySelector('.about-tech-card'),
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 550,
        }, '-=300')
    }
  )

  return (
    <section id="about" ref={ref} className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <span className="section-tag">IT Park Uzbekistan</span>
            <h2>{t.about.title}</h2>
            <p className="about-lead">{t.about.subtitle}</p>
            <p className="about-desc">{t.about.desc1}</p>
            <p className="about-desc">{t.about.desc2}</p>

            <button className="itpark-chip" onClick={() => setCertOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <strong>IT Park Uzbekistan</strong>
                <span>{t.about.resident}</span>
              </div>
            </button>
          </div>

          <div className="about-cards">
            <div className="about-stat-card">
              <span className="stat-num">{t.about.stat1.value}</span>
              <span className="stat-lbl">{t.about.stat1.label}</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-num">{t.about.stat2.value}</span>
              <span className="stat-lbl">{t.about.stat2.label}</span>
            </div>
            <div className="about-stat-card">
              <span className="stat-num">{t.about.stat3.value}</span>
              <span className="stat-lbl">{t.about.stat3.label}</span>
            </div>
            <div className="about-tech-card">
              {['React', 'Next.js', 'Flutter', 'Node.js', 'TypeScript', 'React Native'].map(
                (tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {certOpen && (
        <div className="cert-overlay" onClick={() => setCertOpen(false)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-close" onClick={() => setCertOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src="/images/certificate.png" alt="IT Park guvohnomasi" className="cert-img" />
          </div>
        </div>
      )}
    </section>
  )
}
