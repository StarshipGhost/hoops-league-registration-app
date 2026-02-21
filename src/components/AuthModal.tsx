import { useHeaderContext } from "./customs/HeaderContext"

const Modal = () => {
  const {authModal : {authModalActive, toggleAuthModal}} = useHeaderContext();
  return (
    <div className={authModalActive ? `modal active` : `modal`}>
      <div className="modal-popup">
        <h2>Admin Login</h2>
        <div className='modal-textfields' onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Admin Email"></input>
          <input type="password" placeholder="Admin Password"></input>
        </div>
        <div className="modal-buttons">
          <button className="button modal-button" id="white" onClick={toggleAuthModal}> Cancel </button>
          <button className="button modal-button login">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
