import { createStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import applicationReducer from './application/application.reducer';
import listReducer from './list/list.reducer';
import multicallReducer from './multicall/multicall.reducer';
import poolReducer from './pool/pool.reducer';
import swapReducer from './swap/swap.reducer';
import tokenReducer from './token/token.reducer';
import { RootState } from './types';
import userReducer from './user/user.reducer';

export const actions = {
  application: applicationReducer.actions,
  list: listReducer.actions,
  multicall: multicallReducer.actions,
  pool: poolReducer.actions,
  swap: swapReducer.actions,
  token: tokenReducer.actions,
  user: userReducer.actions,
} as const;

export const selectors = {
  application: applicationReducer.selectors,
  list: listReducer.selectors,
  multicall: multicallReducer.selectors,
  pool: poolReducer.selectors,
  swap: swapReducer.selectors,
  token: tokenReducer.selectors,
  user: userReducer.selectors,
} as const;

function createPersistedStore(reducer: Reducer<RootState & PersistPartial, AnyAction>) {
  const enhancers = composeWithDevTools();
  const store = createStore(reducer, undefined, enhancers);
  const persistor = persistStore(store);

  return { store, persistor };
}

function createReducer() {
  const persistConfig = {
    key: 'manekiswap',
    storage,
    blacklist: ['multicall', 'pool', 'swap'],
  };

  const rootReducer = combineReducers({
    application: applicationReducer.reducer,
    list: listReducer.reducer,
    multicall: multicallReducer.reducer,
    pool: poolReducer.reducer,
    swap: swapReducer.reducer,
    token: tokenReducer.reducer,
    user: userReducer.reducer,
  });

  return createPersistedStore(persistReducer(persistConfig, rootReducer));
}

export const { store, persistor } = createReducer();
