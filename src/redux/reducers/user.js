import * as type from '../actions/types';

  const initialState = {
    users: [],
    isLoading: false,
    error: null
  }

  const users = (state = initialState, action) => {
      switch (action.type) {
          case type.USER_REGISTER:
            return {
              ...state,
              isLoading: true
            }
          case type.USER_LOGIN:
          return {
            ...state,
            isLoading: true
          }
          case type.USER_AUTHENTICATION_SUCCESS:
              return {
                ...state,
                isLoading: false,
                users: action.users,
                error: null
              }
           case type.USER_AUTHENTICATION_FAILED:
              return {
                ...state,
                isLoading: false,
                error: action.message
              }
          default:
            return state
      }
  }
  
  export default users