import axios, { AxiosInstance } from 'axios';

class _Caller {
  private _instance: AxiosInstance;

  constructor() {
    let baseURL = '';
    const { hostname } = window.location;
    if (hostname === 'dev.manekiswap.com') {
      baseURL = 'https://apidev.manekiswap.com';
    } else if (hostname === 'manekiswap.com') {
      baseURL = 'https://api.manekiswap.com';
    }

    this._instance = axios.create({ baseURL });
  }

  get sharedInstance() {
    return this._instance;
  }
}

export default new _Caller();
