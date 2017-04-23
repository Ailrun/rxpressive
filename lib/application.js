/* @flow */
/**
 * Rxpressive
 * Copyright(c) 2017 Junyoung Clare Jang
 * MIT Licensed
 */

'use strict';

var Rx/*: **/ = require('rxjs');

var appConstructor/*: express$Application => **/ = function(internalApp/*: express$Application*/)/*: **/ {
  var app/*: **/ = {};

  app.listen = function()/*: rxjs$ConnectableObservable<void>*/ {
    var args/*: **/ = arguments;

    var server/*: **/ = new Rx.Observable(function(observer/*: rxjs$Observer<void>*/)/*: void*/ {
      args[args.length++] = function() {
        console.log('hi');
        observer.next();
      };

      internalApp.listen.apply(internalApp, args);
    }).multicast(new Rx.Subject());

    server.connect();

    return server;
  };

  app.get = function()/*: rxjs$ConnectableObservable<*>*/ {
    var args/*: **/ = arguments;

    var server/*: **/ = new Rx.Observable(function(observer/*: rxjs$Observer<*>*/)/*: void*/ {
      args[args.length++] = function(req, res, next) {
        observer.next({req, res, next});
      };

      internalApp.get.apply(internalApp, args);
    }).multicast(new Rx.Subject());

    server.connect();

    return server;
  };

  return app;
};

module.exports = appConstructor;
