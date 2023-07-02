import Link from 'next/link';
import React from 'react';

const AuthHeaderMenu = ({ openMenu }: { openMenu: boolean }) => {
  return (
    <ul
      className={`bg-white flex flex-col md:hidden fixed z-10 space-y-6 px-6 justify-center text-slate-800 w-10/12 max-w-lg  top-0 left-0 bottom-0 font-semibold  overflow-hidden transition-transform duration-300 text-2xl shadow ${
        openMenu ? 'translate-x-0' : '-translate-x-full'
      } `}
    >
      <li>
        <Link href="/feeds">My Feed</Link>
      </li>
      <li>
        <Link href="/explore">Explore</Link>
      </li>
      <li>
        <Link href="/bookmarks">BookMarks</Link>
      </li>
    </ul>
  );
};

export default AuthHeaderMenu;
