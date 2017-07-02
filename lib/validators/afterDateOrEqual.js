'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('vuelidate/lib/validators/common');

exports.default = function (date) {
    return (0, _common.withParams)({ type: 'date', date: date }, function (value) {
        if (!(0, _common.req)(value)) return true;
        var targetDate = new Date(date);
        var userDate = new Date(value);
        userDate.setDate(userDate.getDate() + 1);
        return userDate >= targetDate;
    });
};