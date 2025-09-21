import { ReactNode } from 'react';
import { useSelector } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  component: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  component,
  onlyUnAuth = false
}: TProtectedRouteProps) => {
  const user = useSelector(getUser);
  const location = useLocation();

  // TODO: fix

  if (onlyUnAuth && user) {
    // const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to='/' replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  return component;
};
