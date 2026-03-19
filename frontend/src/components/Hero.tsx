import {OrangeButton,  WhiteButton } from './customs/Button'
import {useHeaderContext} from './customs/HeaderContext'

const HeroIntro = () => {
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="text-center font-semibold px-4 py-2 text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/20 border border-solid border-neutral-200 dark:border-neutral-800 rounded-full shadow ">
        <span> 🏀 </span>
        <span className='text-sm sm:text-base'>Join the Community</span>
      </div>
      <div className="text-center tracking-tight">
        <h1 className="text-4xl sm:text-6xl font-bold dark:text-white">Play Basketball</h1>
        <h1 className="text-4xl sm:text-6xl font-bold text-orange-500/90 dark:text-orange-400">Every Week</h1>
      </div>
      <p className="max-w-100 text-center text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
        Join our organized basketball games for all skill levels. Meet new players, improve your game, and have fun on the court every week.
      </p>
    </div>
  )
}

const HeroOrangeButton = () => {
  const {scrollFunction} = useHeaderContext()
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <OrangeButton extra="px-10 py-1.5 sm:px-12" text="Register Now" onClick={() => scrollFunction(5)} />
      <WhiteButton extra="px-10 sm:px-12 py-1.5" text="View Schedule" onClick={() => scrollFunction(1)} />
    </div>
  )
}

const HeroInformation = ({l1, l2}: {l1: string; l2: string}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl text-orange-500/90 leading-11 font-bold dark:text-orange-400">{l1}</span>
      <span className="text-fluid text-zinc-500 dark:text-zinc-400">{l2}</span>
    </div>
  )
}

const HeroFooter = () => {
  return (
    <div className="flex justify-evenly my-4">
      <HeroInformation l1="100+" l2="Active Players" />
      <HeroInformation l1="4" l2="Games/Week" />
      <HeroInformation l1="3" l2="Courts" />
    </div>
  )
}
const Hero = () => {
  return (
    <section className="flex flex-col gap-9 py-25 bg-linear-to-br from-orange-500/10 via-background to-blue-500/10">
      <HeroIntro />
      <HeroOrangeButton />
      <HeroFooter />
    </section>
  )
}

export default Hero
