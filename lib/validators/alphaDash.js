'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = (0, _common.regex)('alphaDash', /^[a-zA-Z0-9_-]*$/);