import { createStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import listReducer from './list.reducer';
import tokenReducer from './token.reducer';
import { AppState } from './types';

export const app = {
  actions: {
    list: listReducer.actions,
    token: tokenReducer.actions,
  },
  selectors: {
    list: listReducer.selectors,
    token: tokenReducer.selectors,
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
  };

  const rootReducer = combineReducers({
    list: listReducer.reducer,
    token: tokenReducer.reducer,
  });

  return createPersistedStore(persistReducer(persistConfig, rootReducer));
}

export const { store, persistor } = createReducer();
