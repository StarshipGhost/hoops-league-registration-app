import {type JSX} from 'react'
import BookIcon from './icons/BookIcon'
import ClockIcon from './icons/ClockIcon'
import UsersIcon from './icons/UsersIcon'
import ShirtIcon from './icons/ShirtIcon'
import SafetyIcon from './icons/SafetyIcon'
import CancelIcon from './icons/CancelIcon'
import WarningIcon from './icons/WarningIcon'

const rules: {icon: JSX.Element; name: string; description: string}[] = [
  {
    icon: <UsersIcon />,
    name: 'Respect All Players',
    description: "Treat all participant with respect regardless of skill level. We're here to have fun and improve together.",
  },
  {
    icon: <ClockIcon />,
    name: 'Arrive on Time',
    description: 'Please arrive 10 or 15mins before the game so we can start as soon as it begins.',
  },
  {
    icon: <ShirtIcon />,
    name: 'Proper Attire Required',
    description: 'Wear appropriate basketball shoes and athletic clothing. No jeans, boots or street shoes on the court.',
  },
  {
    icon: <SafetyIcon />,
    name: 'Fair Play',
    description: 'Play clean and call your own fouls honestly. Excessive physicall play will result in removal from the game.',
  },
  {
    icon: <WarningIcon />,
    name: 'Equipement Care',
    description: 'Respect the facility and equipement. clean up after yourself and report any damage immediately.',
  },
  {
    icon: <CancelIcon />,
    name: 'Cancellation Policy',
    description:
      'Cancel at least 2 hours in advance to give the opportunity to other players in the waitlist to participate, No-shows will be charged for the session.',
  },
]

const RulesHeader = () => {
  return (
    <div className="section-header">
      <div className="icon-container blue-tag">
        <BookIcon />
      </div>
      <h1 className='header-title'>Rules & Guidelines</h1>
      <p className="text" id="text-center">
        Please review our rules to ensure a safe and enjoyable experience for everyone.
      </p>
    </div>
  )
}
const GameFormat = () => {
  return (
    <div className="game-format-container">
      <h2 id='light-mode-black'>Game Format</h2>
      <p className='game-format-text'>
        Our games are organized as 5-on-5 full court matches with rotating teams to ensure everyone gets equal playing time and some rest if needed. Each
        session includes warm-up time and multiple games.
      </p>
    </div>
  )
}

const RuleCard = ({icon, name, description}: {icon: JSX.Element; name: string; description: string}) => {
  return (
    <div className="rule-card">
      <div className="icon-container square-tag">
        {icon}
      </div>
      <div>
        <h3 className='rule-card-header-title'>{name}</h3>
        <p className="text">{description}</p>
      </div>
    </div>
  )
}

const Rules = () => {
  return (
    <div className="section-container" id="even-section">
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

export default Rules
