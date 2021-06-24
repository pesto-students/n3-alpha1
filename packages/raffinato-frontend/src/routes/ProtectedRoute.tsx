import React from 'react';
import { useAppDispatch } from 'hooks/useRedux';
import { useHistory, Route } from 'react-router-dom';
import { useUser } from 'reactfire';

import { createAlert } from 'store/alertSlice';

enum Status {
  SIGNED_IN = 'signedIn',
  SIGNED_OUT = 'signedOut',
}

type ProtectedRouteProps = {
  component: any;
  status: Status;
  path: string;
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
    history.push('/');
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
