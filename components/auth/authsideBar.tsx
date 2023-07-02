import React from 'react';
import Books from '@/components/svg/Books';

const AuthSideBar = () => {
  return (
    <div className=" md:h-screen md:w-1/2">
      <img
        src="https://img.freepik.com/free-photo/typing-red-retro-typewriter-blank-paper_53876-105923.jpg?size=626&ext=jpg&ga=GA1.1.1489787148.1685114039&semt=sph"
        className="hidden md:block h-full w-full object-cover max-w-2xl"
      />
      <div className="md:hidden bg-slate-950 h-80 w-full rounded-br-[100px] rounded-bl-[100px] relative">
        <div className="absolute w-20 h-20 rounded-full bg-slate-200 -bottom-[38px] left-1/2 -translate-x-1/2 flex justify-center items-center">
          <Books />
        </div>
      </div>
    </div>
  );
};

export default AuthSideBar;
