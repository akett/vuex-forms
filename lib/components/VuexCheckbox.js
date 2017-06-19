"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuexCheckbox = require("../mixins/vuex-checkbox");

var _vuexCheckbox2 = _interopRequireDefault(_vuexCheckbox);

var _vuexCheckbox3 = require("../templates/vuex-checkbox.html");

var _vuexCheckbox4 = _interopRequireDefault(_vuexCheckbox3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'VuexCheckbox',
    template: _vuexCheckbox4.default,
    mixins: [(0, _vuexCheckbox2.default)()]
};