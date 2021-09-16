import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';

import useAllPairs from './hooks/useAllPairs';
import useAllTokens from './hooks/useAllTokens';
import useEthPrice from './hooks/useEthPrice';
import useTokenData from './hooks/useTokenData';
import {
  actions as globalActions,
  addCases as addGlobalCases,
  initialState as initialGlobalState,
} from './reducers/global';
import { actions as pairActions, addCases as addPairCases, initialState as initialPairState } from './reducers/pair';
import {
  actions as tokenActions,
  addCases as addTokenCases,
  initialState as initialTokenState,
} from './reducers/token';
import { GraphContext } from './reducers/types';
import { actions as userActions, addCases as addUserCases, initialState as initialUserState } from './reducers/user';

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
  console.log('---- GraphProvider ----');
  console.log(state);
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
    useEthPrice: useEthPrice,
  },
  pair: {
    useAllPairs: useAllPairs,
  },
  token: {
    useAllTokens: useAllTokens,
    useTokenData: useTokenData,
  },
  user: {},
};

const graphs = {
  actions,
  hooks,
  useDispatch,
  useSelector,

  Provider: GraphProvider,
};

export default graphs;
