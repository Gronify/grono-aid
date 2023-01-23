import * as React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element
  isLoggedIn: boolean;
  redirectPath: string;
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { children, isLoggedIn } = props;
  return isLoggedIn ? children : <Navigate
    to={{ pathname: props.redirectPath }}
  />;

};

export default PrivateRoute;