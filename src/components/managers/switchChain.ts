import { SupportedChainId } from '@manekiswap/sdk';

import { NETWORK_LABELS } from '../../constants/chains';

function toHex(chainId: number) {
  return '0x' + Number(chainId).toString(16);
}

function getChainIdInfo(chainId: number) {
  if (
    chainId === SupportedChainId.MAINNET ||
    chainId === SupportedChainId.ROPSTEN ||
    chainId === SupportedChainId.RINKEBY ||
    chainId === SupportedChainId.GÖRLI ||
    chainId === SupportedChainId.KOVAN
  )
    return {
      chainId: toHex(chainId),
    };

  if (chainId === SupportedChainId.POLYGON)
    return {
      chainId: toHex(chainId),
      info: {
        chainId: '0x89',
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18,
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/'],
        iconUrls: [''],
      },
    };

  throw new Error('Unsupported chain ID');
}

export async function switchChain(newChainId: number) {
  const { chainId, info } = getChainIdInfo(newChainId);
  console.log(chainId, newChainId);

  try {
    await window.ethereum?.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask.
    if ((error as any).code === 4902 && newChainId === SupportedChainId.POLYGON) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [info],
        });
      } catch (error) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
}

export function getChainName(chainId: number) {
  return NETWORK_LABELS[chainId];
}
