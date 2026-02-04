import ClockIcon from './components/icons/ClockIcon'
import LocationIcon from './components/icons/LocationIcon'
import UsersIcon from './components/icons/UsersIcon'
import CalendarIcon from './components/icons/CalendarIcon'
import BookIcon from './components/icons/BookIcon'
import ShirtIcon from './components/icons/ShirtIcon'
import SafetyIcon from './components/icons/SafetyIcon'
import CancelIcon from './components/icons/CancelIcon'
import WarningIcon from './components/icons/WarningIcon'
import CheckIcon from './components/icons/CheckIcon'
import DollarSignIcon from './components/icons/DollarSignIcon'
import CardIcon from './components/icons/CardIcon'
import UserAdditionIcon from './components/icons/UserAdditionIcon'
import {useState, type JSX} from 'react'
import type {Rule} from './types/Rules'
import './App.css'
import CustomRadioButton from './components/customs/RadioButton'

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
        <li className="navigation-link hide-on-mobile text"> Schedule </li>
        <li className="navigation-link hide-on-mobile text"> Rules </li>
        <li className="navigation-link hide-on-mobile text"> Pricing </li>
        <li className="navigation-link hide-on-mobile text"> Register </li>
        <li> <button className="button navigation-button hide-on-mobile" id="button"> Join Now </button> </li>
      </ul>
      <span className="material-symbols-outlined hide-on-desktop"> menu </span>
    </div>
  )
}

const HeroIntro = () => {
  return (
    <div className="hero-intro-container">
      <div className="tag" id="hero-orange-tag">
        <span>🏀</span>
        <span>Join the Community</span>
      </div>
      <div className="hero-title">
        <h1>Play Basketball</h1>
        <h1 style={{color: `#ff7835`}}>Every Week</h1>
      </div>
      <p className="text" id="text-center">
        Join our organized basketball games for all skill levels. Meet new players, improve your game, and have fun on the court every week.
      </p>
    </div>
  )
}

const HeroButton = () => {
  return (
    <div className="hero-button-container">
      <button className="button hero-button" id="hero-register-button">
        Register Now
      </button>
      <button className="button hero-button" id="hero-schedule-button">
        View Schedule
      </button>
    </div>
  )
}

const HeroInformation = () => {
  return (
    <div className="hero-information">
      <div className="information-container">
        <span id="number">100+ </span>
        <span className="text">Active Players</span>
      </div>
      <div className="information-container">
        <span id="number">4 </span>
        <span className="text">Games/Week</span>
      </div>
      <div className="information-container">
        <span id="number">3 </span>
        <span className="text">Courts</span>
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
const RulesHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container" id="blue-tag">
        <BookIcon />
      </div>
      <h1 style={{whiteSpace: 'nowrap'}}>Rules & Guidelines</h1>
      <p className="text" id="text-center">
        Please review our rules to ensure a safe and enjoyable experience for everyone.
      </p>
    </div>
  )
}
const GameFormat = () => {
  return (
    <div className="game-format-container">
      <h2>Game Format</h2>
      <p style={{color: '#7c7c84', textAlign: 'justify'}}>
        Our games are organized as 5-on-5 full court matches with rotating teams to ensure everyone gets equal playing time and some rest if needed. Each
        session includes warm-up time and multiple games.
      </p>
    </div>
  )
}

const RuleCard = ({icon, name, description}: {icon: JSX.Element; name: string; description: string}) => {
  return (
    <div className="rule-card">
      <div className="icon-container" id="square-tag">
        {icon}
      </div>
      <div className="rule-text">
        <h3 style={{marginBottom: '0.5rem'}}>{name}</h3>
        <p className="text">{description}</p>
      </div>
    </div>
  )
}

const Rules = ({rules}: {rules: Rule[]}) => {
  return (
    <div className="section-container" id="odd-section">
      <RulesHeader />
      <GameFormat />
      <div className="rule-card-container">
        {rules.map(({icon, name, description}) => (
          <RuleCard key={name} icon={icon} name={name} description={description} />
        ))}
      </div>
    </div>
  )
}

const PricingHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container" id="green-tag">
        <DollarSignIcon />
      </div>
      <h1 style={{whiteSpace: 'nowrap'}}>Pricing & Payment</h1>
      <p className="text" id="text-center">
        The price include court rental and equipements
      </p>
    </div>
  )
}

const PricingCard = () => {
  return (
    <div className="pricing-card">
      <h2>Single Game</h2>
      <div className="game-price-container">
        <h1 className="price">$15</h1>
        <span id="text">per game</span>
      </div>
      <p className="text" id="text-center">
        Perfect for trying out our games
      </p>
      <div className="benefits-container">
        <div className="check-icon-container">
          <CheckIcon />
          <span className="benefit-text">Access to one game session</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>More than 2 hours of play time</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>All equipement provided</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>Drinks included</span>
        </div>
        <div className="check-icon-container">
          <CheckIcon />
          <span>Beginner friendly</span>
        </div>
      </div>
      <button className="button" id="pricing-button">
        Get Started
      </button>
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="payment-method-container">
      <div className="payment-method-header">
        <CardIcon />
        <h2>Accepted Payment Methods</h2>
      </div>
      <div className="check-icon-container">
        <CheckIcon />
        <span>Cash (at venue)</span>
      </div>
      <div className="payment-method-note">
        <b>Note: </b>
        <span className="text">
          If there are no spots left and you have a reserved spot (as a confirmed player), any no-show or cancellation within 2 hours of the games will count as
          a presence.
        </span>
      </div>
    </div>
  )
}

const Pricing = () => {
  return (
    <div className="section-container" id="even-section">
      <PricingHeader />
      <PricingCard />
      <PaymentMethod />
    </div>
  )
}

const RegistrationHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container" id="orange-tag">
        <UserAdditionIcon />
      </div>
      <h1 style={{whiteSpace: 'nowrap'}}>Register to Play</h1>
      <p className="text" id="text-center">
        Fill out the form below to reserve your spot in the upcoming game
      </p>
    </div>
  )
}

const RegistrationForm = () => {
  const currentOptions: {playerStatus: string; text: string; isSelected: boolean; style: string}[] = [
    {playerStatus: 'Confirmed Player', text: 'I will definitely attend this game', isSelected: false, style: 'confirmed-player'},
    {playerStatus: 'Potential Player', text: "I'm not sure yet, but count me in for now", isSelected: false, style: 'potential-player'},
  ]

  const [options, setOptions] = useState<{playerStatus: string; text: string; isSelected: boolean; style: string}[]>(currentOptions)
  const selectedOption = options.find((option) => option.isSelected)

  const handleRadioChange = (playerStatus: string) => {
    return setOptions(
      options.map((option) =>
        option.playerStatus === playerStatus
          ? !option.isSelected
            ? {...option, isSelected: !option.isSelected}
            : option
          : option.isSelected
            ? {...option, isSelected: false}
            : option,
      ),
    )
  }
  return (
    <form className="register-form-card">
      <div className="register-form-input-container">
        <span className="register-form-label">First Name *</span>
        <input className="register-form-input" type="text" placeholder="Your name"></input>
      </div>
      <div className="register-form-input-container">
        <span className="register-form-label">Player Status *</span>
        <div className="radio-container">
          {options.map(({playerStatus, text, isSelected, style}) => (
            <CustomRadioButton
              key={playerStatus}
              playerStatus={playerStatus}
              text={text}
              isSelected={isSelected}
              style={style}
              onChangeHandler={() => handleRadioChange(playerStatus)}
            />
          ))}
        </div>
      </div>
      <button className="button register-button" id={selectedOption?.style} onSubmit={(e) => e.preventDefault()}>
        Complete reservation
      </button>
    </form>
  )
}

const Registration = () => {
  return (
    <div className="section-container" id="odd-section">
      <RegistrationHeader />
      <RegistrationForm />
    </div>
  )
}

const FooterSummary = () => {
  return (
    <div className="footer-summary-container">
      <BasketballLogo />
      <p className="text" id="footer-text">
        Bringing basketball enthusiast together for competitive and fun games every week
      </p>
    </div>
  )
}

const FooterLinks = () => {
  return (
    <div className="footer-col" id="footer-links">
      <div style={{fontWeight: '500'}}>Quick Links</div>
      <div className="navigation-link text">Schedule</div>
      <div className="navigation-link text">Rules</div>
      <div className="navigation-link text">Pricing</div>
      <div className="navigation-link text">Register</div>
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="footer-col" id="footer-contact">
      <div style={{fontWeight: '500'}}>Contact</div>
      <div className="text">Email: info@hoopsleague.com</div>
      <div className="text">Phone: (438)-xxx-xxxx</div>
      <div className="text">Hours: Mon-Sun, 6AM-10PM</div>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div className="footer-col" id="footer-socials">
      <div style={{fontWeight: '500'}}>Follow Us</div>
      <div className="navigation-link text">Facebook</div>
      <div className="navigation-link text">Instagram</div>
      <div className="navigation-link text">Twitter</div>
    </div>
  )
}

const FooterInformation = () => {
  return (
    <div className="footer-grid">
      <FooterLinks />
      <FooterContact />
      <FooterSocials />
    </div>
  )
}

const Footer = () => {
  return (
    <div className="footer">
      <FooterSummary />
      <FooterInformation />
    </div>
  )
}

function App() {
  const rules: Rule[] = [
    {
      name: 'Respect All Players',
      description: "Treat all participant with respect regardless of skill level. We're here to have fun and improve together.",
      icon: <UsersIcon color={'#e87521'} />,
    },
    {
      name: 'Arrive on Time',
      description: 'Please arrive 10 or 15mins before the game so we can start as soon as it begins.',
      icon: <ClockIcon color={'#e87521'} />,
    },
    {
      name: 'Proper Attire Required',
      description: 'Wear appropriate basketball shoes and athletic clothing. No jeans, boots or street shoes on the court.',
      icon: <ShirtIcon />,
    },
    {
      name: 'Fair play',
      description: 'Play clean and call your own fouls honestly. Excessive physicall play will result in removal from the game.',
      icon: <SafetyIcon />,
    },
    {
      name: 'Equipement Care',
      description: 'Respect the facility and equipement. clean up after yourself and report any damage immediately.',
      icon: <WarningIcon />,
    },
    {
      name: 'Cancellation Policy',
      description:
        'Cancel at least 2 hours in advance to give the opportunity to other players in the waitlist to participate, No-shows will be charged for the session.',
      icon: <CancelIcon />,
    },
  ]
  return (
    <div>
      <Header />
      <div className="app-container">
        <Hero />
        <Schedule />
        <Rules rules={rules} />
        <Pricing />
        <Registration />
      </div>
      <Footer />
    </div>
  )
}

export default App
