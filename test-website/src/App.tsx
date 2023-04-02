import { Content } from 'carbon-components-react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import './App.scss';
import AppHeader from './components/AppHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BackendError } from './services/backend';
import useIsMobile from './hooks/useIsMobile';

const isServerError = (err: unknown): err is BackendError => {
  return typeof err === 'object' && err !== null && 'errorMessage' in err;
};

const getErrorMessage = (err: BackendError) => {
  if (err.statusCode === 422) {
    return `${err.errorMessage}. ${err.errors.join('. ')}`;
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
    onError: (error, query) => {
      showError(error);
    },
  }),
});

function App() {
  const isMobile = useIsMobile();
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
      <Content className="rai-page-content">
        <Outlet />
      </Content>
    </QueryClientProvider>
  );
}

export default App;
