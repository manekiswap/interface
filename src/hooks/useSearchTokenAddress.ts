import { isAddress } from '@ethersproject/address';

import { Token } from '../constants/token';
import useActiveChainId from './useActiveChainId';

export default function useSearchTokenAddress(input: string): Token | undefined {
  const isValid = isAddress(input);

  return new Token(1, '', 0);
}
