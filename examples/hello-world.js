/* @flow */
var rxpressive = require('../');
var app = rxpressive();

app.get('/').subscribe(function(rxpressive) {
  rxpressive.res.send('hello world!');
});

app.listen(3000).subscribe(function() {
  console.log('Server is activated on http://localhost:3000/');
});
