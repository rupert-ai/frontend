import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { TestPage } from './pages/TestPage';
import { Theme } from 'carbon-components-react';
import PrivateRoute from './PrivateRoute';
import { ProvideAuth } from './services/useAuth';
import { ProjectsPage } from './pages/ProjectsPage';
import { RunsPage } from './pages/RunsPage';
import { ItemPage } from './pages/ItemPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <TestPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/projects/:id/:itemId',
        element: (
          <PrivateRoute>
            <ItemPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/projects/:id',
        element: (
          <PrivateRoute>
            <RunsPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/projects',
        element: (
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <Theme theme="g100" style={{ height: '100vh', overflow: 'hidden', display: 'flex' }}>
        <RouterProvider router={router} />
      </Theme>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
