// package: 
// file: proto/CrytoInfo.proto

var proto_CrytoInfo_pb = require("../proto/CrytoInfo_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CrytoInfo = (function () {
  function CrytoInfo() {}
  CrytoInfo.serviceName = "CrytoInfo";
  return CrytoInfo;
}());

exports.CrytoInfo = CrytoInfo;

function CrytoInfoClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

exports.CrytoInfoClient = CrytoInfoClient;

