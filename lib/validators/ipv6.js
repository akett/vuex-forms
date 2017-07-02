'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = (0, _common.regex)('ipv6', /^((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$/);