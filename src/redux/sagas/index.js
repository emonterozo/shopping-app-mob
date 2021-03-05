import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import cartSaga from './cartSaga';
import ordersSaga from './ordersSaga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        cartSaga(),
        ordersSaga()
    ])
}