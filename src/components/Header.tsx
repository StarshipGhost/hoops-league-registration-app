import {useState} from 'react'
import {BasketballLogo} from '../App'

const ColorToggleIcon = ({darkMode, toggleFunction} : {darkMode : boolean, toggleFunction: () => void}) => {
  return darkMode ? (
    <img src={'./src/assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleFunction} width='18' height='18' id='color-toggle-icon'></img>
  ) : ( 
    <img src={'./src/assets/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleFunction} width='18' height='18' id='color-toggle-icon'></img> 
  )
}

const NavigationHamburgerIcon = ({open, darkMode, handler}: {open: boolean, darkMode: boolean, handler: () => void}) => {
  if (darkMode) {
    if (open) {
      return <img src={'./src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width='32' height='32' className="hide-on-desktop" id='hamburger-icon'></img>
    }
    else {
      return <img src={'./src/assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width='32' height='32' className="hide-on-desktop" id='hamburger-icon'></img>}
  }
  else {
    if (open) {
      return <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width='32' height='32' className="hide-on-desktop" id='hamburger-icon'></img>
    }
    else {
      return <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width='32' height='32' className="hide-on-desktop" id='hamburger-icon'></img>
    }
  }
}

const DesktopNavigationBar = ({darkMode, toggleFunction, scrollFunction}: {darkMode : boolean, toggleFunction: () => void, scrollFunction: (index: number) => void}) => {
  return (
    <ul className="navigation-bar hide-on-mobile">
      <li onClick={() => scrollFunction(1)} className="navigation-link text"> <a>Schedule </a> </li>
      <li onClick={() => scrollFunction(2)} className="navigation-link text"> <a>Rules </a> </li>
      <li onClick={() => scrollFunction(3)} className="navigation-link text"> <a>Pricing </a> </li>
      <li onClick={() => scrollFunction(4)} className="navigation-link text"> <a>Register </a> </li>
      <li><a><ColorToggleIcon  darkMode={darkMode} toggleFunction={toggleFunction}/></a></li>
      <li> <button onClick={() => scrollFunction(4)} className="button navigation-button"> Join Now </button> </li>
    </ul>
  )
}
const MobileNavigationBar = ({ open, scrollFunction, closeNavBarFunction, }: { open: boolean, scrollFunction: (index: number) => void, closeNavBarFunction: () => void}) => {
  return (
    <ul className={`mobile-navigation-bar hide-on-desktop ${open && 'open'}`}>
      <li onClick={() => { scrollFunction(1); closeNavBarFunction() }} className="navigation-link text" > <a>Schedule </a> </li>
      <li onClick={() => { scrollFunction(2); closeNavBarFunction() }} className="navigation-link text" > <a>Rules </a> </li>
      <li onClick={() => { scrollFunction(3); closeNavBarFunction() }} className="navigation-link text" > <a>Pricing </a> </li>
      <li onClick={() => { scrollFunction(4); closeNavBarFunction() }} className="navigation-link text" > <a>Register </a> </li> 
      <li> <button onClick={() => { scrollFunction(4); closeNavBarFunction() }} className="button navigation-button" > Join Now </button> </li>
    </ul>
  )
}

const Header = ({darkMode, toggleFunction, scrollFunction}: {darkMode: boolean, toggleFunction: () => void, scrollFunction: (index: number) => void}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="header-container">
      <div className="header">
        <BasketballLogo scrollFunction={scrollFunction} />
        <nav>
          <DesktopNavigationBar darkMode={darkMode} toggleFunction={toggleFunction} scrollFunction={scrollFunction} />
          <div className='mobile-header-icons'>
            <ColorToggleIcon darkMode={darkMode} toggleFunction={toggleFunction}/>
            <NavigationHamburgerIcon open={open} darkMode={darkMode} handler={() => setOpen((v) => !v)}/>
          </div>
        </nav>
      </div>
      <div className="mobile-header">
        <MobileNavigationBar scrollFunction={scrollFunction} open={open} closeNavBarFunction={() => setOpen((v) => !v)} />
      </div>
    </div>
  )
}

export default Header
