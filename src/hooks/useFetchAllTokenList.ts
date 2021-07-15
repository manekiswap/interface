import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNetworkLibrary } from '../connectors';
import { TokenList } from '../constants/tokens/types';
import { actions, selectors } from '../reducers';
import contenthashToUri from '../utils/contenthashToUri';
import { parseENSAddress } from '../utils/parseENSAddress';
import resolveENSContentHash from '../utils/resolveENVContentHash';
import uriToHttp from '../utils/uriToHttp';

const schema = require('../constants/tokens/tokenlist.schema.json');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const tokenListValidator = ajv.compile(schema);

/**
 * Resolve using https://eth.link
 * @link https://blog.cloudflare.com/cloudflare-distributed-web-resolver/
 */
export function resolveENSName(ensName: string) {
  const parsedENS = parseENSAddress(ensName);
  if (!parsedENS) return undefined;

  return `https://${parsedENS.ensName}.link`;
}

export default function useFetchAllTokenList() {
  const tokenList = useSelector(selectors.list.selectListUrls);
  const dispatch = useDispatch();

  useEffect(() => {
    const list = [...tokenList].sort((a, b) => {
      return b.weight - a.weight;
    });
    const fetchData = async () => {
      for (const { id, url: urlOrENSName } of list) {
        const [list] = await parseListUrl(urlOrENSName);

        const { data } = await axios.get<TokenList>(list);
        if (!tokenListValidator(data)) {
        } else {
          dispatch(
            actions.list.updateTokenList({
              listId: id,
              logoURI: data.logoURI,
              name: data.name,
              tokens: data.tokens,
            }),
          );
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export async function parseListUrl(listUrl: string) {
  const parsedENS = parseENSAddress(listUrl);
  let urls: string[];
  if (parsedENS) {
    let contentHashUri;
    try {
      const networkLibrary = getNetworkLibrary();
      contentHashUri = await resolveENSContentHash(parsedENS.ensName, networkLibrary);
    } catch (error) {
      console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
      throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`);
    }
    let translatedUri;
    try {
      translatedUri = contenthashToUri(contentHashUri);
    } catch (error) {
      console.debug('Failed to translate contenthash to URI', contentHashUri);
      throw new Error(`Failed to translate contenthash to URI: ${contentHashUri}`);
    }
    urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`);
  } else {
    urls = uriToHttp(listUrl);
  }
  return urls;
}
