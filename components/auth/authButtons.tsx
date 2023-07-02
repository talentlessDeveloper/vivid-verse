import { useRouter } from 'next/router';

const AuthButtons = () => {
  const router = useRouter();
  const { pathname } = router;
  const getPath = pathname.split('/')[1];
  return (
    <div className="flex mt-16 md:mt-7 justify-between">
      <button
        className={`uppercase text-left text-base pb-3 border-b-[2px] border-b-slate-300 w-1/2 transition-all duration-500 ${
          getPath === 'register' ? 'border-b-slate-950' : 'border-b-slate-300'
        }`}
        onClick={() => router.push('/register')}
      >
        Register
      </button>
      <button
        className={`uppercase text-right text-base pb-3 border-b-[2px] border-b-slate-300 transition-all duration-500 w-1/2 ${
          getPath === 'login' ? 'border-b-slate-950' : 'border-b-slate-300'
        }`}
        onClick={() => router.push('/login')}
      >
        Log in
      </button>
    </div>
  );
};

export default AuthButtons;
