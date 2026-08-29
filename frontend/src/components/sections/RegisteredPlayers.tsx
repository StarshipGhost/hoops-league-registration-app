import {useState} from 'react'
import CalendarIcon from '../icons/CalendarIcon'
import ClockIcon from '../icons/ClockIcon'
import LocationIcon from '../icons/LocationIcon'
import UsersIcon from '../icons/UsersIcon'
import type {GameEvent} from '../../types/GameEvent'
import type {Player} from '../../types/Player'
import { getStringDateParts} from '../../utils/timeString'
import SectionHeader from '../customs/SectionHeader'
import { GameInfoLine } from './Schedule'
import { isGameAvailable } from '../../utils/scheduleUtils'
import { useHeaderContext } from '../customs/HeaderContext'
import { OrangeButton } from '../customs/Button'
import AddPlayerModal from '../modals/AddPlayerModal'

interface StatusTabsProps {
  isActive: boolean
  status: string
}

const RegisteredPlayersHeader = () => {
  return (
    <SectionHeader
      sectionIcon={{icon: <UsersIcon className="text-orange-500/90 dark:text-orange-400 size-6" />}}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Registered Players'}
      description={'Live list for the upcoming session.'}
    />
  )
}

const UpcomingGameDetail = ({gameEvent}: {gameEvent: GameEvent | undefined}) => {
  if (gameEvent) {
    const { date, start, end, location: {name} } = gameEvent
    const {dayOfWeek, literalMonth, dayOfMonth, year} = getStringDateParts(date.toString());
    const formattedDate = `${dayOfWeek} 🞗 ${literalMonth} ${dayOfMonth}, ${year}`
    return (
      <div className="[grid-area:header] border border-solid border-neutral-300 sm:border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800 rounded-tl-2xl rounded-tr-2xl p-4 flex flex-col gap-1">
        <h2 className="text-2xl font-bold dark:text-neutral-50 mb-2">Next Game</h2>
        <GameInfoLine icon={<CalendarIcon className="text-zinc-500 dark:text-zinc-400 size-4" />} text={formattedDate} isLink={false}/>
        <GameInfoLine icon={<LocationIcon className="text-zinc-500 dark:text-zinc-400 size-4 flex-none"/>} text={name} isLink={false}/>
        <GameInfoLine icon={<ClockIcon className="text-zinc-500 dark:text-zinc-400 size-4"/>} text={`${start} - ${end}`} isLink={false}/>
      </div>
    ) 
  } else {
    return null
  }
}

const PlayerLetterAvatar = ({firstName, status}: {firstName: string; status: string}) => {
  const color: string = status === 'confirmed' ? `text-orange-500/90 dark:text-orange-400 bg-orange-500/10 ` : `text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20`
  return (
    <div className={`size-9 sm:size-10 flex items-center justify-center p-4 border border-solid border-neutral-200 dark:border-neutral-800 rounded-full ${color}`}>
      <span className="text-xl font-medium leading-1">{firstName.charAt(0).toUpperCase()}</span>
    </div>
  )
}

const PlayerProfile = ({firstName, registrationTime}: {firstName: string, registrationTime: string}) => {
  const sanitizedFirstName = firstName.trim().replace(firstName.charAt(0), firstName.charAt(0).toUpperCase())
  return (
    <div className="flex flex-col justify-between">
      <div className="sm:text-base font-medium dark:text-neutral-50">{sanitizedFirstName}</div>
      <div className="text-xs tracking-tight text-zinc-500 dark:text-zinc-400">{`Joined on ${registrationTime}`}</div>
    </div>
  )
}

const PlayersStatusTabs = ({statusTabs, toggleActive, players}: {statusTabs: StatusTabsProps[]; toggleActive: (status: string) => void, players: Player[]}) => {
  const playerStatusColor = (tab: string) => {
    return tab === 'Confirmed'
      ? 'text-orange-500/90 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20'
      : 'text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20'
  }
  const activePlayerTab = (tab: string) => tab === 'Confirmed' ? 'text-white bg-orange-500/90 dark:bg-orange-500' : 'text-white bg-blue-500 dark:bg-blue-600'
  const activePlayerAmountTab = (tab: string) => tab === 'Confirmed' ? 'text-orange-500/90 dark:text-orange-400 bg-white' : 'text-blue-500 dark:text-blue-400 bg-white'
  const defaultPlayerTab = 'w-40 font-medium border border-solid border-neutral-200 dark:border-neutral-800 flex justify-center rounded-2xl whitespace-nowrap px-8 py-2 box-border cursor-pointer'
  const confirmed = players.filter(( {status} ) => status === 'Confirmed Player')
  const count = (status: string): number => status === 'Confirmed' ? confirmed.length : players.length - confirmed.length
  return (
    <div className="text-sm sm:text-base [grid-area:tabs] justify-self-center flex items-center justify-center flex-wrap gap-4 p-4 lg:hidden">
      {statusTabs.map((tab) => (
        <button key={tab.status} className={`${defaultPlayerTab} ${tab.isActive ? `${activePlayerTab(tab.status)}` : `${playerStatusColor(tab.status)}`}`} onClick={() => toggleActive(tab.status)} >
          {tab.status}
          <span className={`px-2 ml-2 font-medium border border-solid border-neutral-200 dark:border-none rounded-2xl ${tab.isActive ? `${activePlayerAmountTab(tab.status)}` : `${playerStatusColor(tab.status)}`}`}>
            {count(tab.status)}
          </span>
        </button>
      ))}
    </div>
  )
}

const Players = ({players, status, active, deletePlayer }: {players: Player[]; status: string; active: boolean, deletePlayer: (guestId: string | undefined) => void}) => {
  const playerColor = status === 'confirmed' ? 'bg-orange-500/10 dark:bg-orange-500/20' : 'bg-blue-500/10 dark:bg-blue-500/20'
  const playerArea = status === 'confirmed' ? 'lg:[grid-area:confirmed-col]' : 'lg:[grid-area:potential-col]'
  const confirmedBg = 'bg-orange-500/90 dark:bg-orange-400'
  const potentialBg = 'bg-blue-500 dark:bg-blue-600'
  const playerCircleColor = status === 'confirmed' ? confirmedBg : potentialBg
  const {admin : {isAdmin}} = useHeaderContext()
  return (
    <div className={`grid ${active ? `[grid-area:players-col]` : `hidden`}  lg:block ${playerArea} ${playerColor} [grid-template-areas:var(--players-col-layout)] border border-solid border-neutral-300 sm:border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800 `} >
      <div className={`[grid-area:category] dark:text-white text-center justify-self-center self-center py-4 font-medium`}>{`${status === 'confirmed' ? `Confirmed` : `Potential`} Players (${players.length})`}</div>
      <div className="[grid-area:players] justify-self-stretch whitespace-nowrap border border-solid border-neutral-200 dark:border-neutral-800 max-h-62.5 overflow-auto">
        {players.map(({guestId, firstName, registrationTime}, index) => (
          <div key={index} className="h-[62.5px] flex justify-between items-center pt-2 pr-4 pb-2 pl-2 border border-solid border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800">
            <div className="flex gap-3">
              <PlayerLetterAvatar firstName={firstName} status={`${status === `confirmed` ? `confirmed` : `potential`}`} />
              <PlayerProfile firstName={firstName} registrationTime={registrationTime} />
            </div>
            { isAdmin ? ( 
            <button
              className="font-black text-3xl text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
              type="button"
              aria-label="Close"
              onClick={() => deletePlayer(guestId)}
            >
              &times;
            </button>) : 
            <div className={`size-2.5 rounded-full flex-none ${playerCircleColor}`}></div> 
            }
          </div>
        ))}
      </div>
    </div>
  )
}

const RegisteredPlayersTable = ({gameEvent, deletePlayer}: {gameEvent: GameEvent | undefined, deletePlayer: (guestId: string | undefined) => void}) => {
  let players : Player[], capacity: number, isAvailable: boolean, open: boolean;
  if (gameEvent) {
    players = gameEvent.registeredPlayers;
    capacity = gameEvent.capacity;
    isAvailable = isGameAvailable(gameEvent);
    open = gameEvent.openRegistrations;
  } else {
    players = []
    capacity = 0;
    isAvailable = false;
    open = false;
  }

  const {confirmed, potential} = Object.groupBy(players, (registeredPlayers) =>
    registeredPlayers.status === 'Confirmed Player' ? 'confirmed' : 'potential',
  )
  const confirmedPlayers = confirmed ?? []
  const potentialPlayers = potential ?? []
  const currentCapacityColor = !isAvailable || !open ? `text-red-500 dark:text-red-600` : `text-green-500 dark:text-green-600`

  const playerStatusTabs: StatusTabsProps[] = [
    {isActive: true, status: 'Confirmed'},
    {isActive: false, status: 'Potential'},
  ]
  const [statusTabs, setStatusTabs] = useState<StatusTabsProps[]>(playerStatusTabs)
  const handleActiveToggle = (status: string) => {
    setStatusTabs(statusTabs.map((tab) => (tab.status === status ? {...tab, isActive: true} : {...tab, isActive: false})))
  }
  return  (
    <div className="max-w-6xl sm:w-[55vw] bg-white dark:bg-black grid [grid-template-areas:var(--mobile-layout-areas)] lg:[grid-template-areas:var(--desktop-layout-areas)] grid-cols-2 gap-px border border-solid border-neutral-300 sm:border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800 rounded-2xl shadow-md overflow-hidden">
      <UpcomingGameDetail gameEvent={gameEvent} />
      <PlayersStatusTabs statusTabs={statusTabs} toggleActive={handleActiveToggle} players={players} />
      <Players players={confirmedPlayers} status="confirmed" active={statusTabs[0].isActive} deletePlayer={deletePlayer}/>
      <Players players={potentialPlayers} status="potential" active={statusTabs[1].isActive} deletePlayer={deletePlayer}/>
      { capacity > 0 && <div className={`p-4 font-medium [grid-area:footer] text-center border border-solid border-neutral-300 sm:border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800 rounded-bl-2xl rounded-br-2xl ${currentCapacityColor}`} >
        {`${!isAvailable ? `FULL` : !open ? `CLOSED` : `${capacity - players.length} Spots Left`}`}
      </div>
      }
    </div>
  )
}

const RegisteredPlayers = ({gameEvent, addPlayer, deletePlayer} : { gameEvent: GameEvent | undefined, addPlayer: (player: Player) => void, deletePlayer: (guestId: string | undefined) => void}) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const {admin: {isAdmin}} = useHeaderContext();
  return (
    <section className="flex flex-col items-center bg-white dark:bg-black px-[10vw] py-20 border-box gap-8">
      <AddPlayerModal isActive={isModalActive} closeCard={() => setIsModalActive((v) => !v)} addPlayer={addPlayer}/>
      <RegisteredPlayersHeader/>
      {isGameAvailable(gameEvent) && isAdmin && <OrangeButton extra="px-4 py-2 sm:px-6 sm:py-2" text="Add Player To Game Event" onClick={() => setIsModalActive((v) => !v)}/>}
      <RegisteredPlayersTable gameEvent={gameEvent} deletePlayer={deletePlayer} />
    </section>
  )
}

export default RegisteredPlayers
