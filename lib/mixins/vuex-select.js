"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _merge = require("merge");

var _merge2 = _interopRequireDefault(_merge);

var _vuexField = require("./vuex-field");

var _vuexField2 = _interopRequireDefault(_vuexField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _merge2.default.recursive(true, _vuexField2.default, {
        props: {
            options: { type: [String, Object, Array], default: function _default() {
                    return [];
                } },
            option_name: { type: String, default: 'id' },
            option_value: { type: String, default: 'id' },
            multiple: { type: Boolean, default: false }
        }
    });
};