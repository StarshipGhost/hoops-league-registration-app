import CheckIcon from './icons/CheckIcon'
import DollarSignIcon from './icons/DollarSignIcon'
import CardIcon from './icons/CardIcon'
import {useHeaderContext} from './customs/HeaderContext'
import SectionHeader from './SectionHeader'
import Button from './Button'

const PricingHeader = () => {
  const sectionHeaderIcon: {icon: React.ReactNode} = {icon: <DollarSignIcon />}
  return (
    <SectionHeader
      sectionIcon={sectionHeaderIcon}
      iconBg={'bg-green-500/10 dark:bg-green-500/20'}
      title={'Pricing & Payment'}
      description={'The price include court rental and equipement'}
    />
  )
}

const PricingCheckLine = ({text}: {text: string}) => {
  return (
    <div className="flex gap-2">
      <CheckIcon />
      <span className="dark:text-white">{text}</span>
    </div>
  )
}

const PricingCard = () => {
  const {scrollFunction} = useHeaderContext()
  const benefits = ['Access to one game session', 'More than 2 hours of play time', 'All equipement provided', 'Sports drink included', 'Beginner friendly']
  return (
    <div className="flex flex-col items-center gap-2 border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-black py-8 px-[3vw] shadow-md">
      <h2 className="text-2xl font-bold dark:text-white">Single Game</h2>
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-bold tracking-tighter dark:text-white">$15</h1>
        <span className="text-center max-w-md text-zinc-500 dark:text-zinc-400 text-(length:--text-fluid)">per game</span>
      </div>
      <p className="max-w-md text-zinc-500 dark:text-zinc-400 text-(length:--text-fluid)">Perfect for trying out our games</p>
      <div className="flex flex-col flex-wrap items-start gap-2 my-4">
        {benefits.map((benefit) => (
          <PricingCheckLine text={benefit} />
        ))}
      </div>
      <Button extra="text-white bg-orange-500/90 dark:bg-orange-500 py-2 px-24" text="Get Started" onClick={() => scrollFunction(5)} />
    </div>
  )
}

const PaymentMethod = () => {
  return (
    <div className="w-full bg-white dark:bg-black flex flex-col gap-4 border border-solid border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-md">
      <div className="flex gap-3 items-center">
        <CardIcon />
        <h2 className="text-2xl font-bold dark:text-white">Accepted Payment Methods</h2>
      </div>
      <PricingCheckLine text="Cash (at venue)" />
      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 border border-solid border-neutral-200 dark:border-neutral-800 rounded-lg">
        <b className="dark:text-white">Note: </b>
        <span className="max-w-md text-zinc-500 dark:text-zinc-400 text-(length:--text-fluid)">
          If there are no spots left and you have a reserved spot (as a confirmed player), any no-show or cancellation within 2 hours of the games will count as
          a presence.
        </span>
      </div>
    </div>
  )
}

const Pricing = () => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-black px-[10vw] py-20 border-box gap-8">
      <PricingHeader />
      <PricingCard />
      <PaymentMethod />
    </div>
  )
}

export default Pricing
