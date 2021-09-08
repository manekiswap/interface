import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';

import { useGlobalChartData, useGlobalData } from '../hooks/global';
import { actions as globalActions, addCases as addGlobalCases, initialState as initialGlobalState } from './global';
import { actions as pairActions, addCases as addPairCases, initialState as initialPairState } from './pair';
import { actions as tokenActions, addCases as addTokenCases, initialState as initialTokenState } from './token';
import { GraphContext } from './types';
import { actions as userActions, addCases as addUserCases, initialState as initialUserState } from './user';

const initialState = {
  global: initialGlobalState,
  pair: initialPairState,
  token: initialTokenState,
  user: initialUserState,
};

const GraphCtx = createContext({ state: initialState, dispatch: () => {} } as {
  state: GraphContext;
  dispatch: Dispatch<AnyAction>;
});

const actions = {
  global: globalActions,
  pair: pairActions,
  token: tokenActions,
  user: userActions,
};

const reducer = createReducer(initialState, (builder) => {
  addGlobalCases(builder);
  addPairCases(builder);
  addTokenCases(builder);
  addUserCases(builder);
});

const GraphProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <GraphCtx.Provider value={{ state, dispatch }}>{children}</GraphCtx.Provider>;
};

function useDispatch(): Dispatch<AnyAction> {
  const { dispatch } = useContext(GraphCtx);
  return dispatch;
}

function useSelector<T>(selector: (ctx: GraphContext) => T): T {
  const { state } = useContext(GraphCtx);
  return selector(state);
}

const hooks = {
  global: {
    useGlobalChartData,
    useGlobalData,
  },
};

const graphs = {
  actions,
  hooks,
  useDispatch,
  useSelector,

  Provider: GraphProvider,
};

export default graphs;
