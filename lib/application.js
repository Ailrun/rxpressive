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

  /*::
    type InternalMethod<T> =
      (...args: Array<string | Function>) => rxjs$ConnectableObservable<T>;
  */

  app.listen = (function()/*: rxjs$ConnectableObservable<void>*/ {
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
  }/*: InternalMethod<*>*/);

  var extendsInternalMethod = function(name/*: string*/)/*: **/ {
    app[name] = app[name] || (function()/*: rxjs$ConnectableObservable<*>*/ {
      var args/*: **/ = arguments;

      var server/*: **/ = new Rx.Observable(function(observer/*: rxjs$Observer<*>*/)/*: void*/ {
        args[args.length++] = function(req, res, next) {
          observer.next({req, res, next});
        };

        (internalApp/*: Object*/)[name].apply(internalApp, args);
      }).multicast(new Rx.Subject());

      server.connect();

      return server;
    }/*: InternalMethod<*>*/);
  };

  var internalMethods/*: **/ = ['use',
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
                          'listen': InternalMethod<*>,
                          'use': InternalMethod<*>,
                          'checkout': InternalMethod<*>, 'copy': InternalMethod<*>,
                          'delete': InternalMethod<*>, 'get': InternalMethod<*>,
                          'head': InternalMethod<*>, 'lock': InternalMethod<*>,
                          'merge': InternalMethod<*>, 'mkactivity': InternalMethod<*>,
                          'mkcol': InternalMethod<*>, 'move': InternalMethod<*>,
                          'm-search': InternalMethod<*>, 'notify': InternalMethod<*>,
                          'options': InternalMethod<*>, 'patch': InternalMethod<*>,
                          'post': InternalMethod<*>, 'purge': InternalMethod<*>,
                          'put': InternalMethod<*>, 'report': InternalMethod<*>,
                          'search': InternalMethod<*>, 'subscribe': InternalMethod<*>,
                          'trace': InternalMethod<*>, 'unlock': InternalMethod<*>,
                          'unsubscribe': InternalMethod<*>
                          }*/);
};

module.exports = appConstructor;
