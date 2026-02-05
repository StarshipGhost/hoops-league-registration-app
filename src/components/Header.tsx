import {useState} from 'react'
import {BasketballLogo} from '../App'

const HeaderIcon = ({open, handler}: {open: boolean; handler: () => void}) => {
  return open ? (
    <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="material-symbols-outlined hide-on-desktop"></img>
  ) : (
    <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="material-symbols-outlined hide-on-desktop"></img>
  )
}

const DesktopNavigationBar = ({scrollFunction} : {scrollFunction : (index: number) => void}) => {
  return (
    <ul className="navigation-bar hide-on-mobile">
      <li onClick={() => scrollFunction(1)} className="navigation-link text"> <a>Schedule </a></li>
      <li onClick={() => scrollFunction(2)} className="navigation-link text"> <a>Rules </a></li>
      <li onClick={() => scrollFunction(3)} className="navigation-link text"> <a>Pricing </a></li>
      <li onClick={() => scrollFunction(4)} className="navigation-link text"> <a>Register </a></li>
      <li> <button onClick={() => scrollFunction(4)} className="button navigation-button"> Join Now </button> </li>
    </ul>
  )
}
const MobileNavigationBar = ({open, scrollFunction, closeBarFunction}: {open: boolean, scrollFunction : (index: number) => void, closeBarFunction: () => void}) => {
  return (
    <ul className={`mobile-navigation-bar hide-on-desktop ${open && 'open'}`}>
      <li onClick={() => {scrollFunction(1); closeBarFunction()}} className="navigation-link text"> <a>Schedule </a></li>
      <li onClick={() => {scrollFunction(2); closeBarFunction()}} className="navigation-link text"> <a>Rules </a></li>
      <li onClick={() => {scrollFunction(3); closeBarFunction()}} className="navigation-link text"> <a>Pricing </a></li>
      <li onClick={() => {scrollFunction(4); closeBarFunction()}} className="navigation-link text"> <a>Register </a></li>
      <li> <button onClick={() => {scrollFunction(4); closeBarFunction()}} className="button navigation-button"> Join Now </button> </li>
    </ul>
  )
}

const Header = ({scrollFunction} : {scrollFunction : (index : number) => void}) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className="header-container">
      <div className="header">
        <BasketballLogo scrollFunction={scrollFunction} />
        <DesktopNavigationBar scrollFunction={scrollFunction}/>
        <HeaderIcon open={open} handler={() => setOpen((v) => !v)} />
      </div>
      <div className='mobile-header'>
        <MobileNavigationBar scrollFunction={scrollFunction} open={open} closeBarFunction={() => setOpen((v) => !v)} />
      </div>
    </div>
  )
}

export default Header
