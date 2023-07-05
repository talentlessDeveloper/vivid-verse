import EditFeed from '@/components/feeds/editFeed';
import ProtectedRoute from '@/components/shared/protectedRoute';
import React from 'react';

const Page = () => {
  return (
    <ProtectedRoute>
      <EditFeed />
    </ProtectedRoute>
  );
};

export default Page;
