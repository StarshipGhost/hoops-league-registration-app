import CalendarIcon from './icons/CalendarIcon'
import LocationIcon from './icons/LocationIcon'
import ClockIcon from './icons/ClockIcon'
import UsersIcon from './icons/UsersIcon'

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

const ScheduleCard = ({
  day,
  date,
  duration,
  location,
  spotsTaken,
  tag,
}: {
  day: string
  date: string
  duration: string
  location: string
  spotsTaken: number
  tag: string
}) => {
  return (
    <div className="schedule-card">
      <div className="card-top">
        <div className="game-date">
          <h2>{day}</h2>
          <div>{date}</div>
        </div>
        <div className="tag schedule-tag" id="open-schedule">
          <span>{tag}</span>
        </div>
      </div>

      <div className="card-center">
        <div className="icon-info">
          <ClockIcon color={'#7c7c84'} />
          <span>{duration}</span>
        </div>
        <div className="icon-info">
          <LocationIcon />
          <span>{location}</span>
        </div>
        <div className="icon-info">
          <UsersIcon color={'#7c7c84'} />
          <span>{spotsTaken} of 10 spots available</span>
        </div>
      </div>

      <div className="card-bottom">
        <div className="progress-text">
          <span>Registstered Players</span>
          <span>4/10</span>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar-container fill-orange"></div>
          <div className="progress-bar-container fill-blue"></div>
        </div>
        <div className="legend-player-status">
          <div className="player-status">
            <div className="circle fill-orange"></div>
            <div className="text">Confirmed players 🞗 8</div>
          </div>
          <div className="player-status">
            <div className="circle fill-blue"></div>
            <div className="text">Potential players 🞗 4</div>
          </div>
        </div>
        <div className="schedule-card-button-container">
          <button className="button schedule-card-button">Join Game</button>
        </div>
      </div>
    </div>
  )
}

const Schedule = () => {
  return (
    <div className="section-container" id="even-section">
      <ScheduleHeader />
      <div className="schedule-card-container">
        <ScheduleCard day="Monday" date="Jan 15, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
        <ScheduleCard day="Tuesday" date="Jan 16, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
        <ScheduleCard day="Monday" date="Jan 15, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
        <ScheduleCard day="Tuesday" date="Jan 16, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
        <ScheduleCard day="Tuesday" date="Jan 16, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
      </div>
    </div>
  )
}

export default Schedule;