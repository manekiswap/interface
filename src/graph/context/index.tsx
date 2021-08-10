import { AnyAction, createReducer } from '@reduxjs/toolkit';
import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';

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
};

const GraphCtx = createContext({ state: initialState, dispatch: () => {} } as {
  state: GraphContext;
  dispatch: Dispatch<AnyAction>;
});

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

  return <GraphCtx.Provider value={{ state, dispatch }}>{children}</GraphCtx.Provider>;
};

export { GraphProvider, graphs };

export function useGraphDispatch(): Dispatch<AnyAction> {
  const { dispatch } = useContext(GraphCtx);
  return dispatch;
}

export function useGraphSelector<T>(selector: (ctx: GraphContext) => T): T {
  const { state } = useContext(GraphCtx);
  return selector(state);
}

/**
 * @deprecated Use useGraphSelector instead
 */
export function useGraphState(): GraphContext {
  const { state } = useContext(GraphCtx);
  return state;
}
