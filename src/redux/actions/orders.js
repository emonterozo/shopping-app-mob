import * as type from './types'

export function userOrdersRequest(userId) {
    return {
        type: type.USER_ORDERS_REQUEST,
        payload: userId
    }
}


export function userOrdersAdd(orders) {
    return {
        type: type.USER_ORDERS_ADD,
        payload: orders
    }
}