import {BasketballLogo} from '../icons/BasketballLogo'
import {useHeaderContext} from '../customs/HeaderContext'

const FooterSummary = () => {
  return (
    <div className='grid place-content-center gap-y-4'>
      <BasketballLogo />
      <p className="text-zinc-500 dark:text-zinc-400">Bringing basketball enthusiasts together for competitive and fun games every week.</p>
    </div>
  )
}

const FooterLink = ({appLink, link, index, scrollFunction}: {appLink: string; link?: string; index?: number; scrollFunction?: (index: number) => void}) => {
  const linkStyle =
    'leading-6 text-zinc-500 dark:text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50'
  return scrollFunction 
      ?  <div onClick={() => scrollFunction(index ?? 0)} className={linkStyle}> <a>{appLink}</a> </div> 
      :  <div className={linkStyle}> <a href={ link } target="_blank">{appLink}</a> </div>
 
}

const FooterContact = ({contact}: {contact: string}) => {
  return <div className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">{contact}</div>
}

const FooterLinks = () => {
  const {scrollFunction} = useHeaderContext()
  const appLinks = ['Schedule', 'Registered Players', 'Rules', 'Pricing', 'Register']
  return (
    <div className="grid justify-self-start self-start grid-rows-[1.5fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Quick Links</div>
      {appLinks.map((appLink, index) => (
        <FooterLink key={appLink} appLink={appLink} index={index + 1} scrollFunction={scrollFunction} />
      ))}
    </div>
  )
}

const FooterContacts = () => {
  return (
    <div className="grid justify-self-start self-start grid-rows-[1.5fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Contact</div>
      <FooterContact contact="Email: saadk09@hotmail.com" />
      <FooterContact contact="Phone: (438)-229-6003" />
      <FooterContact contact="Hours: Mon-Sun, 6AM-10PM" />
    </div>
  )
}

const FooterSocials = () => {
  const socials = [
    { social: "Facebook", link: "https://facebook.com/saad.kalyati.2025" },
    { social: "Instagram", link: "https://www.instagram.com/saad.kalyati" },
    { social: "Twitter", link: "#" },
  ];
  return (
    <div className="grid justify-self-start self-start grid-rows-[1.5fr_repeat(4,1fr)] gap-2">
      <div className="font-medium dark:text-white">Follow Us</div>
      <div className='grid grid-cols-3 gap-x-4'>
        {socials.map(({social, link}) => (
          <FooterLink key={social} appLink={social} link={link}/>
        ))}
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 px-16 sm:px-20 md:px-36 py-8 gap-8 border-t border-solid border-zinc-200 dark:border-zinc-800">
        <FooterSummary />
        <FooterLinks />
        <FooterContacts />
        <FooterSocials />
      </div>
      <div className='px-12 sm:px-16 md:px-20'>
        <p className='text-sm text-zinc-500 dark:text-zinc-400 text-center pt-8 pb-12 border-t border-solid border-zinc-200 dark:border-zinc-800'>© 2026 Hoops League. All rights reserved by Saâd Kalyati.</p>
      </div> 
    </footer>
  )
}

export default Footer
