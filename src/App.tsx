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
    <div onClick={() => { if (scrollFunction) scrollFunction(0) }} className="dark:text-white flex items-center gap-2 cursor-pointer">
      <div className="bg-orange-500/90 relative flex min-w-8.5 h-8.5 rounded-lg">
        <div className="text-xl absolute top-[2px] right-[3px]">🏀</div>
      </div>
      <div className="text-xl font-bold">
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
    <div className={`min-w-80 bg-white dark:bg-black ${darkMode && 'dark'}`}>
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
