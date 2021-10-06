import { stringify } from 'qs';

const routes = {
  landing: '/landing',
  'not-found': '/not-found',

  app: '/app',

  swap: '/app/swap',
  swapV2: '/app/swapV2',

  pool: '/app/pool',
  'pool-detail': '/app/pool/detail',
  'pool-import': '/app/pool/import',
  'pool-add': '/app/pool/add',
  'pool-remove': '/app/pool/remove',

  chart: '/app/chart',
  'chart-overview': '/app/chart/overview',
  'chart-pools': '/app/chart/pools',
  'chart-tokens': '/app/chart/tokens',
  'chart-token': '/app/chart/token/:address',
  'chart-pool': '/app/chart/pool/:address',
};

export default routes;

export function buildPoolRoute(params: { address0?: string; address1?: string }, basePath: string) {
  const queryString = stringify(params);
  return `${basePath}?${queryString}`;
}

export function buildSwapRoute(params: { from?: string; to?: string }) {
  const queryString = stringify(params);
  return `${routes.swap}?${queryString}`;
}

export function buildRoute(params: { [key: string]: string | undefined }, location: { path: string; hash?: string }) {
  const { path, hash } = location;
  const queryString = stringify(params);
  return `${path}?${queryString}${hash ?? ''}`;
}
