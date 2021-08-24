import { Token, WETH9 } from '@uniswap/sdk-core';

import { SupportedChainId } from './chains';
import { MockAddresses } from './mock';

export const EXTENDED_WETH: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.LOCAL]: new Token(SupportedChainId.LOCAL, MockAddresses.weth, 18, 'WETH', 'Wrapped Ether'),
};
