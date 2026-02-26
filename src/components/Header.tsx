import {useState} from 'react'
import {BasketballLogo} from '../App'
import {useHeaderContext} from './customs/HeaderContext'
import NavigationHamburgerIcon from './icons/header/NavigationHamburgerIcon'
import ColorToggleIcon from './icons/header/ColorToggleIcon'
import LockIcon from './icons/header/LockIcon'
import Button from './Button'

const navigationLinkStyle : {desktop: string, mobile: string} = {
  desktop: "text-sm text-zinc-500 font-medium p-2 white-space-nowrap cursor-pointer hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-neutral-50", 
  mobile: 'max-w-full text-sm text-zinc-500 dark:text-zinc-400 font-medium p-2 whitespace-nowrap cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg'
}

const DesktopNavigationBar = () => {
  const {scrollFunction} = useHeaderContext()
  const {desktop} = navigationLinkStyle;
  return (
    <ul className="hidden lg:flex items-center gap-4">
      <li onClick={() => scrollFunction(1)} className={desktop}> <a>Schedule </a> </li> 
      <li onClick={() => scrollFunction(2)} className={desktop}> <a>Registered Players </a> </li>
      <li onClick={() => scrollFunction(3)} className={desktop}> <a>Rules </a> </li>
      <li onClick={() => scrollFunction(4)} className={desktop}> <a>Pricing </a> </li>
      <li onClick={() => scrollFunction(5)} className={desktop}> <a>Register </a> </li>
      <li> <a> <ColorToggleIcon /> </a> </li>
      <li> <a> <LockIcon /> </a> </li>
      <li> <Button extra='text-white bg-orange-500/90 dark:bg-orange-500 border px-4 py-2' text='Join Now' onClick={() => scrollFunction(5)}/> </li>
    </ul>
  )
}

const MobileNavigationBar = ({open, closeNavBarFunction}: {open: boolean; closeNavBarFunction: () => void}) => {
  const {scrollFunction} = useHeaderContext()
  const {mobile} = navigationLinkStyle;
  return (
    <ul className={`w-full bg-white dark:bg-black flex flex-col gap-2 p-4 absolute z-1 transition duration-200 ease-linear -translate-y-full border-box lg:hidden ${open && `translate-y-0`}`}>
      <li onClick={() => { scrollFunction(1); closeNavBarFunction() }} className={mobile}> <a>Schedule </a> </li>
      <li onClick={() => { scrollFunction(2); closeNavBarFunction() }} className={mobile}> <a>Registered Players </a> </li>
      <li onClick={() => { scrollFunction(3); closeNavBarFunction() }} className={mobile}> <a>Rules </a> </li>
      <li onClick={() => { scrollFunction(4); closeNavBarFunction() }} className={mobile}> <a>Pricing </a> </li>
      <li onClick={() => { scrollFunction(5); closeNavBarFunction() }} className={mobile}> <a>Register </a> </li>
      <li> <Button extra='text-white w-full bg-orange-500/90 dark:bg-orange-500 border px-4 py-2' text='Join Now' onClick={() => { scrollFunction(5); closeNavBarFunction() }} /> </li>
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
          <LockIcon  />
        </div>
      </div>
      <MobileNavigationBar open={open} closeNavBarFunction={() => setOpen((v) => !v)} />
    </div>
  )
}

export default Header
