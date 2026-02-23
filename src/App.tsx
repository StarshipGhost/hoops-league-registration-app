import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import Rules from './components/Rules'
import Pricing from './components/Pricing'
import Registration from './components/Registration'
import Footer from './components/Footer'
import {HeaderContext, useHeaderContext} from './components/customs/HeaderContext'
import {useRef, useState} from 'react'
import RegisteredPlayers from './components/RegisteredPlayers'
import Modal from './components/modals/AuthModal'

export const BasketballLogo = () => {
  const {scrollFunction} = useHeaderContext()
  return (
    <div onClick={() => { if (scrollFunction) scrollFunction(0) }} className="brand">
      <div className="basketball-logo-container">
        <div className="basketball-logo">🏀</div>
      </div>
      <div className="brand-name">
        <a>Hoops League</a>
      </div>
    </div>
  )
}

function App() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  function scrollToSection(index: number): void {
    const section = sectionRef.current
    if (section) {
      const sectionNode = section.querySelectorAll('.main > div')[index]
      sectionNode.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [authModalActive, setAuthModalActive] = useState<boolean>(false)
  const toggleThemeMode = (): void => setDarkMode((v) => !v)
  const toggleAuthModal = (): void => setAuthModalActive((v) => !v)
  const providerProps = {
    scrollFunction: scrollToSection,
    theme: {darkMode: darkMode, toggleThemeMode: toggleThemeMode},
    authModal: {authModalActive: authModalActive, toggleAuthModal: toggleAuthModal},
  }

  return (
    <div className="app-container" app-theme={`${darkMode ? `dark` : `light`}`}>
      <HeaderContext.Provider value={providerProps}>
        <Modal />
        <Header />
        <div ref={sectionRef} className="main">
          <Hero />
          <Schedule />
          <RegisteredPlayers />
          <Rules />
          <Pricing />
          <Registration />
        </div>
        <Footer />
      </HeaderContext.Provider>
    </div>
  )
}

export default App
