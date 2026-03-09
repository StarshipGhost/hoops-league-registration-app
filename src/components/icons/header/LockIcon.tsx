import { useHeaderContext } from "../../customs/HeaderContext";

const LockIcon = () => {
  const {
    theme: { darkMode },
    authModal: { toggleAuthModal },
  } = useHeaderContext();
  const isAuthenticated = false;
  if (darkMode) {
    if (isAuthenticated) {
      return (
        <a>
          <img
            src="lock_open_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24"
            width="34"
            height="34"
            className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    } else {
      return (
        <a onClick={toggleAuthModal}>
          <img
            src="./src/assets/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg"
            width="34"
            height="34"
            className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    }
  } else {
    if (isAuthenticated) {
      return (
        <a>
          <img
            src="lock_open_24dp_000000_FILL0_wght400_GRAD0_opsz24"
            width="34"
            height="34"
            className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    } else {
      return (
        <a onClick={toggleAuthModal}>
          <img
            src="./src/assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg"
            width="34"
            height="34"
            className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
          ></img>
        </a>
      );
    }
  }
};
export default LockIcon;
