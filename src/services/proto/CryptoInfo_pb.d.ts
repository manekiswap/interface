import * as jspb from 'google-protobuf'



export class CryptoInfoRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): CryptoInfoRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoInfoRequest): CryptoInfoRequest.AsObject;
  static serializeBinaryToWriter(message: CryptoInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoInfoRequest;
  static deserializeBinaryFromReader(message: CryptoInfoRequest, reader: jspb.BinaryReader): CryptoInfoRequest;
}

export namespace CryptoInfoRequest {
  export type AsObject = {
    address: string,
  }
}

export class CryptoInfoResponse extends jspb.Message {
  getCoinname(): string;
  setCoinname(value: string): CryptoInfoResponse;

  getRank(): number;
  setRank(value: number): CryptoInfoResponse;

  getPrice(): number;
  setPrice(value: number): CryptoInfoResponse;

  getPricechange24h(): number;
  setPricechange24h(value: number): CryptoInfoResponse;

  getMaketcap(): number;
  setMaketcap(value: number): CryptoInfoResponse;

  getMaketcapchange24h(): number;
  setMaketcapchange24h(value: number): CryptoInfoResponse;

  getVolume(): number;
  setVolume(value: number): CryptoInfoResponse;

  getVolumechange24h(): number;
  setVolumechange24h(value: number): CryptoInfoResponse;

  getCalculatingsupply(): number;
  setCalculatingsupply(value: number): CryptoInfoResponse;

  getTotalsupply(): number;
  setTotalsupply(value: number): CryptoInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CryptoInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CryptoInfoResponse): CryptoInfoResponse.AsObject;
  static serializeBinaryToWriter(message: CryptoInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CryptoInfoResponse;
  static deserializeBinaryFromReader(message: CryptoInfoResponse, reader: jspb.BinaryReader): CryptoInfoResponse;
}

export namespace CryptoInfoResponse {
  export type AsObject = {
    coinname: string,
    rank: number,
    price: number,
    pricechange24h: number,
    maketcap: number,
    maketcapchange24h: number,
    volume: number,
    volumechange24h: number,
    calculatingsupply: number,
    totalsupply: number,
  }
}

