import { createAsyncThunk } from '@reduxjs/toolkit';

import { getNetworkLibrary } from '../connectors';
import { SupportedChainId } from '../constants/chains';
import { getVersionUpgrade, VersionUpgrade } from '../constants/tokens/getVersionUpgrade';
import { minVersionBump } from '../constants/tokens/minVersionBump';
import { TokenInfo, TokenList, Version } from '../constants/tokens/types';
import { getTokenList } from '../functions/list';
import { RootState } from '../reducers/types';
import resolveENSContentHash from '../utils/resolveENVContentHash';

const ensResolver = (chainId: number) => async (ensName: string) => {
  const library = getNetworkLibrary();

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
};

const compareVersionForUpdate = (list: TokenList, oldList: { version: Version; tokens: TokenInfo[] }) => {
  let update = true;
  const bump = getVersionUpgrade(oldList.version, list.version);

  switch (bump) {
    case VersionUpgrade.NONE:
      break;
    case VersionUpgrade.PATCH:
    case VersionUpgrade.MINOR:
      const min = minVersionBump(oldList.tokens, list.tokens);
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

export default createAsyncThunk(
  'list/fetchingTokenList',
  async (payload: { url: string; chainId: number }, { getState }) => {
    const { url, chainId } = payload;
    const oldList = (getState() as RootState).list.lists[url];
    const oldTokens = (getState() as RootState).list.tokens[url];

    let update = false;
    const list = await getTokenList(url, ensResolver(chainId));
    if (!oldList || !oldList.version) {
      update = true;
    } else {
      update = compareVersionForUpdate(list, { version: oldList.version, tokens: oldTokens });
    }

    return { update, list };
  },
);
