import { useRouter } from 'next/router';
import React from 'react';

const NotFound = () => {
  const router = useRouter();
  return (
    <section>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex items-center gap-x-3">
          <span className="font-semibold text-xl">404</span>{' '}
          <span className="inline-block w-[1px] h-12 bg-slate-900"></span>{' '}
          <span>Page Not Found</span>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-slate-800 text-slate-50 px-3 py-2 mt-7 rounded hover:bg-slate-600 duration-500 transition-colors"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default NotFound;
