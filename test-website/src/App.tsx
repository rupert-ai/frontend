import { Content } from 'carbon-components-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import './App.scss';
import AppHeader from './components/AppHeader';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppHeader />
      <Content className="rai-page-content">
        <Outlet />
      </Content>
    </QueryClientProvider>
  );
}

export default App;
