import { useMemo, useState } from 'react';

import { ETH, Token } from '../constants/token';

export default function usePoolPair(): {
  token0: Token;
  token1?: Token;
  updateToken0: (token: Token) => void;
  updateToken1: (token: Token) => void;
  reset: () => void;
} {
  const [token0, setToken0] = useState(ETH);
  const [token1, setToken1] = useState<Token | undefined>(undefined);

  return useMemo(() => {
    return {
      token0,
      token1,
      updateToken0: setToken0,
      updateToken1: setToken1,
      reset: () => {
        setToken0(ETH);
        setToken1(undefined);
      },
    };
  }, [token0, token1]);
}
