import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import Rules from './components/Rules'
import Pricing from './components/Pricing'
import Registration from './components/Registration'
import Footer from './components/Footer'
import {useRef} from 'react'

export const BasketballLogo = ({scrollFunction}: {scrollFunction?: (index: number) => void}) => {
  return (
    <div onClick={() => { if (scrollFunction) scrollFunction(0) }} className="brand" >
      <div className="basketball-logo-container">
        <div className="basketball-logo">🏀</div>
      </div>
      <div className="brand-name"><a>Hoops League</a></div>
    </div>
  )
}

function App() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  function scrollToSection(index: number) {
    const section = sectionRef.current
    if (section) {
      const sectionNode = section.querySelectorAll('.app-container > div')[index]
      sectionNode.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

  return (
    <div>
      <Header scrollFunction={scrollToSection} />
      <div ref={sectionRef} className="app-container">
        <Hero />
        <Schedule />
        <Rules />
        <Pricing />
        <Registration />
      </div>
      <Footer scrollFunction={scrollToSection} />
    </div>
  )
}

export default App
