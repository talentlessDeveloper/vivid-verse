import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { ISignUp } from '@/constant/validation/types';
import { auth, db } from '../config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export async function signUp(formData: ISignUp) {
  try {
    if (!formData.firstName || !formData.email || !formData.password) {
      throw new Error('First Name, Email, and Password are required.');
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: formData.username,
    });

    const formCopy = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
      timeStamp: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.uid), formCopy);

    return { error: null };
  } catch (err: any) {
    return { error: err.message || 'An error occurred during sign up.' };
  }
}
