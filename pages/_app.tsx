import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css';
// import {
//   Hydrate,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>

      <ToastContainer />
    </>
  );
}
