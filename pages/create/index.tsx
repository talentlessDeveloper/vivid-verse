import CreateFeed from '@/components/feeds/createFeed';
import ProtectedRoute from '@/components/shared/protectedRoute';

const Page = () => {
  return (
    <ProtectedRoute>
      <CreateFeed />
    </ProtectedRoute>
  );
};

export default Page;
