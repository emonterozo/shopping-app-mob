import * as type from '../actions/types';

  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  }

  const orders = (state = initialState, action) => {
      switch (action.type) {
          case type.USER_ORDERS_REQUEST:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_ORDERS_ADD:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_ORDERS_REQUEST_SUCCESS:
              return {
                ...state,
                isLoading: false,
                orders: action.orders,
                error: null
              }
           case type.USER_ORDERS_REQUEST_FAILED:
              return {
                ...state,
                isLoading: false,
                error: action.message
              }
          default:
            return state
      }
  }
  
  export default orders