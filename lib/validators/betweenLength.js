'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (min, max) {
    return (0, _common.withParams)({ type: 'betweenLength', min: min, max: max }, function (value) {
        return (0, _common.req)(value) ? value.length ? value.length >= min && value.length <= max : false : true;
    });
};