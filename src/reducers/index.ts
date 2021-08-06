import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import applicationReducer from './application/application.reducer';
import listReducer from './list/list.reducer';
import multicallReducer from './multicall/multicall.reducer';
import swapReducer from './swap/swap.reducer';
import tokenReducer from './token/token.reducer';
import { RootState } from './types';
import userReducer from './user/user.reducer';

export const actions = {
  application: applicationReducer.actions,
  list: listReducer.actions,
  multicall: multicallReducer.actions,
  swap: swapReducer.actions,
  token: tokenReducer.actions,
  user: userReducer.actions,
} as const;

export const selectors = {
  application: applicationReducer.selectors,
  list: listReducer.selectors,
  multicall: multicallReducer.selectors,
  swap: swapReducer.selectors,
  token: tokenReducer.selectors,
  user: userReducer.selectors,
} as const;

function createPersistedStore(reducer: Reducer<RootState & PersistPartial, AnyAction>) {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  const persistor = persistStore(store);

  return { store, persistor };
}

function createReducer() {
  const persistConfig = {
    key: 'manekiswap',
    storage,
    blacklist: ['multicall', 'swap'],
  };

  const rootReducer = combineReducers({
    application: applicationReducer.reducer,
    list: listReducer.reducer,
    multicall: multicallReducer.reducer,
    swap: swapReducer.reducer,
    token: tokenReducer.reducer,
    user: userReducer.reducer,
  });

  return createPersistedStore(persistReducer(persistConfig, rootReducer));
}

export const { store, persistor } = createReducer();
