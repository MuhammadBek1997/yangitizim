import { useLanguage } from '../contexts/LanguageContext'
import LogoMark from './LogoMark'

export default function Footer() {
  const { t } = useLanguage()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <LogoMark size={44} />
          <span className="logo-name">
            Yangi <span className="accent">Tizim</span>
          </span>
        </div>

        <nav className="footer-nav">
          <button onClick={() => scrollTo('home')}>{t.nav.home}</button>
          <button onClick={() => scrollTo('services')}>{t.nav.services}</button>
          <button onClick={() => scrollTo('about')}>{t.nav.about}</button>
          <button onClick={() => scrollTo('contact')}>{t.nav.contact}</button>
        </nav>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Yangi Tizim. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
