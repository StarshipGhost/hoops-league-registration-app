import { useHeaderContext } from "../../customs/HeaderContext";

const ColorToggleIcon = () => {
  const {theme : {darkMode, toggleThemeMode}} = useHeaderContext()
  return darkMode ? (
    <img src={'./src/assets/light_mode_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="34" height="34" className="header-icon" ></img>
  ) : (
    <img src={'./src/assets/dark_mode_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg'} onClick={toggleThemeMode} width="34" height="34" className="header-icon" ></img>
  )
}

export default ColorToggleIcon;