import {type JSX} from 'react'
import BookIcon from './icons/BookIcon'
import ClockIcon from './icons/ClockIcon'
import UsersIcon from './icons/UsersIcon'
import ShirtIcon from './icons/ShirtIcon'
import SafetyIcon from './icons/SafetyIcon'
import CancelIcon from './icons/CancelIcon'
import WarningIcon from './icons/WarningIcon'
import SectionHeader from './SectionHeader'

const rules: {icon: JSX.Element; name: string; description: string}[] = [
  {
    icon: <UsersIcon className='size-6'/>,
    name: 'Respect All Players',
    description: "Treat all participant with respect regardless of skill level. We're here to have fun and improve together.",
  },
  {
    icon: <ClockIcon className='size-6'/>,
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
  const sectionHeaderIcon: {icon: React.ReactNode} = {icon: <BookIcon />}
  return (
    <SectionHeader
      sectionIcon={sectionHeaderIcon}
      iconBg={'bg-blue-500/10 dark:bg-blue-500/20'}
      title={'Rules & Guidelines'}
      description={'Please review our rules to ensure a safe and enjoyable experience for everyone.'}
    />
  )
}
const GameFormat = () => {
  return (
    <div className="w-full min-w-80 flex flex-col gap-2 border border-solid border-neutral-200 dark:border-neutral-800 rounded-lg bg-linear-to-br from-orange-500/10 via background to-blue-500/10 dark:from-orange-500/5 p-4 border-box shadow-md">
      <h2 className='dark:text-white'>Game Format</h2>
      <p className='text-zinc-500 dark:text-zinc-400 text-justify'>
        Our games are organized as 5-on-5 full court matches with rotating teams to ensure everyone gets equal playing time and some rest if needed. Each
        session includes warm-up time and multiple games.
      </p>
    </div>
  )
}

const RuleCard = ({icon, name, description}: {icon: JSX.Element; name: string; description: string}) => {
  return (
    <div className="flex gap-4 border border-solid border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-md">
      <div className="flex justify-center items-center rounded-lg min-w-9.5 h-9.5 text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20 border border-solid shadow-md border-neutral-200 dark:border-neutral-800">
        {icon}
      </div>
      <div>
        <h3 className='dark:text-white mb-2'>{name}</h3>
        <p className="text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

const Rules = () => {
  return (
    <div className="flex flex-col items-center bg-zinc-50 dark:bg-zinc-900/60 px-[10vw] py-20 border-box gap-8">
      <RulesHeader />
      <GameFormat />
      <div className="w-full grid grid-cols-1 gap-8 min-w-80 md:grid-cols-2 xl:grid-cols-3">
        {rules.map(({icon, name, description}) => (
          <RuleCard key={name} icon={icon} name={name} description={description} />
        ))}
      </div>
    </div>
  )
}

export default Rules
