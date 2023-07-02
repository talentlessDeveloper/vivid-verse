import React from 'react';

type IRenderIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

const RenderIf = ({ condition, children }: IRenderIfProps) => {
  if (!condition) {
    return null;
  }
  return <>{children}</>;
};

export default RenderIf;
