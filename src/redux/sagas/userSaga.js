import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import * as type from '../actions/types';
import * as Constant from '../../constant/constant';

function userRegisterService(data) {
    return axios.post(`${Constant.BASE_URL}/user/signup`, data.payload)
    .then(response => {return response.data})
    .catch(error => {throw error.response.data.message})
}

function* userRegisterSaga(action) {
    try {
        const users = yield call(userRegisterService, action);
        yield put({ type: type.USER_AUTHENTICATION_SUCCESS, users})
    } catch (error) {
        yield put({ type: type.USER_AUTHENTICATION_FAILED, message: error})
    }
}

function userLoginService(data) {
    return axios.post(`${Constant.BASE_URL}/user/signin`, data.payload)
    .then(response => {return response.data})
    .catch(error => {throw error.response.data.message})
}


function* userLoginSaga(action) {
    try {
        const users = yield call(userLoginService, action)
        yield put({ type: type.USER_AUTHENTICATION_SUCCESS, users})
    } catch (error) {
        yield put({ type: type.USER_AUTHENTICATION_FAILED, message: error})
    }
}

function* userSaga() {
    yield takeEvery(type.USER_REGISTER, userRegisterSaga)
    yield takeEvery(type.USER_LOGIN, userLoginSaga)
}

export default userSaga;