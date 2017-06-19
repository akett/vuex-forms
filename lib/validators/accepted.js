'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = (0, _common.withParams)({ type: 'accepted' }, function (value) {
    return value === true || parseInt(value) === 1 || String(value).toLowerCase() === 'yes' || String(value).toLowerCase() === 'on';
});