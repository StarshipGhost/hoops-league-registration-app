import { useHeaderContext } from "../../customs/HeaderContext";

const NavigationHamburgerIcon = ({open, handler}: {open: boolean; handler: () => void}) => {
  const {darkMode} = useHeaderContext()
  if (darkMode) {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="28" height="28" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="28" height="28" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    }
  } else {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="28" height="28" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} width="28" height="28" className="hide-on-desktop" id="hamburger-icon" ></img>
      )
    }
  }
}

export default NavigationHamburgerIcon;