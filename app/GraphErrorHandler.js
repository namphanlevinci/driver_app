import { logout, signOut } from '@slices/account';
import React from 'react';
import { useDispatch } from 'react-redux';

const GraphErrorHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    forceLogout: () => {
      dispatch(signOut());
      // dispatch(logout());
    },
  }));

  return <>{children}</>;
});

export default GraphErrorHandler;
