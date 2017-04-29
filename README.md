# Rxpressive

[Express][Express] meets [RxJS][RxJS]. Let's start reactive server with tyrannosaurus!

[Express]: https://github.com/expressjs/express
[RxJS]: https://github.com/Reactive-Extensions/RxJS

## Installation

``` bash
$ npm install rxpressive
```

## Warning

**THIS PACKAGE IS NOW UNDER DEVELOPMENT. APIs are not completed and subject to change.**

Basically, this framework uses server framework [Express][Express] and reactive library [RxJS][RxJS]. If you are not familiar with those framework/library, I recommend you to read documents about them first.

## Example

### Hello World!

For ES6 user (or for babel user)

``` javascript
const rxpressive = require('rxpressive');
const app = rxpressive();

app.get('/').subscribe(({ req, res }) => {
  res.send('Hello World!');
});

app.listen(3000).subscribe(() => {});
```

For ES5 or lesser version user

``` javascript
var rxpressive = require('rxpressive');
var app = rxpressive();

app.get('/').subscribe(function(rxpressive) {
  rxpressive.res.send('Hello World!');
});

app.listen(3000).subscribe(function () {});
```

## Available APIs

- All http verbs supported by express. There are few examples on following.
  - GET

  ``` javascript
  var rxpressive = require('rxpressive');
  var app = rxpressive();

  app.get('/').subscribe(function(rxpressive) {
    rxpressive.res.send('Hello World!');
  });

  app.listen(3000).subscribe(() => {});
  ```

  - POST with application/x-www-form-urlencoded data

  ``` javascript
  var rxpressive = require('rxpressive');
  var bodyParser = require('body-parser');
  var app = rxpressive();

  app.use(bodyParser.urlencoded({ extended: false }))
    .subscribe(function(rxpressive) { rxpressive.next(); });

  app.post('/').subscribe(function(rxpressive) {
    console.log(rxpressive.req.body);
    rxpressive.res.send('posted');
  });
  ```
