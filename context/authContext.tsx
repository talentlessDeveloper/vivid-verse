import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

// Define the shape of the context value
export type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

// Create the context
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

// Create a provider component
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
