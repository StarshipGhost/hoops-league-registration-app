import { useHeaderContext } from "../../customs/HeaderContext";

import lightOpenLock from '../../../assets/lock_open_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import lightClosedLock from  '../../../assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg'
import darkOpenLock from '../../../assets/lock_open_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'
import darkClosedLock from '../../../assets/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

const LockIconLink = ({open, src}: {open: boolean, src: string}) => {
  const { admin: { logout }, authModal: { toggleAuthModal } } = useHeaderContext();

  return (
    <a onClick={open ? logout : toggleAuthModal}>
      <img 
        src={src} 
        className="size-8.5 flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        ></img>
    </a>
  )
}

const LockIcon = ({open}: {open: boolean}) => {
  const { theme: { darkMode } } = useHeaderContext();
  const themeMode: string = darkMode ? ( open ? darkOpenLock : darkClosedLock ) : open ? lightOpenLock : lightClosedLock;
      return <LockIconLink open={open} src={themeMode}/>
};

export default LockIcon;
