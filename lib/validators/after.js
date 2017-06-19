'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (after) {
    return (0, _common.withParams)({ type: 'after', after: after }, function (value) {});
};