import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useScrollReveal, anime } from '../hooks/useAnime'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 3000)
  }

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const ref = useScrollReveal(
    (el) => {
      anime.set(el.querySelector('.section-head'), { opacity: 0, translateY: 30 })
      anime.set(el.querySelectorAll('.contact-item'), {
        opacity: 0,
        translateX: -36,
      })
      anime.set(el.querySelector('.contact-form'), {
        opacity: 0,
        translateX: 36,
      })
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
          targets: el.querySelectorAll('.contact-item'),
          opacity: [0, 1],
          translateX: [-36, 0],
          duration: 650,
          delay: anime.stagger(100),
        }, '-=350')
        .add({
          targets: el.querySelector('.contact-form'),
          opacity: [0, 1],
          translateX: [36, 0],
          duration: 700,
        }, '-=550')
    }
  )

  return (
    <section id="contact" ref={ref} className="section contact">
      <div className="container">
        <div className="section-head">
          <h2>{t.contact.title}</h2>
          <p>{t.contact.subtitle}</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">{t.contact.phone}</span>
                <span className="contact-value">{t.contact.phoneValue}</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">Email</span>
                <span className="contact-value">{t.contact.emailValue}</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="contact-detail">
                <span className="contact-label">{t.contact.address}</span>
                <span className="contact-value">{t.contact.addressValue}</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handle}>
            <div className="form-row">
              <input
                type="text"
                placeholder={t.contact.name}
                value={form.name}
                onChange={set('name')}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                placeholder={t.contact.email}
                value={form.email}
                onChange={set('email')}
                required
              />
            </div>
            <div className="form-row">
              <textarea
                rows={5}
                placeholder={t.contact.message}
                value={form.message}
                onChange={set('message')}
                required
              />
            </div>
            <button type="submit" className={`btn-primary${sent ? ' sent' : ''}`}>
              {sent ? `✓ ${t.contact.sent}` : t.contact.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
