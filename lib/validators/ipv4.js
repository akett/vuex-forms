'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = (0, _common.regex)('ipv4', /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/);