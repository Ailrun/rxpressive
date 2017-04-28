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

  var extendsInternalMethod = function(name/*: string*/)/*: **/ {
    app[name] = app[name] || function()/*: rxjs$ConnectableObservable<*>*/ {
      var args/*: **/ = arguments;

      var server/*: **/ = new Rx.Observable(function(observer/*: rxjs$Observer<*>*/)/*: void*/ {
        args[args.length++] = function(req, res, next) {
          observer.next({req, res, next});
        };

        (internalApp/*: Object*/)[name].apply(internalApp, args);
      }).multicast(new Rx.Subject());

      server.connect();

      return server;
    };
  };

  var internalMethods = ['use',
                         'checkout', 'copy', 'delete', 'get',
                         'head', 'lock', 'merge', 'mkactivity',
                         'mkcol', 'move', 'm-search', 'notify',
                         'options', 'patch', 'post',
                         'purge', 'put', 'report', 'search',
                         'subscribe', 'trace', 'unlock', 'unsubscribe'];

  internalMethods.forEach((method/*: string*/) => {
    extendsInternalMethod(method);
  });

  return ((app/*: any*/)/*:
                          {
                          'listen': *,
                          'use': *,
                          'checkout': *, 'copy': *, 'delete': *, 'get': *,
                          'head': *, 'lock': *, 'merge': *, 'mkactivity': *,
                          'mkcol': *, 'move': *, 'm-search': *, 'notify': *,
                          'options': *, 'patch': *, 'post': *,
                          'purge': *, 'put': *, 'report': *, 'search': *,
                          'subscribe': *, 'trace': *, 'unlock': *, 'unsubscribe': *
                          }*/);
};

module.exports = appConstructor;
