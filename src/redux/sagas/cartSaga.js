import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as type from '../actions/types';
import * as Constant from '../../constant/constant';

function userCartService(data) {
    return axios.get(`${Constant.BASE_URL}/user/cart/${data.payload}`)
    .then(response => {return response.data.cart_items})
    .catch(error => {throw error.response.data.message})
}


function* userCartSaga(action) {
    try {
        const cartItems = yield call(userCartService, action);
        yield put({ type: type.USER_CART_REQUEST_SUCCESS, cartItems})
    } catch (error) {
        yield put({ type: type.USER_CART_REQUEST_FAILED, message: error})
    }
}


function userCartRemoveService(data) {
    return axios.post(`${Constant.BASE_URL}/user/cart/remove`, data.payload)
    .then(response => {return response.data.cart_items})
    .catch(error => {throw error.response.data.message})
}


function* userCartRemoveSaga(action) {
    try {
        const cartItems = yield call(userCartRemoveService, action);
        yield put({ type: type.USER_CART_REQUEST_SUCCESS, cartItems})
    } catch (error) {
        yield put({ type: type.USER_CART_REQUEST_FAILED, message: error})
    }
}

function userCartAddService(data) {
    return axios.post(`${Constant.BASE_URL}/user/cart/add`, data.payload)
    .then(response => {return response.data.cart_items})
    .catch(error => {throw error.response.data.message})
}


function* userCartAddSaga(action) {
    try {
        const cartItems = yield call(userCartAddService, action);
        yield put({ type: type.USER_CART_REQUEST_SUCCESS, cartItems})
    } catch (error) {
        yield put({ type: type.USER_CART_REQUEST_FAILED, message: error})
    }
}

function* cartSaga() {
    yield takeEvery(type.USER_CART_REQUEST, userCartSaga)
    yield takeEvery(type.USER_CART_REMOVE_ITEM, userCartRemoveSaga)
    yield takeEvery(type.USER_CART_ADD_ITEM, userCartAddSaga)
}

export default cartSaga;