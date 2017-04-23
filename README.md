# Rxpressive

[Express][Express] meets [RxJS][RxJS]. Let's start reactive server with tyrannosaurus!

[Express]: https://github.com/expressjs/express
[RxJS]: https://github.com/Reactive-Extensions/RxJS

## Installation

``` bash
$ npm install rxpressive
```

## Warning

**THIS PACKAGE IS NOW UNDER DEVELOPMENT. APIs may not completed or unstable.**

Basically, this framework uses server framework [Express][Express] and reactive library [RxJS][RxJS]. If you are not familiar with those framework/library, I recommand you to read documents about them first.

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

app.get('/').subscribe(function(rxpress) {
  rxpress.res.send('Hello World!');
});

app.listen(3000).subscribe(() => {});
```
