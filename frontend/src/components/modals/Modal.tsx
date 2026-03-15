import React, { type JSX } from "react";

const Modal = ({ children, isModalActive }: { children: JSX.Element; isModalActive: boolean }) => {
  return (
    <form
      className={`${isModalActive ? `flex` : `hidden`} flex justify-center items-center fixed top-0 w-full h-full z-1000 overflow-auto bg-[rgba(0,0,0,0.5)]`}
      onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => e.preventDefault()}
    >
      {children}
    </form>
  );
};

export default Modal;
