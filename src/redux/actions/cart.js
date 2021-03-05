import * as type from './types'

export function userCartRequest(userId) {
    return {
        type: type.USER_CART_REQUEST,
        payload: userId
    }
}

export function userCartRemoveItem(cart) {
    return {
        type: type.USER_CART_REMOVE_ITEM,
        payload: cart
    }
}

export function userCartAddItem(userId, productId, quantity) {
    return {
        type: type.USER_CART_ADD_ITEM,
        payload: { userId, productId, quantity}
    }
}