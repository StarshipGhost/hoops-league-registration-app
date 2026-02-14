import {useState} from 'react'
import CalendarIcon from './icons/CalendarIcon'
import ClockIcon from './icons/ClockIcon'
import LocationIcon from './icons/LocationIcon'
import UsersIcon from './icons/UsersIcon'
import type {GameEvent} from '../types/GameEvent'
import type {Player} from '../types/Player'
import {timeString, dateFormat} from '../utilities/timeString'

interface StatusTabsProps {
  isActive: boolean
  status: string
  participants: number
}

const RegisteredPlayersHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container orange-tag">
        <UsersIcon />
      </div>
      <h1 className="header-title">Registered Players</h1>
      <p className="text" id="text-center">
        Live list for the upcoming session
      </p>
    </div>
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
    <div className="game-information-container">
      <h2 className="game-information-header">Next Game</h2>
      <div className="game-information">
        <CalendarIcon className="text" />
        <span id="schedule-text">{dateFormat(date)}</span>
      </div>
      <div className="game-information">
        <LocationIcon className="text" />
        <span id="schedule-text">{name}</span>
      </div>
      <div className="game-information">
        <ClockIcon className="text" />
        <span id="schedule-text">{`${timeString(start)} - ${timeString(end)}`}</span>
      </div>
    </div>
  )
}

const PlayerLetterAvatar = ({firstName, status}: {firstName: string; status: string}) => {
  return (
    <div className="player-avatar" id={status}>
      <span className="avatar-letter">{firstName.charAt(0).toUpperCase()}</span>
    </div>
  )
}

const PlayerProfile = ({firstName}: {firstName: string}) => {
  return (
    <div className="player-profile">
      <div className="player-first-name">{firstName}</div>
      <div className="text player-registration-date">{`Joined on 2026-02-10 at 19:52`}</div>
    </div>
  )
}

const PlayersStatusTabs = ({statusTabs, toggleActive}: {statusTabs: StatusTabsProps[]; toggleActive: (status: string) => void}) => {
  return (
    <div className="registered-players-tabs hide-on-desktop">
      {statusTabs.map((tab) => (
        <button
          key={tab.status}
          className={`registered-players-tab ${tab.status.toLowerCase()} ${tab.isActive ? `active` : ``}`}
          onClick={() => toggleActive(tab.status)}
        >
          {tab.status}
          <span>{tab.participants}</span>
        </button>
      ))}
    </div>
  )
}

const Players = ({players, status, active}: {players: Player[]; status: string; active: boolean}) => {
  return (
    <div className={`registered-players-col registered-players-col-${status} ${active ? `active` : `hide-on-desktop`}`}>
      <div className="registered-player-status-row">{`${status === 'confirmed' ? `Confirmed` : `Potential`} Players (${players.length})`}</div>
      <div className="registered-players">
        {players.map(({firstName}, index) => (
          <div key={index} className="registered-player-row">
            <div className="registered-player-information">
              <PlayerLetterAvatar firstName={firstName} status={`${status === `confirmed` ? `confirmed` : `potential`}`} />
              <PlayerProfile firstName={firstName} />
            </div>
            <div className={`circle fill-${status === 'confirmed' ? `orange` : `blue`}`}></div>
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

  return (
    <div className="registered-players-grid hide-on-mobile">
      <UpcomingGameDetail gameEvent={gameEvent} />
      <PlayersStatusTabs statusTabs={statusTabs} toggleActive={handleActiveToggle} />
      <Players players={confirmedPlayers} status="confirmed" active={statusTabs[0].isActive} />
      <Players players={potentialPlayers} status="potential" active={statusTabs[1].isActive} />
      <div className={`registered-players-spots-left ${isFull(registeredPlayers.length) ? `closed` : `open`}`}>
        {`${isFull(registeredPlayers.length) ? `FULL` : `${capacity - registeredPlayers.length} Spots left`}`}
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
    <div className="section-container" id="odd-section">
      <RegisteredPlayersHeader />
      <RegisteredPlayersTable gameEvent={gameEvent} />
    </div>
  )
}

export default RegisteredPlayers
