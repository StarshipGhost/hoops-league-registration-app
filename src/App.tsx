import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import Rules from './components/Rules'
import Pricing from './components/Pricing'
import Registration from './components/Registration'
import Footer from './components/Footer'
import {useRef, useState} from 'react'

export const BasketballLogo = ({scrollFunction}: {scrollFunction?: (index: number) => void}) => {
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
  function scrollToSection(index: number) : void {
    const section = sectionRef.current
    if (section) {
      const sectionNode = section.querySelectorAll('.main > div')[index]
      sectionNode.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggle = () : void => setDarkMode((v) => !v) ;
  
  return (
    <div className="app-container" app-theme={`${darkMode ? `dark` : ``}`}>
      <Header darkMode={darkMode} toggleFunction={toggle} scrollFunction={scrollToSection} />
      <div ref={sectionRef} className="main">
        <Hero scrollFunction={scrollToSection} />
        <Schedule />
        <Rules />
        <Pricing scrollFunction={scrollToSection} />
        <Registration />
      </div>
      <Footer scrollFunction={scrollToSection} />
    </div>
  )
}

export default App
