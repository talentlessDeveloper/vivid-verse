import React, { useRef } from 'react';
import { auth } from '@/firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogOut } from 'react-icons/fi';
import { LuNewspaper } from 'react-icons/lu';
import { MdOutlineAccountCircle, MdOutlineBook } from 'react-icons/md';
import { signOut } from 'firebase/auth';

const AuthHeaderModal = ({
  setAuthModal,
}: {
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { currentUser } = auth;
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const pageClickedElement = e.target as Node;
    if (!menuRef.current?.contains(pageClickedElement)) {
      setAuthModal(false);
    }
  };

  const handleLogOut = () => {
    signOut(auth);
    setAuthModal(false);
  };
  return (
    <div
      className="fixed inset-0 backdrop-blur-[2px] flex justify-end pr-5 pt-8 "
      onClick={handlePageClick}
    >
      <ul
        ref={menuRef}
        className="shadow w-4/6 max-w-xs text-sm  bg-white pt-2 pb-5  rounded-lg h-[300px]"
      >
        <li className="flex items-center gap-x-3  border-b border-slate-800 border-solid px-5 hover:bg-slate-100 transition-colors duration-300 py-4">
          <div>
            <Image
              src={currentUser?.photoURL!}
              alt={currentUser?.displayName!}
              width="0"
              height="0"
              unoptimized
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-bold">{currentUser?.displayName}</p>
            <p className="text-xs">@{currentUser?.displayName}</p>
          </div>
        </li>
        <li className="px-4 hover:bg-slate-100 transition-colors duration-300 py-4">
          <Link href="/myblogs" className="flex gap-x-5 items-center">
            <LuNewspaper />
            <span>My blogs</span>
          </Link>
        </li>
        <li className="px-4 hover:bg-slate-100 transition-colors duration-300 py-4">
          <Link href="/drafts" className="flex gap-x-5 items-center">
            <MdOutlineBook />
            My Drafts
          </Link>
        </li>
        <li className="px-4 hover:bg-slate-100 transition-colors duration-300 py-4">
          <Link href="/settings" className="flex gap-x-5 items-center">
            <MdOutlineAccountCircle />
            <span>Account Settings</span>
          </Link>
        </li>
        <li className="px-4 hover:bg-slate-100 transition-colors duration-300 py-4">
          <button className="flex items-center gap-x-5" onClick={handleLogOut}>
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AuthHeaderModal;
