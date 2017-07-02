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
            option_name: { type: String, default: 'name' },
            option_value: { type: String, default: 'value' },
            multiple: { type: Boolean, default: false }
        },
        methods: {
            checkSelected: function checkSelected(value) {
                if (!this.multiple && this.value === value) return true;
                if (this.multiple && this.value !== null && value.length) return this.value.indexOf(value) !== -1;
            },
            handleInput: function handleInput(event) {
                var values = null;
                if (this.multiple && event.target.selectedOptions) {
                    values = [];
                    for (var x = 0; x < event.target.selectedOptions.length; x++) {
                        values.push(event.target.selectedOptions[x].value);
                    }
                }
                return this.inputEvent(this.createEvent(event, 'input', values));
            },
            inputEvent: function inputEvent(event) {
                this.value = event.target.value;
                this.emitEvent('input', event);
            }
        }
    });
};