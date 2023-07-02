import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useAuthUser } from '@react-query-firebase/auth';

import { AiOutlineSearch } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import AuthHeaderMenuBtn from './authHeaderMenuBtn';
import AuthHeaderMenu from './authHeaderMenu';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { AuthContext } from '@/context/authContext';
import Image from 'next/image';
import Loader from '../svg/loader';
import { useAuth } from '@/hooks/useAuth';
import NotDeveloped from '../shared/notDeveloped';

const AuthHeader = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user } = useAuth();
  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);
  const openModal = () => setModal(true);
  // const user = useAuthUser(['user'], auth);

  // if (user.isLoading) {
  //   return (
  //     <div className="flex py-5 justify-center items-center">
  //       <Loader size="w-5 h-5" />
  //     </div>
  //   );
  // }

  const handleMenu = () => {
    setOpenMenu((p) => !p);
  };

  const handleLogOut = () => {
    signOut(auth);
  };

  return (
    <header className="border-b border-b-slate-400 border-solid overflow-x-hidden">
      <nav className="w-10/12 mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-x-3">
          <AuthHeaderMenuBtn openMenu={openMenu} handleMenu={handleMenu} />
          <Link href="/feeds" className="relative z-30">
            𝓥𝓲𝓿𝓲𝓭𝓥𝓮𝓻𝓼𝓮
          </Link>
        </div>
        <ul className="hidden md:flex gap-4">
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

        <ul className="flex items-center gap-4">
          <li>
            <button className="mt-2" onClick={openModal} type="button">
              <AiOutlineSearch fontSize={30} />
            </button>
          </li>
          <li>
            <Link
              href="/create"
              className="flex items-center gap-x-2 bg-slate-700 text-slate-50 px-[15px] py-2 rounded-full"
            >
              <div>
                <span>
                  <BsPencil />
                </span>
                <span className="w-4 h-[1px] bg-slate-50 block mt-1"></span>
              </div>
              <span className="text-base">Create</span>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <button className="mt-2">
                  <Image
                    src={
                      user.photoURL
                        ? user.photoURL
                        : 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
                    }
                    alt="avatar"
                    className="w-10 aspect-square rounded-full object-cover"
                    width={0}
                    height={0}
                    unoptimized
                  />
                </button>
              </li>
              <li>
                <button
                  className="mt-2 bg-slate-800 hover:bg-slate-900 text-slate-100 px-4 py-1"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>

      <AuthHeaderMenu openMenu={openMenu} />
      {modal ? <NotDeveloped onClose={closeModal} /> : null}
    </header>
  );
};

export default AuthHeader;
