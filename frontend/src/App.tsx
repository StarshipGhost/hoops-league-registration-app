import './App.css'
import { useEffect, useRef, useState } from 'react'
import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import Schedule from './components/sections/Schedule'
import Rules from './components/sections/Rules'
import Pricing from './components/sections/Pricing'
import Registration from './components/sections/Registration'
import Footer from './components/sections/Footer'
import RegisteredPlayers from './components/sections/RegisteredPlayers'
import Modal from './components/modals/AuthModal'
import { HeaderContext } from "./components/customs/HeaderContext";
import type { GameEvent } from './types/GameEvent'
import type { Location } from './types/Location'
import type { Player } from './types/Player'
import scheduleService from './services/schedule'
import adminService from './services/admin'
import { convert12to24 } from './utils/timeString'

import login from '../src/assets/login_24dp_00C951_FILL0_wght400_GRAD0_opsz24.svg'
import logout from '../src/assets/logout_24dp_2B7FFF_FILL0_wght400_GRAD0_opsz24.svg'

const SignMessage = ({isLogin, isLogout} : {isLogin : boolean, isLogout: boolean}) => {
  return (
    <div className='flex justify-center'>
        <LoginMessage isLogin={isLogin}/>
        <LogoutMessage isLogout={isLogout}/>
    </div>
  ) 
}

const LoginMessage = ({isLogin} : {isLogin: boolean}) => {
  return (
    <div className={`sign-popover text-sm sm:text-base bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-500 -translate-y-full opacity-0 ${isLogin && `translate-y-0 opacity-100`} `}>
        <img src={login}></img>
        {`Logged in successfully!`}
    </div>
  ) 
}

const LogoutMessage = ({isLogout} : {isLogout : boolean}) => {
  return (
    <div className={ `sign-popover text-sm sm:text-base bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-500 -translate-y-full opacity-0 ${isLogout && `translate-y-0 opacity-100`}` }>
        <img src={logout}></img>
        {`Logged out successfully!`}
    </div>
  ) 
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const current = localStorage.getItem('dark')
    return current === "true" ? true : false;
  })
  const [authModalActive, setAuthModalActive] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<GameEvent[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(true)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

  const handleLoginClick = (): void => {
      setIsLoggedIn(true);
      setTimeout(() => {
          setIsLoggedIn(false);
      }, 3000);
  }
  const handleLogoutClick = (): void => {
      setIsLoggedOut(true);
      setTimeout(() => {
          setIsLoggedOut(false);
      }, 3000);
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSchedule = await scheduleService.getSchedule()
      setSchedule(schedule.concat(fetchedSchedule));
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchAdminState = async () => {
        try {
          const admin = await adminService.checkAdmin();
          setIsAdmin(admin)
        } catch (err) {
          console.log(err)
        }
    }
    fetchAdminState();
  }, [isLoggedIn])

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      localStorage.setItem('dark', "true");
      root.classList.add('dark')
    } else {
      localStorage.setItem('dark', "false");
      root.classList.remove('dark')
    }
  }, [darkMode])

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
  }
  const toggleAuthModal = (): void => setAuthModalActive((v) => !v)
  const logout = async (): Promise<void> => {
    try {
      await adminService.logout();
      setIsAdmin(false)
      handleLogoutClick()
    } catch (err) {
      console.log(err)
    }
  }

  const providerProps = {
    scrollFunction: scrollToSection,
    theme: {darkMode: darkMode, toggleThemeMode: toggleThemeMode},
    authModal: {authModalActive: authModalActive, toggleAuthModal: toggleAuthModal},
    admin: {isAdmin: isAdmin, logout: logout}
  }

  const addGameEvent = async  (date: Date, start: string, end: string, location: Location, capacity: number, openRegistrations: boolean) : Promise<void>  => {
      const newGameEvent: GameEvent = {
        id: schedule.length + 1,
        date: date,
        start: start,
        end: end,
        location: location,
        registeredPlayers: [],
        capacity: capacity,
        openRegistrations: openRegistrations
      };
      const fetchedSchedule = await scheduleService.createGameEvent(newGameEvent);
      setSchedule(schedule.concat(fetchedSchedule))
  }

  const updateGameEvent = async (gameEvent: GameEvent, date: Date, start: string, end: string, location: Location, capacity: number): Promise<void>=> {
    const updatedGame = await scheduleService.updateGameEvent(
      {
        ...gameEvent,
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
      const updatedGame : GameEvent = {...schedule[0], registeredPlayers: [...schedule[0].registeredPlayers, registeredPlayer]} 
      setSchedule(schedule.map((game) => game.id === schedule[0].id ? updatedGame : game))
    } catch (err) {
      console.log(err)
    }
  }

  const gameEventCancellation = async (guestId: string | undefined) => {
    try {
      const nextGame : GameEvent = schedule[0];
      const findPlayer : Player | undefined = nextGame.registeredPlayers.find((p) => p.guestId === guestId);
      const updatedGame = { ...nextGame, registeredPlayers: nextGame.registeredPlayers.filter((p) => p.guestId !== findPlayer?.guestId) }
      await scheduleService.gameEventCancellation(nextGame.id, guestId);
      setSchedule(schedule.map((game) => (game.id === nextGame.id ? updatedGame : game)));
    } catch (err) {
      console.log(err)
    }
  }

  const updateGameEventRegistrationStatus = async (gameEvent : GameEvent) => {
    const updatedGame = await scheduleService.updateGameEvent({...gameEvent, openRegistrations: !gameEvent.openRegistrations}, gameEvent.id)
    setSchedule(schedule.map((game) => (game.id === gameEvent.id ? updatedGame : game)));
  }

  const orderedSchedule = schedule.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() || convert12to24(a.start) - convert12to24(b.start),
  );
  
  return (
    <div className={`min-w-80 bg-white dark:bg-black`}>
      <HeaderContext.Provider value={providerProps}>
        <Modal handleLogin={handleLoginClick} />
        <Header />
        <SignMessage isLogin={isLoggedIn} isLogout={isLoggedOut} />
        <main ref={sectionRef} className="bg-white dark:bg-black flex flex-col">
          <Hero />
          <Schedule
            schedule={orderedSchedule}
            addGameEvent={addGameEvent}
            updateGameEvent={updateGameEvent}
            deleteGameEvent={deleteGameEvent}
            updateRegistrationStatus={updateGameEventRegistrationStatus}
          />
          <RegisteredPlayers gameEvent={orderedSchedule[0]} addPlayer={gameEventRegistration} deletePlayer={gameEventCancellation} />
          <Rules />
          <Pricing />
          <Registration
            gameEvent={orderedSchedule[0]}
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
