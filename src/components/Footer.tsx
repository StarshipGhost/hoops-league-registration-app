import {BasketballLogo} from './icons/BasketballLogo'
import {useHeaderContext} from './customs/HeaderContext'

const FooterSummary = () => {
  return (
    <div className="flex flex-col gap-4">
      <BasketballLogo />
      <p className="leading-6 text-zinc-500 dark:text-zinc-400">Bringing basketball enthusiasts together for competitive and fun games every week.</p>
    </div>
  )
}

const FooterLink = ({appLink, index, scrollFunction}: {appLink: string; index?: number; scrollFunction?: (index: number) => void}) => {
  const linkStyle =
    'leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50'
  return scrollFunction 
      ?  <div onClick={() => scrollFunction(index ?? 0)} className={linkStyle}> <a>{appLink}</a> </div> 
      :  <div className={linkStyle}> <a>{appLink}</a> </div>
 
}

const FooterContact = ({contact}: {contact: string}) => {
  return <div className="leading-6 text-zinc-500 dark:text-zinc-400">{contact}</div>
}

const FooterLinks = () => {
  const {scrollFunction} = useHeaderContext()
  const appLinks = ['Schedule', 'Registered Players', 'Rules', 'Pricing', 'Register']
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Quick Links</div>
      {appLinks.map((appLink, index) => (
        <FooterLink key={appLink} appLink={appLink} index={index + 1} scrollFunction={scrollFunction} />
      ))}
    </div>
  )
}

const FooterContacts = () => {
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Contact</div>
      <FooterContact contact="Email: info@hoopsleague.com" />
      <FooterContact contact="Phone: (438)-xxx-xxxx" />
      <FooterContact contact="Hours: Mon-sun, 6AM-10PM" />
    </div>
  )
}

const FooterSocials = () => {
  const socials = ['Facebook', 'Instagram', 'Twitter']
  return (
    <div className="grid justify-self-start self-start grid-rows-[2fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Follow Us</div>
      {socials.map((social) => (
        <FooterLink key={social} appLink={social} />
      ))}
    </div>
  )
}

const Footer = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-[10vw] py-20 gap-12">
      <FooterSummary />
      <FooterLinks />
      <FooterContacts />
      <FooterSocials />
    </div>
  )
}

export default Footer
