import React from 'react';

type AuthHeaderMenuBtnProps = {
  openMenu: boolean;
  handleMenu: () => void;
};

const AuthHeaderMenuBtn = ({
  openMenu,
  handleMenu,
}: AuthHeaderMenuBtnProps) => {
  return (
    <button
      className="relative z-30 block md:hidden space-y-1"
      aria-label="nav mobile menu"
      onClick={handleMenu}
    >
      <span
        className={`bg-slate-950 w-4 h-0.5 block transition-opacity duration-500 ${
          openMenu ? 'opacity-0' : 'opacity-1'
        }`}
      ></span>
      <span
        className={`bg-slate-950 w-6 h-0.5 block transition-transform duration-500 ${
          openMenu ? 'translate-x-1 translate-y-2 rotate-45' : ''
        }`}
      ></span>
      <span
        className={`bg-slate-950  w-8 h-0.5 block transition-transform duration-500 ${
          openMenu ? '-rotate-45' : ''
        }`}
      ></span>
    </button>
  );
};

export default AuthHeaderMenuBtn;
