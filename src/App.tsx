import './App.css'
import {useRef, useState} from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import Rules from './components/Rules'
import Pricing from './components/Pricing'
import Registration from './components/Registration'
import Footer from './components/Footer'
import RegisteredPlayers from './components/RegisteredPlayers'
import Modal from './components/modals/AuthModal'
import {HeaderContext} from './components/customs/HeaderContext'


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
  const toggleThemeMode = (): void => {
    setDarkMode((v) => !v) 
    document.documentElement.classList.toggle('dark');
  }
  const toggleAuthModal = (): void => setAuthModalActive((v) => !v)
  const providerProps = {
    scrollFunction: scrollToSection,
    theme: {darkMode: darkMode, toggleThemeMode: toggleThemeMode},
    authModal: {authModalActive: authModalActive, toggleAuthModal: toggleAuthModal},
  }

  return (
    <div className={`min-w-80 bg-white dark:bg-black `}>
      <HeaderContext.Provider value={providerProps}>
        <Modal />
        <Header />
        <div ref={sectionRef} className="main bg-white dark:bg-black flex flex-col">
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
