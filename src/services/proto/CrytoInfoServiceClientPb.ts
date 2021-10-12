/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as CrytoInfo_pb from './CrytoInfo_pb';


export class CrytoInfoClient {
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

  methodInfoPingEmpty = new grpcWeb.AbstractClientBase.MethodInfo(
    CrytoInfo_pb.PingResponse,
    (request: google_protobuf_empty_pb.Empty) => {
      return request.serializeBinary();
    },
    CrytoInfo_pb.PingResponse.deserializeBinary
  );

  pingEmpty(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<CrytoInfo_pb.PingResponse>;

  pingEmpty(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CrytoInfo_pb.PingResponse) => void): grpcWeb.ClientReadableStream<CrytoInfo_pb.PingResponse>;

  pingEmpty(
    request: google_protobuf_empty_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: CrytoInfo_pb.PingResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/CrytoInfo/PingEmpty',
        request,
        metadata || {},
        this.methodInfoPingEmpty,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/CrytoInfo/PingEmpty',
    request,
    metadata || {},
    this.methodInfoPingEmpty);
  }

}

