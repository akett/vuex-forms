"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuexText = require("../mixins/vuex-text");

var _vuexText2 = _interopRequireDefault(_vuexText);

var _vuexText3 = require("../templates/vuex-text.html");

var _vuexText4 = _interopRequireDefault(_vuexText3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'VuexText',
    template: _vuexText4.default,
    mixins: [(0, _vuexText2.default)()]
};