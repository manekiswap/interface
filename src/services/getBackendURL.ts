export default function getBackendURL() {
  const { hostname } = window.location;

  let baseURL = 'https://apidev.manekiswap.com';
  if (hostname === 'manekiswap.com') {
    baseURL = 'https://api.manekiswap.com';
  } else if (hostname.indexOf('localhost') > -1) {
    baseURL = 'http://localhost:80';
  }
  return baseURL;
}
