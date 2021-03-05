import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import users from './user';
import cartItems from './cart';
import orders from './orders';
import * as type from '../actions/types';

const appReducer = combineReducers({
   users,
   cartItems,
   orders
})


const rootReducer = (state, action) => {
   if (action.type === type.USER_LOGOUT) {
     storage.removeItem('roots')
     state = undefined;

   }
 
   return appReducer(state, action);
 };
 
 export default rootReducer;