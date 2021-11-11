import axios, { AxiosInstance } from 'axios';

class _Caller {
  private _instance: AxiosInstance;

  constructor() {
    const { hostname } = window.location;

    // let baseURL = 'https://apidev.manekiswap.com';
    let baseURL = 'http://localhost:8080';
    if (hostname === 'manekiswap.com') {
      baseURL = 'https://api.manekiswap.com';
    }

    this._instance = axios.create({ baseURL });
  }

  get sharedInstance() {
    return this._instance;
  }
}

export default new _Caller();
