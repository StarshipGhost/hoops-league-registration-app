import './App.css'
import { useEffect, useRef, useState} from 'react'
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
import scheduleService from './services/schedule'

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [authModalActive, setAuthModalActive] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<GameEvent[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSchedule = await scheduleService.getSchedule()
      setSchedule(schedule.concat(fetchedSchedule));
    }
    fetchData();
  }, [])

  const sectionRef = useRef<HTMLDivElement | null>(null)
  function scrollToSection(index: number): void {
    const section = sectionRef.current
    if (section) {
      const sectionNode = section.querySelectorAll('.main > div')[index]
      sectionNode.scrollIntoView({behavior: 'smooth', block: 'start'})
    }
  }

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

  const addGameEvent = async  (date: Date, start: string, end: string, location: Location, capacity: number) : Promise<void>  => {
      const newGameEvent: GameEvent = {
        id: schedule.length + 1,
        date: date,
        start: start,
        end: end,
        location: location,
        registeredPlayers: [],
        capacity: capacity,
      };
      const fetchedSchedule = await scheduleService.createGameEvent(newGameEvent);
      setSchedule(schedule.concat(fetchedSchedule))
  }

  const updateGameEvent = async (gameEvent: GameEvent, date: Date, start: string, end: string, location: Location, capacity: number): Promise<void>=> {
    const updatedGame = await scheduleService.updateGameEvent(
      {
        id: gameEvent.id,
        date: date,
        start: start,
        end: end,
        location: location,
        registeredPlayers: gameEvent.registeredPlayers,
        capacity: capacity,
      },
      gameEvent.id,
    );
    setSchedule((prev) => prev.map((game) => game.id === updatedGame.id ? updatedGame : game))
  };

  const deleteGameEvent = async (gameEvent: GameEvent) => {
    await scheduleService.deleteGameEvent(gameEvent.id)
    setSchedule((prev) => {
      return prev.filter((game) => gameEvent.id !== game.id);
    }) 
  }

  const gameEventRegistration = async (player : Player) => {
    if (schedule.length > 0) {
      const updateGame = await scheduleService.updateGameEvent({...schedule[0], registeredPlayers: [...schedule[0].registeredPlayers, player]}, schedule[0].id);
      setSchedule(schedule.map((game) => game.id === schedule[0].id ? updateGame : game))
    }
  }

  const gameEventCancellation = async (player: Player) => {
    if (schedule.length > 0) {
      const findPlayer = schedule[0].registeredPlayers.find((p) => p.firstName === player.firstName);
      const updateGame = await scheduleService.updateGameEvent(
        { ...schedule[0], registeredPlayers: schedule[0].registeredPlayers.filter((p) => p.firstName !== findPlayer?.firstName) },
        schedule[0].id,
      );
      setSchedule(schedule.map((game) => (game.id === schedule[0].id ? updateGame : game)));
    }
  }

  return (
    <div className={`min-w-80 bg-white dark:bg-black `}>
      <HeaderContext.Provider value={providerProps}>
        <Modal />
        <Header />
        <div ref={sectionRef} className="main bg-white dark:bg-black flex flex-col">
          <Hero />
          <Schedule schedule={schedule} addGameEvent={addGameEvent} updateGameEvent={updateGameEvent} deleteGameEvent={deleteGameEvent} />
          <RegisteredPlayers gameEvent={schedule[0]} />
          <Rules />
          <Pricing />
          <Registration
            gameEvent={schedule[0]}
            gameEventRegistration={gameEventRegistration}
            gameEventCancellation={gameEventCancellation}
          />
        </div>
        <Footer />
      </HeaderContext.Provider>
    </div>
  );
}

export default App
