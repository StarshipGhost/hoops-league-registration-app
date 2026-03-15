import { useHeaderContext } from "../../customs/HeaderContext";

import lightMode from '../../../assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import darkModeIcon from '../../../assets/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'

const ColorToggleIcon = () => {
  const {theme : {darkMode, toggleThemeMode}} = useHeaderContext()
  return darkMode ? (
    <a onClick={toggleThemeMode}><img src={lightMode} width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" ></img></a>
  ) : (
    <a onClick={toggleThemeMode}><img src={darkModeIcon}  width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" ></img></a>
  )
}

export default ColorToggleIcon;