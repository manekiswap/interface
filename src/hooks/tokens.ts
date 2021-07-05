import axios from 'axios';
import { useEffect, useState } from 'react';

import { parseENSAddress } from '../utils/parseENSAddress';

/**
 * Resolve using https://eth.link
 * @link https://blog.cloudflare.com/cloudflare-distributed-web-resolver/
 */
export function resolveENSName(ensName: string) {
  const parsedENS = parseENSAddress(ensName);
  if (!parsedENS) return undefined;

  return `https://${parsedENS.ensName}.link`;
}

export function useTokenList(urlOrENSName: string) {
  const parsedUrl = resolveENSName(urlOrENSName);
  let url: string;
  if (!parsedUrl) {
    url = urlOrENSName;
  } else {
    url = parsedUrl;
  }

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url);
      setData(data);
    };

    fetchData();
  }, [url]);

  return { data };
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
