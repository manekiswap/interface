import { createStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import listReducer from './list.reducer';
import poolReducer from './pool.reducer';
import swapReducer from './swap.reducer';
import tokenReducer from './token.reducer';
import { AppState } from './types';
import userReducer from './user.reducer';

export const app = {
  actions: {
    list: listReducer.actions,
    pool: poolReducer.actions,
    swap: swapReducer.actions,
    token: tokenReducer.actions,
    user: userReducer.actions,
  },
  selectors: {
    list: listReducer.selectors,
    pool: poolReducer.selectors,
    swap: swapReducer.selectors,
    token: tokenReducer.selectors,
    user: userReducer.selectors,
  },
};

function createPersistedStore(reducer: Reducer<AppState & PersistPartial, AnyAction>) {
  const enhancers = composeWithDevTools();
  const store = createStore(reducer, undefined, enhancers);
  const persistor = persistStore(store);

  return { store, persistor };
}

function createReducer() {
  const persistConfig = {
    key: 'manekiswap',
    storage,
    blacklist: ['list', 'pool', 'swap'],
  };

  const rootReducer = combineReducers({
    list: listReducer.reducer,
    pool: poolReducer.reducer,
    swap: swapReducer.reducer,
    token: tokenReducer.reducer,
    user: userReducer.reducer,
  });

  return createPersistedStore(persistReducer(persistConfig, rootReducer));
}

export const { store, persistor } = createReducer();
