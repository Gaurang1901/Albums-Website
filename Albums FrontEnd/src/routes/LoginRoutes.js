import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const AuthLogout = Loadable(lazy(() => import('pages/authentication/Logout')));
const AuthPasswordRestRequest = Loadable(lazy(() => import('pages/authentication/passwordResetRequest')));
const AuthPasswordReset = Loadable(lazy(() => import('pages/authentication/PasswordReset')));

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'logout',
      element: <AuthLogout />
    },
    {
      path: '/password-reset-request',
      element: <AuthPasswordRestRequest />
    },
    {
      path: '/reset-password',
      element: <AuthPasswordReset />
    }
  ]
};

export default LoginRoutes;
