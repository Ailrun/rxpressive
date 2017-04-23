/* @flow */
/**
 * Rxpressive
 * Copyright(c) 2017 Junyoung Clare Jang
 * MIT Licensed
 */

'use strict';

var express/*: void => **/ = require('express');
var Rx/*: **/ = require('rxjs');
var http/*: **/ = require('http');

var protoConstructor/*: * => **/ = require('./application');

var createApplication/*: void => **/ = function()/*: **/ {
  var internalApp/*: **/ = express();
  var proto/*: **/ = protoConstructor(internalApp);
  var app/*: **/ = (Object.create(proto)/*: typeof proto*/);

  return app;
};

module.exports = createApplication;
