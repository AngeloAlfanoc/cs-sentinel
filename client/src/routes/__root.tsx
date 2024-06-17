import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import LoadingSpinner from '../components/Loader';
import useAuthenticate from '../hooks/useAuthenticate';
import Header from '../components/Header';
import Modal from '../components/Modal/Modal';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useIsFetching } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '../components/NavigationDrawer';

export const RootRoute = createRootRoute({
  component: Root
});

function Root() {
  useAuthenticate();
  const isFetching = useIsFetching();

  return (
    <>
      {isFetching > 0 && <LoadingSpinner />}
      <div className='flex flex-col min-h-screen bg-gray-800 text-white'>
        <Header />
        <div className='flex flex-grow'>
          <Drawer />
          <div className='flex-grow p-4 w-full'>
            <Outlet />
          </div>
        </div>
        <hr className='border-gray-700' />
        <ToastContainer />
        <ScrollRestoration />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
        <Modal />
      </div>
    </>
  );
}
