import { useHeaderContext } from "../../customs/HeaderContext";

const NavigationHamburgerIcon = ({open, handler}: {open: boolean; handler: () => void}) => {
  const {theme : {darkMode}} = useHeaderContext()
  if (darkMode) {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg" ></img>
      )
    }
  } else {
    if (open) {
      return (
        <img src={'./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-lg" ></img>
      )
    } else {
      return (
        <img src={'./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={handler} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-lg" ></img>
      )
    }
  }
}

export default NavigationHamburgerIcon;