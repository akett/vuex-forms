'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (notEqualTo) {
    return (0, _common.withParams)({ type: 'differentFrom', neq: notEqualTo }, function (value, parentVm) {
        if (!(0, _common.req)(value)) return true;
        var neqField = (0, _common.ref)(notEqualTo, this, parentVm);
        neqField = neqField.toLowerCase() ? neqField.toLowerCase() : neqField;
        var compare = value.toLowerCase() ? value.toLowerCase() : value;
        return compare !== neqField;
    });
};