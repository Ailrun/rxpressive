/* @flow */
const rxpress = require('../');
const app = rxpress();

const appSubscribe = app.listen(3000)
      .subscribe(function() {
        console.log('is activated');
      });

app.get('/')
  .subscribe(function({req, res, next}) {
    res.send('hello world!');
  });
