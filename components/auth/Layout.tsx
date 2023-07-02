import { ReactNode } from 'react';
import AuthSideBar from './authsideBar';
import AuthButtons from './authButtons';

type AuthLayoutProps = {
  children: ReactNode;
};

import { DM_Sans } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] })
const dm = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm',
  weight: ['400', '500', '700'],
});

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className={`md:flex ${dm.variable}`}>
      <AuthSideBar />
      <div className="pb-12 md:w-1/2 ">
        <div className="w-[91%] md:w-4/5 mx-auto">
          <AuthButtons />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

export default AuthLayout;
