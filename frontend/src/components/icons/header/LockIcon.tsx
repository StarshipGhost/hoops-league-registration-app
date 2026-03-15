import { useHeaderContext } from "../../customs/HeaderContext";

import lightOpenLock from '../../../assets/lock_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import lightClosedLock from  '../../../assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import darkOpenLock from '../../../assets/lock_open_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import darkClosedLock from '../../../assets/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

const LockIcon = () => {
  const { theme: { darkMode }, authModal: { toggleAuthModal }, } = useHeaderContext();
  const isAuthenticated = false;
  if (darkMode) {
    if (isAuthenticated) {
      return (
        <a>
          <img
            src={darkOpenLock}
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
            src={darkClosedLock}
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
            src={lightOpenLock}
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
            src={lightClosedLock}
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
