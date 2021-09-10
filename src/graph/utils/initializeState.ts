import { SupportedChainId } from '../../constants/chains';

export default function initializeState() {
  return Object.keys(SupportedChainId)
    .filter((key) => isNaN(Number(key)))
    .reduce((memo, key) => {
      return { ...memo, [SupportedChainId[key]]: {} };
    }, {});
}
