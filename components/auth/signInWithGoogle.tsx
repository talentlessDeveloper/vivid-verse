import React from 'react';
import GoogleIcon from '../svg/google';
import { signInWithPopup } from 'firebase/auth';

import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db, provider } from '@/firebase/config';

const SignInWithGoogleButton = () => {
  const router = useRouter();

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // if !user , create user
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      router.push('/feeds');
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <button
      onClick={handleSignUpWithGoogle}
      className="bg-slate-950 hover:bg-slate-700 text-slate-100 text-lg font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full flex gap-x-3 justify-center items-center"
      type="button"
    >
      <GoogleIcon />
      <p>Sign {router.pathname === '/register' ? 'up' : 'in'} with</p> Google
    </button>
  );
};

export default SignInWithGoogleButton;
