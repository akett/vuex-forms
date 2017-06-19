"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuexSelect = require("../mixins/vuex-select");

var _vuexSelect2 = _interopRequireDefault(_vuexSelect);

var _vuexSelect3 = require("../templates/vuex-select.html");

var _vuexSelect4 = _interopRequireDefault(_vuexSelect3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'VuexSelect',
    template: _vuexSelect4.default,
    mixins: [(0, _vuexSelect2.default)()]
};