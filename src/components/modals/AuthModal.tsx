import Button from "../Button";
import { useHeaderContext } from "../customs/HeaderContext"

const Modal = () => {
  const {authModal : {authModalActive, toggleAuthModal}} = useHeaderContext();
  return (
    <div className={`${authModalActive ? `flex` : `hidden`} flex justify-center items-center fixed top-0 w-full h-full z-1000 overflow-auto bg-[rgba(0,0,0,0.5)]`}>
      <div className="bg-white dark:bg-black w-[450px] flex flex-col gap-4 p-6 my-auto mx-3 rounded-xl border-box">
        <h2 className="dark:text-white">Admin Login</h2>
        <div className='flex flex-col gap-3' onSubmit={(e) => e.preventDefault()}>
          <input className='text-black dark:text-white px-2 py-2 border-3 border-solid border-neutral-200 dark:border-neutral-800 rounded-lg' type="text" placeholder="Admin Email"></input>
          <input className='text-black dark:text-white px-2 py-2 border-3 border-solid border-neutral-200 dark:border-neutral-800 rounded-lg' type="password" placeholder="Admin Password"></input>
        </div>
        <div className="flex justify-between">
          <Button extra='bg-neutral-50 px-4 py-2 shadow-md' text='Cancel' onClick={toggleAuthModal}/> 
          <Button extra='text-white px-4 py-2 bg-orange-500/90 dark:bg-orange-500' text='Login'  onClick={toggleAuthModal}/>
        </div>
      </div>
    </div>
  )
}

export default Modal
