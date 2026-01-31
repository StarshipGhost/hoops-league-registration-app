import ClockIcon from './components/ClockIcon'
import LocationIcon from './components/LocationIcon'
import UsersIcon from './components/UsersIcon'
import './App.css'
import CalendarIcon from './components/CalendarIcon'

const BasketballLogo = () => {
  return (
    <div className="brand">
      <div className="basketball-logo-container">
        <div className="basketball-logo">🏀</div>
      </div>
      <div className="brand-name">Hoops League</div>
    </div>
  )
}
const Header = () => {
  return (
    <div className="header">
      <BasketballLogo />
      <ul className="navigation-bar">
        <li className="navigation-link hide-on-mobile" id="text">
          Schedule
        </li>
        <li className="navigation-link hide-on-mobile" id="text">
          Rules
        </li>
        <li className="navigation-link hide-on-mobile" id="text">
          Pricing
        </li>
        <li className="navigation-link hide-on-mobile" id="text">
          Register
        </li>
        <li>
          <button className="button navigation-button hide-on-mobile" id="button">
            Join Now
          </button>
        </li>
      </ul>
      <span className="material-symbols-outlined hide-on-desktop"> menu </span>
    </div>
  )
}

const HeroIntro = () => {
  return (
    <div className="hero-intro-container">
      <span className="tag light-orange dark-orange">
        <span>🏀</span>
        <span>Join the Community</span>
      </span>
      <div className="hero-title">
        <h1 id="black-text">Play Basketball</h1>
        <h1 id="orange-text">Every Week</h1>
      </div>
      <p className="hero-description" id="text">
        Join our organized basketball games for all skill levels. Meet new players, improve your game, and have fun on the court every week.
      </p>
    </div>
  )
}

const HeroButton = () => {
  return (
    <div className="hero-button-container">
      <button className="button hero-button" id="register">
        Register Now
      </button>
      <button className="button hero-button" id="schedule">
        View Schedule
      </button>
    </div>
  )
}

const HeroInformation = () => {
  return (
    <div className="hero-information">
      <div className="information-container">
        <span id="number">50+ </span>
        <span id="text">Active Players</span>
      </div>
      <div className="information-container">
        <span id="number">7 </span>
        <span id="text">Games/Week</span>
      </div>
      <div className="information-container">
        <span id="number">3 </span>
        <span id="text">Courts</span>
      </div>
    </div>
  )
}
const Hero = () => {
  return (
    <div className="hero-container">
      <HeroIntro />
      <HeroButton />
      <HeroInformation />
    </div>
  )
}

const ScheduleHeader = () => {
  return (
    <div className="schedule-header-container">
      <div className="calendar-icon-container">
        <CalendarIcon />
      </div>
      <h1>Weekly Schedule</h1>
      <p id="text">Check out our weekly games and reserve your spot. The schedule is updated regularly!</p>
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
        <span className="tag" id="open-schedule">
          <span className="game-availability">{tag}</span>
        </span>
      </div>

      <div className="card-center">
        <div className="icon-info">
          <ClockIcon />
          <span>{duration}</span>
        </div>
        <div className="icon-info">
          <LocationIcon />
          <span>{location}</span>
        </div>
        <div className="icon-info">
          <UsersIcon />
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
            <div className="circle orange"></div>
            <div id="text">Confirmed players 🞗 8</div>
          </div>
          <div className="player-status">
            <div className="circle blue"></div>
            <div id="text">Potential players 🞗 4</div>
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
    <div className="schedule">
      <ScheduleHeader />
      <div className="schedule-card-container">
        <ScheduleCard day="Monday" date="Jan 15, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
        <ScheduleCard day="Tuesday" date="Jan 16, 2024" duration="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
      </div>
    </div>
  )
}
const RulesHeader = () => {
  return (
    <div>
      <h2>Rules & Guidelines</h2>
      <p>Please review our rules to ensure a safe and enjoyable experience for everyone.</p>
    </div>
  )
}
const GameFormat = () => {
  return (
    <div>
      <h3>Game Format</h3>
      <p>
        Our games are organized as 5-on-5 full court matches with rotating teams to ensure everyone gets equal playing time and some rest if needed. Each
        session includes warm-up time and multiple games.
      </p>
    </div>
  )
}

const RuleCard = ({icon, rule, description}: {icon: string; rule: string; description: string}) => {
  return (
    <div>
      <div>
        <img src={icon}></img>
      </div>
      <div>
        <h3>{rule}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

const Rules = () => {
  return (
    <div>
      <RulesHeader />
      <GameFormat />
      <RuleCard icon={''} rule="some rule" description="some description" />
    </div>
  )
}

const PricingHeader = () => {
  return (
    <div>
      <h2>Pricing & Payment</h2>
      <p>The price include court rental and equipements</p>
    </div>
  )
}

const PricingCard = () => {
  return (
    <div>
      <h3>Single Game</h3>
      <div>
        <span>$15</span>
        <span>per game</span>
      </div>
      <p>Perfect for trying out our games</p>
      <ul>
        <li>Access to one game session</li>
        <li>More than 2 hours of play time</li>
        <li>All equipement provided</li>
        <li>Drinks included</li>
        <li>Beginner friendly</li>
      </ul>
      <button>Get Started</button>
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div>
      <h3>Accepted Payment Methods</h3>
      <ul>
        <li>Cash (at venue)</li>
      </ul>
      <p>
        Note: If there are no spots left and you have a reserved spot (as confirmed player), any no-show or cancellation with 2 hours of the games will count as
        presence
      </p>
    </div>
  )
}

const Pricing = () => {
  return (
    <div>
      <PricingHeader />
      <PricingCard />
      <PaymentMethod />
    </div>
  )
}

const RegistrationHeader = () => {
  return (
    <div>
      <h2>Register to Play</h2>
      <p>Fill out the form below to reserve your spot in the upcoming game</p>
    </div>
  )
}

const RegistrationPlayerOption = () => {
  return (
    <div>
      <div>
        <input type="radio" checked={true}></input>
        <div>
          <span>Confirmed Player</span>
          <span>I will definitely attend this game</span>
        </div>
      </div>
      <div>
        <input type="radio" checked={false}></input>
        <div>
          <span>Tentative Player</span>
          <span>I'm not sure yet, but count me in for now</span>
        </div>
      </div>
    </div>
  )
}

const RegistrationForm = () => {
  return (
    <form>
      <div>
        <label>First name *</label>
        <input type="text" value="John" placeholder="Your name"></input>
      </div>
      <RegistrationPlayerOption />
      <button onSubmit={(e) => e.preventDefault()}>Complete reservation</button>
    </form>
  )
}

const Registration = () => {
  return (
    <div>
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  )
}

const FooterSummary = () => {
  return (
    <div>
      <p>Bringing basketball enthusiast together for competitive and fun games every week</p>
    </div>
  )
}

const FooterLinks = () => {
  return (
    <ul className="footer-list">
      <li className="footer-table-cell" id="header">
        Quick Links
      </li>
      <li className="footer-list-item">Schedule</li>
      <li className="footer-list-item">Rules</li>
      <li className="footer-list-item">Pricing</li>
      <li className="footer-list-item">Register</li>
    </ul>
  )
}

const FooterContact = () => {
  return (
    <ul className="footer-list">
      <li className="footer-list-item" id="header">
        Contact
      </li>
      <li className="footer-list-cell">Email: info@hoopsLeague.com</li>
      <li className="footer-list-cell">Phone: 514-xxx-xxxx</li>
      <li className="footer-list-cell">Hours: Mon-Sun,6AM-10PM</li>
    </ul>
  )
}

const FooterSocials = () => {
  return (
    <ul>
      <li className="footer-table-cell" id="header">
        Follow Us
      </li>
      <li className="footer-table-cell">Facebook</li>
      <li className="footer-table-cell">Instagram</li>
      <li className="footer-table-cell">Twitter</li>
    </ul>
  )
}

const Footer = () => {
  return (
    <div>
      <FooterSummary />
      <FooterLinks />
      <FooterContact />
      <FooterSocials />
    </div>
  )
}

function App() {
  return (
    <div>
      <Header />
      <div className="app-container">
        <Hero />
        <Schedule />
        <Rules />
        <Pricing />
        <Registration />
        <Footer />
      </div>
    </div>
  )
}

export default App
