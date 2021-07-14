import { isAddress } from '@ethersproject/address';
import { useSelector } from 'react-redux';

import { Token } from '../constants/token';
import { app } from '../reducers';
import useActiveWeb3React from './useActiveWeb3React';

export default function useSearchTokenAddress(input: string): Token {
  const { chainId } = useActiveWeb3React();

  const isValid = isAddress(input);

  return new Token(1, '', 0);
}
