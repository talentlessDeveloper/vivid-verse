import RegisterCard from '@/components/auth/RegisterCard';
import type { NextPageWithLayout } from '../_app';

import AuthLayout from '@/components/auth/Layout';
import { ReactElement } from 'react';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <RegisterCard />
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Page;
