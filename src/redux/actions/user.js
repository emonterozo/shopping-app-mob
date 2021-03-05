import * as type from './types'

export function userRegister(users) {
    return {
        type: type.USER_REGISTER,
        payload: users
    }
}

export function userLogin(users) {
    return {
        type: type.USER_LOGIN,
        payload: users
    }
}

export function userLogout() {
    return {
        type: type.USER_LOGOUT,
    }
}
