import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AppLayout from './AppLayout';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppLayout/>
    </Provider>
  );
}