# failsafe
Ensures a callback function gets called, one way or another.
Use in situations where continuing is more important than the result
of the callback. I generally incorporate this into my shutdown / restart procedure.

## Install
```shell
npm install --save-dev failsafe
```

## Usage

```javascript
// Failsafe code - will definitely exit in 15 seconds or less.
var failsafe = require('failsafe');
database.close(failsafe(5000, function(){
  server.close(failsafe(10000, function(){
    console.log('Server shutdown');
    process.exit();
  })
})

// Original code - might not ever exit
database.close(function(){
  server.close(function(){
    console.log('Server shutdown');
    process.exit();
  })
})
```

## How it works
It's so simple, I'll put the source code right here:

```javascript
// failsafe.js
var once = require('once');

module.exports = function(delay, callback) {
  callback = once(callback);
  setTimeout(callback, delay);
  return callback;
};
```

## Contributing
Pull requests welcome!
