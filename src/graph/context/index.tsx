import { createReducer } from '@reduxjs/toolkit';
import { createContext, PropsWithChildren, useContext, useReducer } from 'react';

import { actions as poolActions, addCases as addPoolCases, initialState as initialPoolState } from './pool';
import {
  actions as protocolActions,
  addCases as addProtocolCases,
  initialState as initialProtocolState,
} from './protocol';
import { actions as tokenActions, addCases as addTokenCases, initialState as initialTokenState } from './token';
import { GraphContext } from './types';

const initialState = {
  pool: initialPoolState,
  protocol: initialProtocolState,
  token: initialTokenState,
  count: 0,
};

const store = createContext<{
  state: GraphContext;
  dispatch: Function;
}>({} as any);

const { Provider } = store;

const graphs = {
  pool: poolActions,
  protocol: protocolActions,
  token: tokenActions,
};

const reducer = createReducer(initialState, (builder) => {
  addPoolCases(builder);
  addProtocolCases(builder);
  addTokenCases(builder);
});

const GraphProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { GraphProvider, graphs };

export const useGraphDispatch = () => {
  const { dispatch } = useContext(store);
  return dispatch;
};

export const useGraphState = () => {
  const { state } = useContext(store);
  return state;
};

export const useGraphPool = () => {
  const { state } = useContext(store);
  return state.pool;
};

export const useGraphProtocol = () => {
  const { state } = useContext(store);
  return state.protocol;
};

export const useGraphToken = () => {
  const { state } = useContext(store);
  return state.token;
};
