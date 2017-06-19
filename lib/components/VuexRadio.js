"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuexRadio = require("../mixins/vuex-radio");

var _vuexRadio2 = _interopRequireDefault(_vuexRadio);

var _vuexRadio3 = require("../templates/vuex-radio.html");

var _vuexRadio4 = _interopRequireDefault(_vuexRadio3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'VuexRadio',
    template: _vuexRadio4.default,
    mixins: [(0, _vuexRadio2.default)()]
};