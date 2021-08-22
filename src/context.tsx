import { createContext, PropsWithChildren } from 'react';

import useToggle from './hooks/useToggle';

interface AppContext {
  activeConnectWallet: boolean;
  toggleConnectWallet: () => void;
}

export const AppCtx = createContext({} as AppContext);

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
  const [activeConnectWallet, toggleConnectWallet] = useToggle(false);

  return <AppCtx.Provider value={{ activeConnectWallet, toggleConnectWallet }}>{children}</AppCtx.Provider>;
};
