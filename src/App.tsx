import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Schedule from './components/Schedule'
import Rules from './components/Rules'
import Pricing from './components/Pricing'
import Registration from './components/Registration'
import Footer from './components/Footer'

export const BasketballLogo = () => {
  return (
    <div className="brand">
      <div className="basketball-logo-container">
        <div className="basketball-logo">🏀</div>
      </div>
      <div className="brand-name">Hoops League</div>
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <div className="app-container">
        <Hero />
        <Schedule />
        <Rules />
        <Pricing />
        <Registration />
      </div>
      <Footer />
    </div>
  )
}

export default App
