import LoginCard from '../../components/auth/LoginCard';
import type { NextPageWithLayout } from '../_app';

import AuthLayout from '@/components/auth/Layout';
import { ReactElement } from 'react';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <LoginCard />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
