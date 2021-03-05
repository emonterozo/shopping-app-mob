import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const persistConfig = {
  key: 'roots',
  storage: AsyncStorage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
)


sagaMiddleware.run(rootSaga);

export default store;