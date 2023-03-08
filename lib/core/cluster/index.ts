const Master = require('./master');

exports.startCluster = function (options, callback) {
  new Master()
}