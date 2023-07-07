import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { ISignUp, MyUser } from '@/constant/validation/types';
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

    const avatar =
      'https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=612x612&w=0&k=20&c=nrJ6RZ8Ft4vHECnRjBGBK_9XJ7f_lsi3dJjj_uAlkT8=';

    const user = userCredential.user as MyUser;

    await updateProfile(user, {
      displayName: formData.username,
      photoURL: !user.photoURL ? avatar : user.photoURL,
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
