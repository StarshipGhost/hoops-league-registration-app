import { BasketballLogo } from "../App"
import { useHeaderContext } from "./customs/HeaderContext"

const FooterSummary = () => {
  return (
    <div className="flex flex-col gap-4">
      <BasketballLogo />
      <p className="leading-6 text-zinc-500 dark:text-zinc-400">
        Bringing basketball enthusiasts together for competitive and fun games every week.
      </p>
    </div>
  )
}

const FooterLinks = () => {
  const { scrollFunction } = useHeaderContext();
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Quick Links</div>
      <div onClick={() => scrollFunction(1)} className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Schedule</a></div>
      <div onClick={() => scrollFunction(2)} className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Registered Players</a></div>
      <div onClick={() => scrollFunction(3)} className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Rules</a></div>
      <div onClick={() => scrollFunction(4)} className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Pricing</a></div>
      <div onClick={() => scrollFunction(5)} className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Register</a></div>
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Contact</div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400">Email: info@hoopsleague.com</div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400">Phone: (438)-xxx-xxxx</div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400">Hours: Mon-Sun, 6AM-10PM</div>
    </div>
  )
}

const FooterSocials = () => {
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Follow Us</div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Facebook</a></div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Instagram</a></div>
      <div className="leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50"><a>Twitter</a></div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-[10vw] py-20 gap-12">
      <FooterSummary />
      <FooterLinks />
      <FooterContact />
      <FooterSocials />
    </div>
  )
}

export default Footer