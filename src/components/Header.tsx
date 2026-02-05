import {useState} from 'react'
import {BasketballLogo} from '../App'

const HeaderIcon = ({open, handler}: {open: boolean; handler: () => void}) => {
  return open ? (
    <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="material-symbols-outlined hide-on-desktop"></img>
  ) : (
    <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="material-symbols-outlined hide-on-desktop"></img>
  )
}

const DesktopNavigationBar = () => {
  return (
    <ul className="navigation-bar hide-on-mobile">
      <li className="navigation-link text"> Schedule </li>
      <li className="navigation-link text"> Rules </li>
      <li className="navigation-link text"> Pricing </li>
      <li className="navigation-link text"> Register </li>
      <li> <button className="button navigation-button" id="button"> Join Now </button> </li>
    </ul>
  )
}
const MobileNavigationBar = ({open}: {open: boolean}) => {
  return (
    <ul className={`mobile-navigation-bar hide-on-desktop ${open && 'open'}`}>
      <li className="navigation-link text"> Schedule </li>
      <li className="navigation-link text"> Rules </li>
      <li className="navigation-link text"> Pricing </li>
      <li className="navigation-link text"> Register </li>
      <li> <button className="button navigation-button" id="button"> Join Now </button> </li>
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
        <HeaderIcon open={open} handler={() => setOpen((v) => !v)} />
      </div>
      <div className="mobile-header">
        <MobileNavigationBar open={open} />
      </div>
    </div>
  )
}

export default Header
