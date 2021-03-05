import * as type from '../actions/types';

  const initialState = {
    cartItems: [],
    isLoading: false,
    error: null
  }

  const cartItems = (state = initialState, action) => {
      switch (action.type) {
          case type.USER_CART_REQUEST:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_CART_REMOVE_ITEM:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_CART_ADD_ITEM:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_CART_REQUEST_SUCCESS:
              return {
                ...state,
                isLoading: false,
                cartItems: action.cartItems,
                error: null
              }
           case type.USER_CART_REQUEST_FAILED:
              return {
                ...state,
                isLoading: false,
                error: action.message
              }
          default:
            return state
      }
  }
  
  export default cartItems