import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNetworkLibrary } from '../connectors';
import { SupportedChainId } from '../constants/chains';
import { getVersionUpgrade, VersionUpgrade } from '../constants/tokens/getVersionUpgrade';
import { minVersionBump } from '../constants/tokens/minVersionBump';
import { TokenInfo, TokenList, Version } from '../constants/tokens/types';
import { getTokenList } from '../functions/list';
import { actions, selectors } from '../reducers';
import resolveENSContentHash from '../utils/resolveENVContentHash';
import useActiveWeb3React from './useActiveWeb3React';

export default function useFetchListCallback(): (listUrl: string, sendDispatch?: boolean) => Promise<TokenList> {
  const { chainId, library } = useActiveWeb3React();
  const dispatch = useDispatch();
  const lists = useSelector(selectors.list.selectAllLists);
  const tokens = useSelector(selectors.list.selectAllTokens);

  const ensResolver = useCallback(
    async (ensName: string) => {
      if (!library || chainId !== SupportedChainId.MAINNET) {
        if (chainId === SupportedChainId.MAINNET) {
          const networkLibrary = getNetworkLibrary();
          const network = await networkLibrary.getNetwork();
          if (networkLibrary && network.chainId === 1) {
            return resolveENSContentHash(ensName, networkLibrary);
          }
        }
        throw new Error('Could not construct mainnet ENS resolver');
      }
      return resolveENSContentHash(ensName, library);
    },
    [chainId, library],
  );

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (listUrl: string, sendDispatch = true) => {
      const requestId = nanoid();
      sendDispatch && dispatch(actions.list.pendingFetchingTokenList({ requestId, url: listUrl }));

      try {
        let update = false;
        const list = await getTokenList(listUrl, ensResolver);
        const oldList = lists[listUrl];
        if (!oldList || !oldList.version) {
          update = true;
        } else {
          update = compareVersionForUpdate(list, oldList.version, tokens[listUrl]);
        }

        sendDispatch &&
          dispatch(actions.list.fulfilledFetchingTokenList({ url: listUrl, tokenList: list, requestId, update }));
        return list;
      } catch (error) {
        console.debug(`Failed to get list at url ${listUrl}`, error);
        sendDispatch &&
          dispatch(actions.list.rejectFetchingTokenList({ url: listUrl, requestId, error: error.message }));
        return {} as TokenList;
      }
    },
    [dispatch, ensResolver, lists, tokens],
  );
}

const compareVersionForUpdate = (list: TokenList, oldVersion: Version, tokens: TokenInfo[]) => {
  let update = true;
  const bump = getVersionUpgrade(oldVersion, list.version);

  switch (bump) {
    case VersionUpgrade.NONE:
      break;
    case VersionUpgrade.PATCH:
    case VersionUpgrade.MINOR:
      const min = minVersionBump(tokens, list.tokens);
      // automatically update minor/patch as long as bump matches the min update
      if (bump >= min) {
        update = true;
      } else {
        console.error(
          `List at url ${list.name} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`,
        );
      }
      break;
    // update any active or inactive lists
    case VersionUpgrade.MAJOR:
      update = true;
  }

  return update;
};
