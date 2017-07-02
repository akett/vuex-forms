'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (array) {
    return (0, _common.withParams)({ type: 'inArray', array: array }, function (value) {
        if (!(0, _common.req)(value)) return true;
        return array.indexOf(value) !== -1;
    });
};