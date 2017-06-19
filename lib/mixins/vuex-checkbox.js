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
            trueValue: { type: [Number, Boolean, String], default: true },
            falseValue: { type: [Number, Boolean, String], default: false }
        },
        methods: {
            handleCheckbox: function handleCheckbox(event) {
                var newEvent = this.createEvent(event, 'input');
                newEvent.target.value = event.target.checked ? this.trueValue : this.falseValue;
                this.inputEvent(newEvent);
            }
        }
    });
};