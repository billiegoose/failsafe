var once = require('once');

module.exports = function(delay, callback) {
  callback = once(callback);
  setTimeout(callback, delay);
  return callback;
};
