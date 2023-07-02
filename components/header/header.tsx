import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="font-dm fixed left-0 right-0 z-10">
      <nav className="w-10/12 mx-auto flex justify-between py-4">
        <div>
          <Link href="/">
            <p className="font-bold">𝓥𝓲𝓿𝓲𝓭𝓥𝓮𝓻𝓼𝓮</p>
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/register" className="lg:text-slate-100">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
