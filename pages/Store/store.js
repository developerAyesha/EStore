import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import orderReducer from './OrderSlice';


const persistConfig = {
  key: 'root', 
  storage,     
  whitelist: ['cart', 'order'], // Only persist these reducers 
};

const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer, 
});


export const persistor = persistStore(store);
