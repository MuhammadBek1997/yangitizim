import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MatrixBg from './components/MatrixBg'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <MatrixBg />
        <div className="page-scroll-line"><span /></div>
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <WhyUs />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
