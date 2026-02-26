import {useHeaderContext} from '../../customs/HeaderContext'

const LockIcon = () => {
  const {
    theme: {darkMode},
    authModal: {toggleAuthModal},
  } = useHeaderContext()
  
  return darkMode ? (
    <img src="./src/assets/lock_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" onClick={toggleAuthModal}></img>
  ) : (
    <img src="./src/assets/lock_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" width="34" height="34" className="flex items-stretch cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full" onClick={toggleAuthModal}></img>
  )
}

export default LockIcon
