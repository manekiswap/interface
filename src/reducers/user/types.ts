import { SupportedChainId } from '@manekiswap/sdk';

export interface UserState {
  theme: 'dark' | 'light';
  multihop: boolean;
  slippage: 'auto' | number;
  transactionDeadline: number;
  chainId: SupportedChainId;
}
