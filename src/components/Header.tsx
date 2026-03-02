import {useState} from 'react'
import {BasketballLogo} from './icons/BasketBallLogo'
import {useHeaderContext} from './customs/HeaderContext'
import NavigationHamburgerIcon from './icons/header/NavigationHamburgerIcon'
import ColorToggleIcon from './icons/header/ColorToggleIcon'
import LockIcon from './icons/header/LockIcon'
import Button from './Button'

const navigationLinkStyle: {desktop: string; mobile: string} = {
  desktop: 'text-sm text-zinc-500 font-medium p-2 white-space-nowrap cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50',
  mobile: 'max-w-full text-sm text-zinc-500 dark:text-zinc-400 font-medium p-2 whitespace-nowrap cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg',
}
const links = ['Schedule', 'Registered Players', 'Rules', 'Pricing', 'Register']

const HeaderLink = ({link, style, scrollFunction}: {link: string; style: string; scrollFunction: () => void}) => {
  return <li onClick={scrollFunction} className={style}> <a>{link}</a> </li>
}

const DesktopNavigationBar = () => {
  const {scrollFunction} = useHeaderContext()
  const {desktop} = navigationLinkStyle
  return (
    <ul className="hidden lg:flex items-center gap-4">
      {links.map((link, index) => ( <HeaderLink key={link} link={link} style={desktop} scrollFunction={() => scrollFunction(index + 1)} />))}
      <li><a><ColorToggleIcon /></a></li>
      <li><a><LockIcon /></a></li>
      <li> <Button extra="text-white bg-orange-500/90 dark:bg-orange-500 border px-4 py-2" text="Join Now" onClick={() => scrollFunction(5)} /></li>
    </ul>
  )
}

const MobileNavigationBar = ({open, closeNavBarFunction}: {open: boolean; closeNavBarFunction: () => void}) => {
  const {scrollFunction} = useHeaderContext()
  const {mobile} = navigationLinkStyle
  return (
    <ul className={`w-full bg-white dark:bg-black flex flex-col gap-2 p-4 absolute z-1 transition duration-200 ease-linear delay-100 -translate-y-full border-box lg:hidden ${open && `translate-y-0`}`} >
      {links.map((link, index) => ( <HeaderLink key={link} link={link} style={mobile} scrollFunction={() => { scrollFunction(index + 1); closeNavBarFunction() }} />))}
      <li><Button extra="text-white w-full bg-orange-500/90 dark:bg-orange-500 border px-4 py-2" text="Join Now" onClick={() => { scrollFunction(5); closeNavBarFunction() }} /></li>
    </ul>
  )
}

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="sticky top-0 z-999">
      <div className="bg-white dark:bg-black flex items-center justify-between border-b border-solid border-neutral-200 dark:border-neutral-800 border-box  pr-5 pb-4 pl-4 lg:pl-8 pt-4 relative z-1000">
        <BasketballLogo />
        <DesktopNavigationBar />
        <div className="lg:hidden flex items-center gap-4">
          <ColorToggleIcon />
          <NavigationHamburgerIcon open={open} handler={() => setOpen((v) => !v)} />
          <LockIcon />
        </div>
      </div>
      <MobileNavigationBar open={open} closeNavBarFunction={() => setOpen((v) => !v)} />
    </div>
  )
}

export default Header
