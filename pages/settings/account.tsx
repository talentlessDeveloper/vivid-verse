import AccountLayout from '@/components/shared/accountLayout';
import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import React, { ReactElement } from 'react';

const Page = () => {
  return (
    <div className="px-6 py-8">
      <h2 className="text-xl text-center ">
        {' '}
        This is the where you delete your account. To be added soon!
      </h2>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <VerifiedAuthLayout>
      <AccountLayout>{page}</AccountLayout>
    </VerifiedAuthLayout>
  );
};
export default Page;
