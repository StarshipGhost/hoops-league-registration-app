import { useHeaderContext } from "../../customs/HeaderContext";

const ColorToggleIcon = () => {
  const {theme : {darkMode, toggleThemeMode}} = useHeaderContext()
  return darkMode ? (
    <img src={'./src/assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" ></img>
  ) : (
    <img src={'./src/assets/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" ></img>
  )
}

export default ColorToggleIcon;