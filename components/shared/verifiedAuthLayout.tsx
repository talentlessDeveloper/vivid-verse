import React, { ReactNode } from 'react';

import { DM_Sans } from 'next/font/google';
import AuthHeader from '../header/authHeader';

// const inter = Inter({ subsets: ['latin'] })
const dm = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm',
  weight: ['400', '500', '700'],
});

type VerifiedAuthLayoutProps = {
  children: ReactNode;
};

const VerifiedAuthLayout = ({ children }: VerifiedAuthLayoutProps) => {
  return (
    <div className={`${dm.variable}`}>
      <AuthHeader />
      <main>{children}</main>
    </div>
  );
};

export default VerifiedAuthLayout;
