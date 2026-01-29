import './App.css'

const Header = () => {
  return (
    <div>
      <div>
        <img src={undefined}></img>
        <span>🏀</span>
        <div>Hoops League</div>
      </div>
      <ul>
        <li>Schedule</li>
        <li>Rules</li>
        <li>Pricing</li>
        <li>Register</li>
      </ul>
      <button>Join Now</button>
    </div>
  )
}

const HeroTitle = () => {
  return (
    <div>
      <img src={undefined}></img>
      <div>Join the Community</div>
      <div>
        <span>Play Basketball</span>
        <span>Every Week</span>
      </div>
    </div>
  )
}

const HeroIntro = () => {
  return <p>Join our organized basketball games for all skill levels. Meet new players, improve your game, and have fun on the court every week.</p>
}

const HeroButton = () => {
  return (
    <div>
      <button>Register Now</button>
      <button>View Schedule</button>
    </div>
  )
}

const HeroInformation = () => {
  return (
    <div>
      <div>
        <span>50+</span>
        <span>Active Players</span>
      </div>
      <div>
        <span>7</span>
        <span>Games/Week</span>
      </div>
      <div>
        <span>3</span>
        <span>Courts</span>
      </div>
    </div>
  )
}
const Hero = () => {
  return (
    <div>
      <HeroTitle />
      <HeroIntro />
      <HeroButton />
      <HeroInformation />
    </div>
  )
}

const ScheduleHeader = () => {
  return (
    <div>
      <img src={undefined}></img>
      <h2>Weekly Schedule</h2>
      <p>Check out our weekly games and reserve your spot. The schedule is updated weekly!</p>
    </div>
  )
}

const ScheduleCard = ({
  day,
  date,
  hours,
  location,
  spotsTaken,
  tag,
}: {
  day: string
  date: string
  hours: string
  location: string
  spotsTaken: number
  tag: string
}) => {
  return (
    <div>
      <div>
        <div>{day}</div>
        <div>{date}</div>
        <div>{hours}</div>
        <div>{location}</div>
        <div>{spotsTaken} of 14 spots available</div>
        <div>
          <div>Confirmed Players</div>
          <div className="progress-bar"></div>
          <div className="progress-bar fill"></div>
        </div>
        <div>
          <button>Join Game</button>
        </div>
      </div>
      <div>
        <span>{tag}</span>
      </div>
    </div>
  )
}

const Schedule = () => {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleCard day="monday" date="Jan 15, 2024" hours="6:00 PM - 8:00 PM" location="Downtown Sports Center - Court A" spotsTaken={4} tag="OPEN" />
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
    <form onSubmit={(e) => e.preventDefault}>
      <div>
        <label>First name *</label>
        <input type="text" value="John" placeholder="Your name"></input>
      </div>
      <RegistrationPlayerOption />
      <button>Complete reservation</button>
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
      <span>🏀</span>
      <span> Hoops League </span>
    </div>
  )
}

const FooterLinks = () => {
  return (
    <div>
      <span className="footer-table-cell" id="header">
        Quick Links
      </span>
      <span className="footer-table-cell">Schedule</span>
      <span className="footer-table-cell">Rules</span>
      <span className="footer-table-cell">Pricing</span>
      <span className="footer-table-cell">Register</span>
    </div>
  )
}

const FooterContact = () => {
  return (
    <div>
      <span className="footer-table-cell" id="header">
        Contact
      </span>
      <span className="footer-table-cell">Email: info@hoopsLeague.com</span>
      <span className="footer-table-cell">Phone: 514-xxx-xxxx</span>
      <span className="footer-table-cell">Hours: Mon-Sun,6AM-10PM</span>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div>
      <span className="footer-table-cell" id="header">
        Follow Us
      </span>
      <span className="footer-table-cell">Facebook</span>
      <span className="footer-table-cell">Instagram</span>
      <span className="footer-table-cell">Twitter</span>
    </div>
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
      <Hero />
      <Schedule />
      <Rules />
      <Pricing />
      <Registration />
      <Footer />
    </div>
  )
}

export default App
