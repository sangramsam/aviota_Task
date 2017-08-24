var _ = require('lodash');
var httpStatus = require('http-status-codes');
var statusCodes = _.omit(httpStatus, 'getStatusText');

module.exports = function status(express) {

  _.each(statusCodes, function(code, key) {
    express.response[_.camelCase(key)] = function(data) {
      return this.status(code).json(data);
    };
  });

  return express;
};
