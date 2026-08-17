import { useLanguage } from '../contexts/LanguageContext'
import { useScrollReveal, anime } from '../hooks/useAnime'

const icons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
]

export default function WhyUs() {
  const { t } = useLanguage()

  const ref = useScrollReveal(
    (el) => {
      anime.set(el.querySelector('.section-head'), { opacity: 0, translateY: 30 })
      anime.set(el.querySelectorAll('.why-card'), {
        opacity: 0,
        translateY: 48,
        scale: 0.95,
      })
      anime.set(el.querySelectorAll('.why-icon'), { scale: 0.5, opacity: 0 })
    },
    (el) => {
      anime.timeline({ easing: 'easeOutExpo' })
        .add({
          targets: el.querySelector('.section-head'),
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 650,
        })
        .add({
          targets: el.querySelectorAll('.why-card'),
          opacity: [0, 1],
          translateY: [48, 0],
          scale: [0.95, 1],
          duration: 700,
          delay: anime.stagger(90),
        }, '-=350')
        // Icons bounce in after cards
        .add({
          targets: el.querySelectorAll('.why-icon'),
          opacity: [0, 1],
          scale: [0.5, 1.15, 1],
          duration: 550,
          easing: 'easeOutBack',
          delay: anime.stagger(90),
        }, '-=580')
    }
  )

  return (
    <section ref={ref} className="section why-us">
      <div className="container">
        <div className="section-head">
          <h2>{t.whyUs.title}</h2>
        </div>
        <div className="why-grid">
          {t.whyUs.items.map((item, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{icons[i]}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
