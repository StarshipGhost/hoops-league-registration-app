import './App.css'
import { useEffect, useRef, useState} from 'react'
import Header from './components/section/Header'
import Hero from './components/section/Hero'
import Schedule from './components/section/Schedule'
import Rules from './components/section/Rules'
import Pricing from './components/section/Pricing'
import Registration from './components/section/Registration'
import Footer from './components/section/Footer'
import RegisteredPlayers from './components/section/RegisteredPlayers'
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sectionRef = useRef<HTMLDivElement | null>(null)
  function scrollToSection(index: number): void {
    const section = sectionRef.current
    if (section) {
      const sectionNode = section.querySelectorAll('main > section')[index]
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

  const deleteGameEvent = async (gameEvent: GameEvent) : Promise<void> => {
    await scheduleService.deleteGameEvent(gameEvent.id)
    setSchedule((prev) => {
      return prev.filter((game) => gameEvent.id !== game.id);
    }) 
  }

  const gameEventRegistration = async (player : Player) : Promise<void> => {
    try {
      const registeredPlayer = await scheduleService.gameEventRegistration(schedule[0].id, player);
      const updatedGame = {...schedule[0], registeredPlayers: [...schedule[0].registeredPlayers, registeredPlayer]} 
      setSchedule(schedule.map((game) => game.id === schedule[0].id ? updatedGame : game))
    } catch (err) {
      console.log(err)
    }
  }

  const gameEventCancellation = async (guestId: string) => {
    try {
      const nextGame = schedule[0];
      const findPlayer = nextGame.registeredPlayers.find((p) => p.guestId === guestId);
      const updatedGame = { ...nextGame, registeredPlayers: nextGame.registeredPlayers.filter((p) => p.guestId !== findPlayer?.guestId) }
      await scheduleService.gameEventCancellation(nextGame.id, guestId);
      setSchedule(schedule.map((game) => (game.id === nextGame.id ? updatedGame : game)));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={`min-w-80 bg-white dark:bg-black `}>
      <HeaderContext.Provider value={providerProps}>
        <Modal />
        <Header />
        <main ref={sectionRef} className="bg-white dark:bg-black flex flex-col">
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
        </main>
        <Footer />
      </HeaderContext.Provider>
    </div>
  );
}

export default App
