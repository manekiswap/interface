import { stringify } from 'qs';

const routes = {
  landing: '/landing',
  'not-found': '/not-found',

  app: '/app',

  swap: '/app/swap',

  pool: '/app/pool',
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

export function buildPoolRoute(params: { address0?: string; address1?: string }) {
  const queryString = stringify(params);
  return `${routes['pool-add']}?${queryString}`;
}

export function buildSwapRoute(params: { from?: string; to?: string }) {
  const queryString = stringify(params);
  return `${routes.swap}?${queryString}`;
}
