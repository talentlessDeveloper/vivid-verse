import React, { PropsWithChildren } from 'react';
import ProtectedRoute from './protectedRoute';
import Link from 'next/link';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

const AccountLayout = ({ children }: PropsWithChildren) => {
  return (
    <ProtectedRoute>
      <section className="font-dm">
        <div className="w-10/12 mx-auto pt-14  flex flex-col lg:flex-row gap-4 lg:gap-7">
          <ul className="border border-solid border-gray-300 rounded-md py-6 lg:py-0 flex px-5 lg:px-0 lg:flex-col lg:justify-center lg:items-center gap-5 lg:w-4/12">
            <li className="w-full lg:px-12 text-base lg:text-xl">
              <Link href="/settings" className="flex items-center gap-x-5">
                <CgProfile />
                Profile
              </Link>
            </li>
            <li className="w-full lg:px-12 text-base lg:text-xl">
              <Link
                href="/settings/account"
                className="flex items-center gap-x-5"
              >
                <AiOutlineSetting />
                <span> Account</span>
              </Link>
            </li>
          </ul>
          <div className="border border-solid border-gray-300 rounded-md w-full lg:w-8/12 py-8">
            {children}
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default AccountLayout;
