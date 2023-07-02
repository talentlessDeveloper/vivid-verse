import { PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import Loader from '../svg/loader';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect the user if they are not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login'); // Change '/login' to your desired login route
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader size="w-10 h-10" />
      </div>
    );
  }

  // Render the children component if the user is logged in
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
