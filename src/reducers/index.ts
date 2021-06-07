import { AnyAction, combineReducers, createStore, Reducer } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import { AppReducer } from './types';

export const app = {
  actions: {},
  selectors: {},
};

function createPersistedStore(reducer: Reducer<AppReducer & PersistPartial, AnyAction>) {
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { store, persistor };
}

function createReducer() {
  const persistConfig = {
    key: 'manekiswap',
    storage,
  };

  const rootReducer = combineReducers({});

  return createPersistedStore(persistReducer(persistConfig, rootReducer));
}

export const { store, persistor } = createReducer();
