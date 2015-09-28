var Rx = require('rx');
var R = require('ramda');

var obj = { value: 1 };

var actionStream1 = Rx.Observable.timer(0, 2000)
    .timeInterval()
    .map(function(x) { return x.value; });

var actionStream2 = Rx.Observable.timer(0, 2000)
    .timeInterval()
    .map(function(x) { return x.value; });

var storeStream1 = actionStream1.map(function(x) {
  return function(obj) {
    return { name: 'storeStream1', value: obj.value + 1 };
  }
});

var storeStream2 = actionStream2.map(function(x) {
  return function(obj) {
    return { name: 'storeStream2', value: obj.value * 3 };
  }
});

var mergedStream = Rx.Observable.merge(storeStream1, storeStream2).scan(function(sofar, curr) {
  return curr(sofar);
}, obj);

var subscription = mergedStream.subscribe(function(x) {
      console.log(x);
    },
    function (err) {
      console.log('Error: ' + err);
    },
    function () {
      console.log('Completed');
    });
