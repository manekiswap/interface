import { CrytoInfoClient } from './proto/CrytoInfoServiceClientPb';
import google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';

class _TokenService {
  private _cryptoInfoClient: CrytoInfoClient;

  constructor() {
    this._cryptoInfoClient = new CrytoInfoClient('');
  }

  pingEmpty = async () => {
    const res = await this._cryptoInfoClient.pingEmpty(new google_protobuf_empty_pb.Empty(), null);
    return res;
  };
}

export default new _TokenService();
