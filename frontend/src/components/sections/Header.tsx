import {useState} from 'react'
import {BasketballLogo} from '../icons/BasketballLogo'
import {useHeaderContext} from '../customs/HeaderContext'
import NavigationHamburgerIcon from '../icons/header/NavigationHamburgerIcon'
import ColorToggleIcon from '../icons/header/ColorToggleIcon'
import LockIcon from '../icons/header/LockIcon'
import { OrangeButton } from '../customs/Button'

const navigationLinkStyle: {desktop: string; mobile: string} = {
  desktop: 'text-sm text-zinc-500 dark:text-zinc-400 font-medium p-2 white-space-nowrap cursor-pointer hover:text-black dark:hover:text-white',
  mobile: 'max-w-full text-sm text-zinc-500 dark:text-zinc-400 font-medium p-2 whitespace-nowrap cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md',
}
const links = ['Schedule', 'Registered Players', 'Rules', 'Pricing', 'Register']


const HeaderLink = ({link, style, scrollFunction}: {link: string; style: string; scrollFunction: () => void}) => {
  return <li onClick={scrollFunction} className={style}> <a>{link}</a> </li>
}

const DesktopNavigationBar = () => {
  const {scrollFunction, admin : {isAdmin}} = useHeaderContext()
  const {desktop} = navigationLinkStyle
  return (
    <ul className="hidden lg:flex items-center gap-4">
      {links.map((link, index) => ( <HeaderLink key={link} link={link} style={desktop} scrollFunction={() => scrollFunction(index + 1)} />))}
      <li><ColorToggleIcon /></li>
      <li><LockIcon open={isAdmin}/></li>
      <li> <OrangeButton extra="px-4 py-2" text="Join Now" onClick={() => scrollFunction(5)} /></li>
    </ul>
  )
}

const MobileNavigationBar = ({open, closeNavBarFunction}: {open: boolean; closeNavBarFunction: () => void}) => {
  const {scrollFunction} = useHeaderContext()
  const {mobile} = navigationLinkStyle
  return (
    <ul className={`w-full bg-white dark:bg-black flex flex-col gap-2 p-4 absolute z-1 transition duration-200 ease-linear delay-100 -translate-y-full border-box lg:hidden ${open && `translate-y-0`}`} >
      {links.map((link, index) => ( <HeaderLink key={link} link={link} style={mobile} scrollFunction={() => { scrollFunction(index + 1); closeNavBarFunction() }} />))}
      <li><OrangeButton extra="w-full px-4 py-2" text="Join Now" onClick={() => { scrollFunction(5); closeNavBarFunction() }} /></li>
    </ul>
  )
}

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  const {admin: {isAdmin}} = useHeaderContext();
  return (
    <div className="sticky top-0 z-3">
      <div className="bg-white dark:bg-black flex items-center justify-between border-b border-solid border-neutral-200 dark:border-neutral-500 sm:dark:border-neutral-800 border-box  pr-5 pb-4 pl-4 lg:pl-8 pt-4 relative z-4">
        <BasketballLogo />
        <DesktopNavigationBar />
        <div className="lg:hidden flex items-center gap-4">
          <ColorToggleIcon />
          <LockIcon open={isAdmin} />
          <NavigationHamburgerIcon open={open} handler={() => setOpen((v) => !v)} />
        </div>
      </div>
      <MobileNavigationBar open={open} closeNavBarFunction={() => setOpen((v) => !v)} />
    </div>
  )
}

export default Header
