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
import type { GameEvent } from './types/GameEvent'
import type { Location } from './types/Location';
import type { Player } from './types/Player'


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
  const [schedule, setSchedule] = useState<GameEvent[]>([])
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

  const addGameEvent = (date: Date, start: string, end: string, location: Location, players: Player[], capacity: number): void => {
      const newGameEvent: GameEvent = {id: schedule.length + 1, date: date, start: start, end: end, location: location, registeredPlayers: players, capacity: capacity, isAvailable: true}
      setSchedule(schedule.concat(newGameEvent))
  }

  const gameEventRegistration = (player : Player) => {
    setSchedule(prev => {
      if (prev.length === 0) return prev
      const nextGame: GameEvent = prev[0]
      const stillAvailable = nextGame.registeredPlayers.length + 1 < nextGame.capacity;
      const updateFirst : GameEvent = {...nextGame, registeredPlayers: [...nextGame.registeredPlayers, player], isAvailable: stillAvailable};
      return [updateFirst,... prev.slice(1)];
    })
  }

  const gameEventCancellation = (player: Player) => {
    setSchedule(prev => {
      if (prev.length === 0) return prev
      const nextGame: GameEvent = prev[0]
      const findPlayer = nextGame.registeredPlayers.find((p) => p.firstName === player.firstName);
      const stillAvailable = nextGame.registeredPlayers.length - 1 < nextGame.capacity;
      const updateFirst : GameEvent = {...nextGame, registeredPlayers: nextGame.registeredPlayers.filter((p) => p.firstName !== findPlayer?.firstName), isAvailable: stillAvailable};
      return [updateFirst, ...prev.slice(1)]
    })
  }


  return (
    <div className={`min-w-80 bg-white dark:bg-black `}>
      <HeaderContext.Provider value={providerProps}>
        <Modal />
        <Header />
        <div ref={sectionRef} className="main bg-white dark:bg-black flex flex-col">
          <Hero />
          <Schedule schedule={schedule} addGameEvent={addGameEvent}/>
          <RegisteredPlayers gameEvent={schedule[0]} />
          <Rules />
          <Pricing />
          <Registration gameEvent={schedule[0]} gameEventRegistration={gameEventRegistration} gameEventCancellation={gameEventCancellation}/>
        </div>
        <Footer />
      </HeaderContext.Provider>
    </div>
  )
}

export default App
