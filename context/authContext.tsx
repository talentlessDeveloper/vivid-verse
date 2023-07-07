import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { MyUser } from '@/constant/validation/types';
import { userCol } from '@/firebase/typedCollections';
import { doc, getDoc } from 'firebase/firestore';

// Define the shape of the context value
export type AuthContextValue = {
  user: MyUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<MyUser | null>>;
};

// Create the context
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

// Create a provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<MyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
