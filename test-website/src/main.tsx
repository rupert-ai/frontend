import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { TestPage } from './pages/TestPage';
//@ts-ignore
import { Theme } from 'carbon-components-react';
import PrivateRoute from './PrivateRoute';
import { ProvideAuth } from './services/useAuth';
import { ProjectsPage } from './pages/ProjectsPage';
import { RunsPage } from './pages/RunsPage';
import { ItemPage } from './pages/ItemPage';
import { LoginPage } from './pages/LoginPage';
import NewProject from './pages/NewProject';
import { GeneratePageNew } from './pages/GeneratePageNew';
import { GeneratedImagePage } from './pages/GeneratedImagePage';
import GeneratedImagesPage from './pages/GeneratedImagesPage';
import { PaymentPage } from './pages/PaymentPage';
import ErrorPage from './pages/ErrorPage';
import { GeneratedImagePreviewPage } from './pages/GeneratedImagePreviewPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <NewProject />
          </PrivateRoute>
        ),
      },
      {
        path: '/plans',
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/generated/:id/:itemId',
        element: (
          <PrivateRoute>
            <GeneratedImagePreviewPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/generated/:id',
        element: (
          <PrivateRoute>
            <GeneratedImagePage />
          </PrivateRoute>
        ),
      },
      {
        path: '/generated',
        element: (
          <PrivateRoute>
            <GeneratedImagesPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/generate',
        element: (
          <PrivateRoute>
            <GeneratePageNew />
          </PrivateRoute>
        ),
      },
      {
        path: '/test',
        element: (
          <PrivateRoute>
            <TestPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
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
      <Theme theme="g100" style={{ height: '100dvh', overflow: 'hidden', display: 'flex' }}>
        <RouterProvider router={router} />
      </Theme>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
);
