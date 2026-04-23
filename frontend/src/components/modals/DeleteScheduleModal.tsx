import { Button } from "../ui/button";
import Modal from "./Modal";
import redDelete from '../../assets/delete_24dp_EF4444_FILL0_wght400_GRAD0_opsz24.svg'
import { useEffect, useRef, type RefObject } from "react";

const DeleteScheduleModal = ({ isActive, closeModal, deleteGameEvent }: { isActive: boolean; closeModal: () => void; deleteGameEvent: () => void }) => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteGameEvent()
  }

  const buttonRef : RefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const button = buttonRef.current;
    if (isActive && button) {
      button.focus();
    }
  }, [isActive])
  return (
    <Modal isModalActive={isActive} onSubmit={handleSubmit}>
      <div className="w-135 min-w-80 bg-card flex flex-col gap-4 items-center p-8 rounded-lg">
        <img
          src={redDelete}
          className="size-10 p-1 bg-red-500/10 dark:bg-red-500/20  border border-solid border-neutral-200 dark:border-neutral-800 rounded-full"
        ></img>
        <h1 className="text-xl sm:text-2xl dark:text-white font-bold">Delete Game Event</h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 text-center mb-4">
          Deleting this event will also delete the current players registered to this basket-ball session. Do you want to continue?
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          <Button ref={buttonRef} className="text-sm sm:text-base" variant="customDestructive" autoFocus type="submit"> Delete Game </Button>
          <Button className="text-sm sm:text-base" variant="white" type="button" onClick={closeModal}> Cancel </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteScheduleModal;
