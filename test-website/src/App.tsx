import { Content } from 'carbon-components-react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, matchRoutes, useLocation } from 'react-router-dom';
import './App.scss';
import AppHeader from './components/AppHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BackendError } from './services/backend';
import useIsMobile from './hooks/useIsMobile';
import { hideSideNav } from './utils/helpers';

const isServerError = (err: unknown): err is BackendError => {
  return typeof err === 'object' && err !== null && 'errorMessage' in err;
};

const getErrorMessage = (err: BackendError) => {
  if (err.statusCode === 422) {
    return `${err.errors.join('. ')}`;
  } else {
    return `${err.errorMessage}`;
  }
};

const showError = (error: unknown) => {
  if (isServerError(error)) {
    toast.error(getErrorMessage(error));
  } else {
    toast.error('Something went wrong. Try again later.');
  }
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      showError(error);
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: () => {
      queryClient.invalidateQueries(['UserData']);
    },
    onError: (error, query) => {
      showError(error);
    },
  }),
});

function App() {
  const isMobile = useIsMobile();
  const location = useLocation();
  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <ToastContainer
        theme="dark"
        position={isMobile ? 'top-center' : 'bottom-left'}
        closeOnClick
        hideProgressBar
        autoClose={5000}
      />
      {hideSideNav(location) ? (
        <Content style={{ width: '100%' }}>
          <Outlet />
        </Content>
      ) : (
        <Content className="rai-page-content">
          <Outlet />
        </Content>
      )}
    </QueryClientProvider>
  );
}

export default App;
