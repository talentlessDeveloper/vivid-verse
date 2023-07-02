import VerifiedAuthLayout from '@/components/shared/verifiedAuthLayout';
import React, { ReactElement } from 'react';

const Page = () => {
  return (
    <section>
      <div className="w-10/12 mx-auto flex items-center justify-center h-screen">
        <h2 className="text-center text-xl lg:text-3xl max-w-md">
          This is the Bookmarks Page , Still in development, when I am done
          dealing with life, I will come back to this soon
        </h2>
      </div>
    </section>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <VerifiedAuthLayout>{page}</VerifiedAuthLayout>;
};

export default Page;
