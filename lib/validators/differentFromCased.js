'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (notEqualTo) {
    return (0, _common.withParams)({ type: 'differentFromCased', neq: notEqualTo }, function (value, parentVm) {
        return value !== (0, _common.ref)(notEqualTo, this, parentVm);
    });
};