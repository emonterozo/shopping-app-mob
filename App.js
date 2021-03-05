import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import Navigation from './src/navigation/Navigation';

import store from './src/redux/store';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
          <Navigation />
      </PersistGate>
    </Provider>
  );
}
