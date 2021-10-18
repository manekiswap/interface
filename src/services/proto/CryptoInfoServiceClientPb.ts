/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as CryptoInfo_pb from './CryptoInfo_pb';


export class CryptoInfoClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetCryptoInfo = new grpcWeb.MethodDescriptor(
    '/CryptoInfo/GetCryptoInfo',
    grpcWeb.MethodType.UNARY,
    CryptoInfo_pb.CryptoInfoRequest,
    CryptoInfo_pb.CryptoInfoResponse,
    (request: CryptoInfo_pb.CryptoInfoRequest) => {
      return request.serializeBinary();
    },
    CryptoInfo_pb.CryptoInfoResponse.deserializeBinary
  );

  getCryptoInfo(
    request: CryptoInfo_pb.CryptoInfoRequest,
    metadata: grpcWeb.Metadata | null): Promise<CryptoInfo_pb.CryptoInfoResponse>;

  getCryptoInfo(
    request: CryptoInfo_pb.CryptoInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: CryptoInfo_pb.CryptoInfoResponse) => void): grpcWeb.ClientReadableStream<CryptoInfo_pb.CryptoInfoResponse>;

  getCryptoInfo(
    request: CryptoInfo_pb.CryptoInfoRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: CryptoInfo_pb.CryptoInfoResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/CryptoInfo/GetCryptoInfo',
        request,
        metadata || {},
        this.methodInfoGetCryptoInfo,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/CryptoInfo/GetCryptoInfo',
    request,
    metadata || {},
    this.methodInfoGetCryptoInfo);
  }

}

