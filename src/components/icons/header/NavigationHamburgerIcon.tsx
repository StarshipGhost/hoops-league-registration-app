import { useHeaderContext } from "../../customs/HeaderContext";

const NavigationHamburgerIcon = ({ open, handler }: { open: boolean; handler: () => void }) => {
  const {
    theme: { darkMode },
  } = useHeaderContext();
  if (darkMode) {
    if (open) {
      return (
        <a onClick={handler}>
          <img
            src={"./src/assets/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"}
            className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    } else {
      return (
        <a onClick={handler}>
          <img
            src={"./src/assets/menu_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"}
            className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    }
  } else {
    if (open) {
      return (
        <a onClick={handler}>
          <img
            src={"./src/assets/close_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"}
            className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-full"
          ></img>
        </a>
      );
    } else {
      return (
        <a onClick={handler}>
          <img
            src={"./src/assets/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg"}
            className="block w-8 h-8 cursor-pointer hover:bg-zinc-100 rounded-full"
          ></img>
        </a>
      );
    }
  }
};

export default NavigationHamburgerIcon;
