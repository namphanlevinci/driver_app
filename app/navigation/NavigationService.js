import * as React from 'react';

export const graphQLErrorRef = React.createRef();

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function logout() {
  graphQLErrorRef.current?.forceLogout();
}
