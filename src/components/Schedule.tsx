import CalendarIcon from './icons/CalendarIcon'
import LocationIcon from './icons/LocationIcon'
import ClockIcon from './icons/ClockIcon'
import UsersIcon from './icons/UsersIcon'
import type {GameEvent} from '../types/GameEvent'
import type {Player} from '../types/Player'

const ScheduleHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container" id="orange-tag">
        <CalendarIcon />
      </div>
      <h1 style={{whiteSpace: 'nowrap'}}>Weekly Schedule</h1>
      <p className="text" id="text-center">
        Check out our weekly games and reserve your spot. The schedule is updated regularly!
      </p>
    </div>
  )
}

const CardTopPart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {date, registeredPlayers, capacity} = gameEvent
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const isFull = (n: number) => n >= capacity
  return (
    <div className="card-top">
      <div className="game-date">
        <h2>{days[date.getDay()]}</h2>
        <div>{`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}</div>
      </div>
      <div className="tag schedule-tag" id={isFull(registeredPlayers.length) ? `closed-schedule` : `open-schedule`}>
        <span>{isFull(registeredPlayers.length) ? 'FULL' : 'OPEN'}</span>
      </div>
    </div>
  )
}

const CardMiddlePart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {
    start,
    end,
    location: {name, link},
    registeredPlayers,
    capacity,
  } = gameEvent

  const timeString = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

  return (
    <div className="card-center">
      <div className="icon-info">
        <ClockIcon color={'#7c7c84'} />
        <span>{`${timeString(start)} - ${timeString(end)}`}</span>
      </div>
      <div className="icon-info">
        <LocationIcon />
        <span>
          <a href={link}>{name}</a>
        </span>
      </div>
      <div className="icon-info">
        <UsersIcon color={'#7c7c84'} />
        <span>{`${registeredPlayers.length} of ${capacity} spots available`}</span>
      </div>
    </div>
  )
}

const ProgressBar = ({confirmedPlayers, potentialPlayers, capacity}: {confirmedPlayers: Player[]; potentialPlayers: Player[]; capacity: number}) => {
  const orangeProgressStyle = {
    '--orange-progress': `${Math.min((confirmedPlayers.length / capacity) * 100, 100)}%`,
  } as React.CSSProperties

  const blueProgressStyle = {
    '--blue-progress': `${Math.min((potentialPlayers.length / capacity) * 100, 100)}%`,
  } as React.CSSProperties
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-container fill-orange" style={orangeProgressStyle}></div>
      <div className="progress-bar-container fill-blue" style={blueProgressStyle}></div>
    </div>
  )
}

const Legend = ({confirmedPlayers, potentialPlayers}: {confirmedPlayers: Player[]; potentialPlayers: Player[]}) => {
  return (
    <div className="legend-player-status">
      <div className="player-status">
        <div className="circle fill-orange"></div>
        <div className="text">{`Confirmed Players 🞗 ${confirmedPlayers.length}`}</div>
      </div>
      <div className="player-status">
        <div className="circle fill-blue"></div>
        <div className="text">{`Potential players 🞗 ${potentialPlayers.length}`}</div>
      </div>
    </div>
  )
}

const CardBottomPart = ({gameEvent}: {gameEvent: GameEvent}) => {
  const {registeredPlayers, capacity} = gameEvent
  const {confirmed, potential} = Object.groupBy(registeredPlayers, (registeredPlayers) =>
    registeredPlayers.status === 'Confirmed Player' ? 'confirmed' : 'potential',
  )

  return (
    <div className="card-bottom">
      <div className="progress-text">
        <span>Registered Players</span>
        <span>{`${registeredPlayers.length}/${capacity}`}</span>
      </div>
      <ProgressBar confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} capacity={capacity} />
      <Legend confirmedPlayers={confirmed ? confirmed : []} potentialPlayers={potential ? potential : []} />
      <div className="schedule-card-button-container">
        <button className="button schedule-card-button">Join Game</button>
      </div>
    </div>
  )
}

const ScheduleCard = ({gameEvent}: {gameEvent: GameEvent}) => {
  return (
    <div className="schedule-card">
      <CardTopPart gameEvent={gameEvent} />
      <CardMiddlePart gameEvent={gameEvent} />
      <CardBottomPart gameEvent={gameEvent} />
    </div>
  )
}

const Schedule = () => {
  const schedule: GameEvent[] = [
    {
      date: new Date('2026-02-05'),
      start: new Date('2026-02-05T10:00'),
      end: new Date('2026-02-05T12:45'),
      location: {
        name: 'Complexe sportif du Collège Bois de Boulogne - 2ième étage',
        link: 'https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
      },
      registeredPlayers: [],
      capacity: 23,
    },
    {
      date: new Date('2026-02-06'),
      start: new Date('2026-02-06T15:00'),
      end: new Date('2026-02-06T18:45'),
      location: {
        name: 'Complexe sportif du Collège Bois de Boulogne - 2ième étage',
        link: 'https://www.google.com/maps/place/10500+Ave+de+Bois-de-Boulogne,+Montreal,+QC+H4N+1L4/@45.5363681,-73.6761788,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc9188eaf11c6dd:0xab8ca3e2415cadc5!8m2!3d45.5363681!4d-73.6736039!16s%2Fg%2F11nntq6jk2?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
      },
      registeredPlayers: [],
      capacity: 20,
    },
    {
      date: new Date('2026-02-14'),
      start: new Date('2026-02-14T21:00'),
      end: new Date('2026-02-14T23:30'),
      location: {
        name: 'École Spécialisée | Victor-Doré',
        link: 'https://www.google.com/maps/place/1985+Rue+Victor+Dor%C3%A9,+Montr%C3%A9al,+QC+H3M+1S4/@45.5370461,-73.6908979,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc918816dcb2e81:0x9c09f7567d8965ec!8m2!3d45.5370461!4d-73.688323!16s%2Fg%2F11m62qjrw_?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D',
      },
      registeredPlayers: [],
      capacity: 13,
    },
  ]
  return (
    <div className="section-container" id="even-section">
      <ScheduleHeader />
      <div className="schedule-card-container">
        {schedule.map((schedule) => (
          <ScheduleCard key={schedule.date.getDay()} gameEvent={schedule} />
        ))}
      </div>
    </div>
  )
}

export default Schedule
