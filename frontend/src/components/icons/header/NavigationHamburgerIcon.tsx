import { useHeaderContext } from "../../customs/HeaderContext";

import closeDark from "../../../assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import menuDark from "../../../assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg";
import closeLight from "../../../assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import menuLight from "../../../assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";

const NavigationHamburgerIcon = ({ open, handler }: { open: boolean; handler: () => void }) => {
  const {
    theme: { darkMode },
  } = useHeaderContext();
  if (darkMode) {
    if (open) {
      return (
        <a onClick={handler}>
          <img src={closeDark} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"></img>
        </a>
      );
    } else {
      return (
        <a onClick={handler}>
          <img src={menuDark} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"></img>
        </a>
      );
    }
  } else {
    if (open) {
      return (
        <a onClick={handler}>
          <img src={closeLight} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-full"></img>
        </a>
      );
    } else {
      return (
        <a onClick={handler}>
          <img src={menuLight} className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-full"></img>
        </a>
      );
    }
  }
};

export default NavigationHamburgerIcon;
