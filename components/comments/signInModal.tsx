/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import React from 'react';

// ${isOpen ? "block" : "hidden" }

const SignInModal = ({ onClose }: any) => {
  const router = useRouter();
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg `}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">You have to be signed in</h2>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push('/login')}
          >
            Go to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
