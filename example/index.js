/* @flow */
const rxpressive = require('../');
const app = rxpressive();

const appSubscribe = app.listen(3000)
      .subscribe(function() {
        console.log('is activated');
      });

app.get('/')
  .subscribe(function(rxpressive) {
    rxpressive.res.send('hello world!');
  });
