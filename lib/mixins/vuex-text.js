"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _merge = require("merge");

var _merge2 = _interopRequireDefault(_merge);

var _vuexField = require("./vuex-field");

var _vuexField2 = _interopRequireDefault(_vuexField);

var _Masker = require("../helpers/Masker");

var _Masker2 = _interopRequireDefault(_Masker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _merge2.default.recursive(true, _vuexField2.default, {
        props: {
            type: {
                type: String,
                default: 'text',
                validator: function validator(value) {
                    return ['text', 'textarea', 'tel', 'number', 'email', 'password', 'url'].indexOf(value) !== -1;
                }
            },
            mask: { type: [Boolean, String], default: false },
            saveMask: { type: [Boolean, String], default: false }
        },
        mounted: function mounted() {
            this.tempValue = this.tempValue || (this.value ? this.value.toString() : '');
            this.masker = new _Masker2.default();
        },

        methods: {
            hasMask: function hasMask() {
                return this.mask !== false && ['number', 'password'].indexOf(this.type.toLowerCase()) === -1;
            },
            applyMask: function applyMask(value) {
                if (this.activeKeyCode !== 8 && this.activeKeyCode !== 46) {
                    value = this.masker.applyMask(value, this.mask);
                }

                this.$refs.input.value = value;

                this.masker.updateCaretPosition(this.$refs.input, this.activeKeyCode);

                return value;
            },
            applySaveMask: function applySaveMask(value) {
                if (this.saveMask === false) {
                    value = this.masker.removeMask(value, this.mask);
                } else if (this.saveMask !== true) {
                    value = this.masker.applyMask(value, this.saveMask);
                }
                return value;
            },
            handleKeyDown: function handleKeyDown(e) {
                if (this.hasMask()) {
                    this.activeKeyCode = e.keyCode || e.charCode;

                    this.masker.readCaretPosition(this.$refs.input);
                }
            },
            inputEvent: function inputEvent(event) {
                var value = event.target.value;
                if (this.hasMask()) {
                    value = this.applyMask(value);

                    event.target.value = this.applySaveMask(value);
                }

                this.tempValue = value;
                this.emitEvent('input', event);
            },
            blurEvent: function blurEvent(event) {
                if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value);
                this.emitEvent('blur', event);
            },
            focusEvent: function focusEvent(event) {
                if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value);
                this.emitEvent('focus', event);
            }
        }
    });
};