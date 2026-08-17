import { useLanguage } from '../contexts/LanguageContext'
import { useScrollReveal, anime } from '../hooks/useAnime'

function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  )
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Services() {
  const { t } = useLanguage()

  const cards = [
    { icon: <WebIcon />, ...t.services.web },
    { icon: <MobileIcon />, ...t.services.mobile },
  ]

  const ref = useScrollReveal(
    (el) => {
      anime.set(el.querySelector('.section-head'), { opacity: 0, translateY: 30 })
      anime.set(el.querySelectorAll('.service-card'), {
        opacity: 0,
        translateY: 44,
        scale: 0.97,
      })
    },
    (el) => {
      anime.timeline({ easing: 'easeOutExpo' })
        .add({
          targets: el.querySelector('.section-head'),
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 700,
        })
        .add({
          targets: el.querySelectorAll('.service-card'),
          opacity: [0, 1],
          translateY: [44, 0],
          scale: [0.97, 1],
          duration: 750,
          delay: anime.stagger(150),
        }, '-=400')
    }
  )

  return (
    <section id="services" ref={ref} className="section services">
      <div className="container">
        <div className="section-head">
          <h2>{t.services.title}</h2>
          <p>{t.services.subtitle}</p>
        </div>

        <div className="services-grid">
          {cards.map((card, i) => (
            <div key={i} className="service-card">
              <div className="service-icon-wrap">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <ul className="service-list">
                {card.features.map((f) => (
                  <li key={f}>
                    <span className="check-icon">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
