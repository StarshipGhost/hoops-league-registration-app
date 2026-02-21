import {useState} from 'react'
import {BasketballLogo} from '../App'
import {useHeaderContext} from './customs/HeaderContext'
import NavigationHamburgerIcon from './icons/header/NavigationHamburgerIcon'
import ColorToggleIcon from './icons/header/ColorToggleIcon'
import LockIcon from './icons/header/LockIcon'

const DesktopNavigationBar = () => {
  const {scrollFunction} = useHeaderContext()
  return (
    <ul className="navigation-bar hide-on-mobile">
      <li onClick={() => scrollFunction(1)} className="navigation-link text"> <a>Schedule </a> </li> 
      <li onClick={() => scrollFunction(2)} className="navigation-link text"> <a>Registered Players </a> </li>
      <li onClick={() => scrollFunction(3)} className="navigation-link text"> <a>Rules </a> </li>
      <li onClick={() => scrollFunction(4)} className="navigation-link text"> <a>Pricing </a> </li>
      <li onClick={() => scrollFunction(5)} className="navigation-link text"> <a>Register </a> </li>
      <li> <a> <ColorToggleIcon /> </a> </li>
      <li> <a> <LockIcon /> </a> </li>
      <li> <button onClick={() => scrollFunction(5)} className="button navigation-button"> Join Now </button> </li>
    </ul>
  )
}

const MobileNavigationBar = ({open, closeNavBarFunction}: {open: boolean; closeNavBarFunction: () => void}) => {
  const {scrollFunction} = useHeaderContext()
  return (
    <ul className={`mobile-navigation-bar hide-on-desktop ${open && 'open'}`}>
      <li onClick={() => { scrollFunction(1); closeNavBarFunction() }} className="navigation-link text" > <a>Schedule </a> </li>
      <li onClick={() => { scrollFunction(2); closeNavBarFunction() }} className="navigation-link text" > <a>Registered Players </a> </li>
      <li onClick={() => { scrollFunction(3); closeNavBarFunction() }} className="navigation-link text" > <a>Rules </a> </li>
      <li onClick={() => { scrollFunction(4); closeNavBarFunction() }} className="navigation-link text" > <a>Pricing </a> </li>
      <li onClick={() => { scrollFunction(5); closeNavBarFunction() }} className="navigation-link text" > <a>Register </a> </li>
      <li> <button onClick={() => { scrollFunction(5); closeNavBarFunction() }} className="button navigation-button" > Join Now </button> </li>
    </ul>
  )
}

const Header = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="header-container">
      <div className="header">
        <BasketballLogo />
        <DesktopNavigationBar />
        <div className="mobile-header-icons">
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
