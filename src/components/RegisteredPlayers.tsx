import CalendarIcon from './icons/CalendarIcon'
import ClockIcon from './icons/ClockIcon'
import LocationIcon from './icons/LocationIcon'
import UsersIcon from './icons/UsersIcon'
import type {GameEvent} from '../types/GameEvent'
import type {Player} from '../types/Player'
import {timeString, dateFormat} from '../utilities/timeString'

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

const Players = ({players, status}: {players: Player[]; status: string}) => {
  return (
    <div className="registered-players-col" id={status}>
      <div className="registered-player-status-row">{`${status === 'confirmed' ? `Confirmed` : `Potential`} Players (${players.length})`}</div>
      <div className="registered-players">
        {players.map(({firstName}) => (
          <div className="registered-player-row">
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
const RegisterdPlayerTable = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {registeredPlayers, capacity} = gameEvent
  const {confirmed, potential} = Object.groupBy(registeredPlayers, (registeredPlayers) =>
    registeredPlayers.status === 'Confirmed Player' ? 'confirmed' : 'potential',
  )

  const confirmedPlayers = confirmed ?? []
  const potentialPlayers = potential ?? []

  return (
    <div className="registered-players-grid">
      <UpcomingGameDetail gameEvent={gameEvent} />
      <Players players={confirmedPlayers} status="confirmed" />
      <Players players={potentialPlayers} status="potential" />
      <div className="registered-players-spots-left"> {capacity - registeredPlayers.length} Spots left </div>
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
      <RegisterdPlayerTable gameEvent={gameEvent} />
    </div>
  )
}

export default RegisteredPlayers
