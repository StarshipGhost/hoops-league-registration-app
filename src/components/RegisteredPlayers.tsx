import {useState} from 'react'
import CalendarIcon from './icons/CalendarIcon'
import ClockIcon from './icons/ClockIcon'
import LocationIcon from './icons/LocationIcon'
import UsersIcon from './icons/UsersIcon'
import type {GameEvent} from '../types/GameEvent'
import type {Player} from '../types/Player'
import {timeString, dateFormat} from '../utilities/timeString'
import SectionHeader from './SectionHeader'

interface StatusTabsProps {
  isActive: boolean
  status: string
  participants: number
}

const RegisteredPlayersHeader = () => {
  const sectionHeaderIcon: {icon: React.ReactNode} = {icon: <UsersIcon className="text-orange-500/90 dark:text-orange-500 size-6" />}
  return (
    <SectionHeader
      sectionIcon={sectionHeaderIcon}
      iconBg={'bg-orange-500/10 dark:bg-orange-500/20'}
      title={'Registered Players'}
      description={'Live list for the upcoming session.'}
    />
  )
}

const UpcomingGameDetail = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {
    date,
    start,
    end,
    location: {name},
  } = gameEvent

  return (
    <div className="[grid-area:header] border border-solid border-neutral-200 dark:border-neutral-800 rounded-tl-2xl rounded-tr-2xl p-4 flex flex-col gap-1">
      <h2 className="dark:text-neutral-50 mb-1">Next Game</h2>
      <div className="flex items-center gap-1.5">
        <CalendarIcon className="text-zinc-500 dark:text-zinc-400 w-4 h-4" />
        <span className=" dark:text-neutral-50">{dateFormat(date)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <LocationIcon className="text-zinc-500 dark:text-zinc-400 w-4 h-4 flex-none" />
        <span className=" dark:text-neutral-50">{name}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <ClockIcon className="text-zinc-500 dark:text-zinc-400 w-4 h-4" />
        <span className=" dark:text-neutral-50">{`${timeString(start)} - ${timeString(end)}`}</span>
      </div>
    </div>
  )
}

const PlayerLetterAvatar = ({firstName, status}: {firstName: string; status: string}) => {
  const color: string = status === 'confirmed' ? `text-orange-600 bg-orange-500/10 ` : `text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20`
  return (
    <div className={`size-10 flex items-center justify-center p-4 border border-solid border-neutral-200 dark:border-neutral-800 rounded-full ${color}`}>
      <span className="text-xl font-medium leading-1">{firstName.charAt(0).toUpperCase()}</span>
    </div>
  )
}

const PlayerProfile = ({firstName}: {firstName: string}) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="font-medium dark:text-neutral-50">{firstName}</div>
      <div className="text-xs text-zinc-500 dark:text-zinc-400">{`Joined on 2026-02-10 at 19:52`}</div>
    </div>
  )
}

const PlayersStatusTabs = ({statusTabs, toggleActive}: {statusTabs: StatusTabsProps[]; toggleActive: (status: string) => void}) => {
  const playerStatusColor = (tab: string) => {
    return tab === 'Confirmed'
      ? 'text-orange-600 dark:orange-400 bg-orange-500/10 dark:bg-orange-500/20'
      : 'text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20'
  }

  const activePlayerTab = (tab: string) => {
    return tab === 'Confirmed' ? 'text-white bg-orange-500/90 dark:bg-orange-500' : 'text-white bg-blue-500 dark:bg-blue-600'
  }

  const activePlayerAmountTab = (tab: string) => {
    return tab === 'Confirmed' ? 'text-orange-600 dark:orange-400 bg-zinc-50' : 'text-blue-500 dark:text-blue-400 bg-zinc-50'
  }
  const defaultPlayerTab = 'w-40 font-medium border border-solid border-neutral-200 dark:border-neutral-800 flex justify-center rounded-2xl whitespace-nowrap px-8 py-2 box-border cursor-pointer'
  return (
    <div className="[grid-area:tabs] justify-self-center flex items-center justify-center flex-wrap gap-4 p-4 lg:hidden">
      {statusTabs.map((tab) => (
        <button
          key={tab.status}
          className={`${defaultPlayerTab} ${tab.isActive ? `${activePlayerTab(tab.status)}` : `${playerStatusColor(tab.status)}`}`}
          onClick={() => toggleActive(tab.status)}
        >
          {tab.status}
          <span className={`rounded-2xl px-2 font-medium ml-2  ${tab.isActive ? `${activePlayerAmountTab(tab.status)}` : `${playerStatusColor(tab.status)}`}`}>
            {tab.participants}
          </span>
        </button>
      ))}
    </div>
  )
}

const Players = ({players, status, active}: {players: Player[]; status: string; active: boolean}) => {
  const playerColor = status === 'confirmed' ? 'bg-orange-500/10 dark:bg-orange-500/20' : 'bg-blue-500/10 dark:bg-blue-500/20'
  const playerArea = status === 'confirmed' ? 'lg:[grid-area:confirmed-col]' : 'lg:[grid-area:potential-col]'
  const confirmedBg = 'bg-orange-600 dark:bg-orange-400'
  const potentialBg = 'bg-blue-500 dark:bg-blue-600'
  const playerCircleColor = status === 'confirmed' ? confirmedBg : potentialBg
  return (
    <div className={`grid  ${active ? `[grid-area:players-col]` : `hidden`}  lg:block ${playerArea} ${playerColor} [grid-template-areas:var(--players-col-layout)] border border-solid border-neutral-200 dark:border-neutral-800 `} >
      <div className={`[grid-area:category] dark:text-white text-center justify-self-center self-center p-4 font-medium`}>{`${status === 'confirmed' ? `Confirmed` : `Potential`} Players (${players.length})`}</div>
      <div className="[grid-area:players] justify-self-stretch whitespace-nowrap border border-solid border-neutral-200 dark:border-neutral-800 max-h-[250px] overflow-auto">
        {players.map(({firstName}, index) => (
          <div key={index} className="flex justify-between items-center pt-2 pr-4 pb-2 pl-2 border border-solid border-neutral-200 dark:border-neutral-800">
            <div className="flex gap-3">
              <PlayerLetterAvatar firstName={firstName} status={`${status === `confirmed` ? `confirmed` : `potential`}`} />
              <PlayerProfile firstName={firstName} />
            </div>
            <div className={`size-2.5 rounded-full flex-none ${playerCircleColor}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const RegisteredPlayersTable = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {registeredPlayers, capacity} = gameEvent
  const {confirmed, potential} = Object.groupBy(registeredPlayers, (registeredPlayers) =>
    registeredPlayers.status === 'Confirmed Player' ? 'confirmed' : 'potential',
  )
  const isFull = (registeredPlayers: number) => registeredPlayers >= capacity

  const confirmedPlayers = confirmed ?? []
  const potentialPlayers = potential ?? []

  const playerStatusTabs: StatusTabsProps[] = [
    {isActive: true, status: 'Confirmed', participants: confirmedPlayers.length},
    {isActive: false, status: 'Potential', participants: potentialPlayers.length},
  ]

  const [statusTabs, setStatusTabs] = useState<StatusTabsProps[]>(playerStatusTabs)
  const handleActiveToggle = (status: string) => {
    setStatusTabs(statusTabs.map((tab) => (tab.status === status ? (tab.isActive ? tab : {...tab, isActive: !tab.isActive}) : {...tab, isActive: false})))
  }
  const currentCapacityColor = isFull(registeredPlayers.length) ? `text-red-500 dark:text-red-600` : `text-green-500 dark:text-green-600`

  return (
    <div className="w-[50vw] min-w-[275px] bg-white dark:bg-black grid [grid-template-areas:var(--mobile-layout-areas)] lg:[grid-template-areas:var(--desktop-layout-areas)] grid-cols-2 gap-[1px] border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md">
      <UpcomingGameDetail gameEvent={gameEvent} />
      <PlayersStatusTabs statusTabs={statusTabs} toggleActive={handleActiveToggle} />
      <Players players={confirmedPlayers} status="confirmed" active={statusTabs[0].isActive} />
      <Players players={potentialPlayers} status="potential" active={statusTabs[1].isActive} />
      <div
        className={`p-4 font-medium [grid-area:footer] text-center border border-solid border-neutral-200 dark:border-neutral-800 rounded-bl-2xl rounded-br-2xl ${currentCapacityColor}`}
      >
        {`${isFull(registeredPlayers.length) ? `FULL` : `${capacity - registeredPlayers.length} Spots Left`}`}
      </div>
    </div>
  )
}

const RegisteredPlayers = () => {
  const gameEvent = {
    date: new Date('2026-02-05'),
    start: new Date('2026-02-05T10:00'),
    end: new Date('2026-02-05T12:45'),
    location: {
      name: 'Complexe sportif du Collège Bois de Boulogne - 2e étage',
      link: 'https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
    },
    registeredPlayers: [],
    capacity: 23,
  }
  return (
    <div className="flex flex-col items-center bg-white dark:bg-black px-[10vw] py-20 border-box gap-8">
      <RegisteredPlayersHeader />
      <RegisteredPlayersTable gameEvent={gameEvent} />
    </div>
  )
}

export default RegisteredPlayers
