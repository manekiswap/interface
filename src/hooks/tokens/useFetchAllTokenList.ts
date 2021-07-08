import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { app } from '../../reducers';
import { parseENSAddress } from '../../utils/parseENSAddress';
import schema from './tokenlist.schema.json';
import { TokenList } from './types';

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

export function useFetchAllTokenList() {
  const tokenList = useSelector(app.selectors.list.selectListUrls);
  const dispatch = useDispatch();

  useEffect(() => {
    const list = [...tokenList].sort((a, b) => {
      return b.weight - a.weight;
    });
    const fetchData = async () => {
      for (const { id, url: urlOrENSName } of list) {
        const parsedUrl = resolveENSName(urlOrENSName);
        let url: string;
        if (!parsedUrl) {
          url = urlOrENSName;
        } else {
          url = parsedUrl;
        }

        const { data } = await axios.get<TokenList>(url);
        if (!tokenListValidator(data)) {
        } else {
          dispatch(app.actions.list.updateTokens({ listId: id, tokens: data.tokens }));
        }
      }
    };

    fetchData();
  }, [dispatch, tokenList]);
}

// export async function getEnsTokenList(ensName: string) {
//   const parsedENS = parseENSAddress(ensName);
//   let urls: string[];
//   if (parsedENS) {
//     let contentHashUri;
//     try {
//       const networkLibrary = getNetworkLibrary();
//       contentHashUri = await resolveENSContentHash(parsedENS.ensName, networkLibrary);
//     } catch (error) {
//       console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, error);
//       throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}`);
//     }
//     let translatedUri;
//     try {
//       translatedUri = contenthashToUri(contentHashUri);
//     } catch (error) {
//       console.debug('Failed to translate contenthash to URI', contentHashUri);
//       throw new Error(`Failed to translate contenthash to URI: ${contentHashUri}`);
//     }
//     urls = uriToHttp(`${translatedUri}${parsedENS.ensPath ?? ''}`);
//   } else {
//     urls = uriToHttp('listUrl');
//   }
// }
