import React from 'react';

const NotDeveloped = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="h-screen backdrop-blur-sm fixed  inset-0 flex justify-center items-center">
      <div className="bg-slate-950 text-slate-50 px-36 py-12 rounded-lg shadow-lg relative max-w-lg ">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          type="button"
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
        <h2 className="text-center text-2xl lg:text-4xl">
          Still In Development
        </h2>
      </div>
    </div>
  );
};

export default NotDeveloped;
