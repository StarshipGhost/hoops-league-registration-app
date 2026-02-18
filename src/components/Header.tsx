import {useState} from 'react'
import {BasketballLogo} from '../App'
import {useHeaderContext} from './customs/HeaderContext'

const LockIcon = () => {
  return <img src="./src/assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" width="22" height="22" className="header-icon"></img>
}
const ColorToggleIcon = () => {
  const {darkMode, toggleThemeMode} = useHeaderContext()
  return darkMode ? (
    <img src={'./src/assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="18" height="18" className="header-icon" ></img>
  ) : (
    <img src={'./src/assets/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="18" height="18" className="header-icon" ></img>
  )
}

const NavigationHamburgerIcon = ({open, handler}: {open: boolean; handler: () => void}) => {
  const {darkMode} = useHeaderContext()
  if (darkMode) {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="32" height="32" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="32" height="32" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    }
  } else {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="32" height="32" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="32" height="32" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    }
  }
}

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
        <div>
          <DesktopNavigationBar />
          <div className="mobile-header-icons">
            <ColorToggleIcon />
            <NavigationHamburgerIcon open={open} handler={() => setOpen((v) => !v)} />
            <LockIcon />
          </div>
        </div>
      </div>
      <div className="mobile-header">
        <MobileNavigationBar open={open} closeNavBarFunction={() => setOpen((v) => !v)} />
      </div>
    </div>
  )
}

export default Header
