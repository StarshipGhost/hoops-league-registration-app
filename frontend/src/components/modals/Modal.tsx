import React, { type JSX } from "react";

const Modal = ({ children, isModalActive, onSubmit }: { children: JSX.Element; isModalActive: boolean, onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void }) => {
  return (
    <form
    className={`${isModalActive ? `flex` : `hidden`} px-[10vw] flex justify-center items-center fixed top-0 w-full h-full z-1000 overflow-auto bg-[rgba(0,0,0,0.5)]`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Modal;
