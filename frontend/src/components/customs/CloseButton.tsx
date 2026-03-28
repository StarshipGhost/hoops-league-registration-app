const CloseButton = ({ closeFunction }: { closeFunction: () => void }) => {
  return (
    <button
      className="absolute -top-5 left-9/10 sm:left-11/12 font-black text-3xl text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
      type="button"
      aria-label="Close"
      onClick={closeFunction}
    >
      &times;
    </button>
  );
};

export default CloseButton;
