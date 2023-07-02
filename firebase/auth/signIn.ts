import { ILogin } from '@/constant/validation/types';
import { auth } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const signIn = async (formData: ILogin) => {
  try {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during sign in.' };
  }
};
