import React from 'react';
import { useHistory, Route, RouteProps } from 'react-router-dom';
import { useUser } from 'reactfire';

import { createAlert } from 'store/alertSlice';
import { useAppDispatch } from '../hooks/useRedux';

enum Status {
  SIGNED_IN = 'signedIn',
  SIGNED_OUT = 'signedOut',
}

type ProtectedRouteProps = RouteProps & {
  status: Status;
};

function ProtectedRoute({
  component: Component,
  status,
  path,
  ...props
}: ProtectedRouteProps) {
  const { data } = useUser();
  const history = useHistory();
  const dispatch = useAppDispatch();

  if (!data?.uid && status === Status.SIGNED_IN) {
    history.push({
      pathname: '/',
      state: {
        signInModalOpen: true,
      },
    });
    dispatch(
      createAlert({
        type: 'failure',
        message: 'Please sign in first',
      })
    );
    return null;
  }

  return <Route path={path} exact component={Component} {...props} />;
}

export default ProtectedRoute;
export { Status };
