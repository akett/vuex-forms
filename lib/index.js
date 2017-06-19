"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Errors = exports.Form = exports.VuexForms = undefined;

var _Form = require("./Form");

var _Form2 = _interopRequireDefault(_Form);

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _VuexText = require("./components/VuexText");

var _VuexText2 = _interopRequireDefault(_VuexText);

var _VuexCheckbox = require("./components/VuexCheckbox");

var _VuexCheckbox2 = _interopRequireDefault(_VuexCheckbox);

var _VuexRadio = require("./components/VuexRadio");

var _VuexRadio2 = _interopRequireDefault(_VuexRadio);

var _VuexSelect = require("./components/VuexSelect");

var _VuexSelect2 = _interopRequireDefault(_VuexSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VuexForms = {
    install: function install(Vue, options) {
        Vue.component('vuex-text', _VuexText2.default);
        Vue.component('vuex-checkbox', _VuexCheckbox2.default);
        Vue.component('vuex-radio', _VuexRadio2.default);
        Vue.component('vuex-select', _VuexSelect2.default);

        Vue.directive('vuex-input', {
            bind: function bind(el, binding, value) {
                var form = binding.value;
                var field = binding.arg;
                var component = value.child;
                if (binding.modifiers) {
                    for (var modifier in binding.modifiers) {
                        field += '.' + modifier;
                    }
                }
                component.tempValue = form[field];
                component.localErrors = form.errors.get(field);
                component.$on('input', function (inputValue) {
                    if (field.indexOf('.') !== -1) {
                        console.log('still working on nested data for the directive');
                    } else {
                        component.$set(form, field, inputValue);
                    }
                });
                component.$on('event', function (event) {
                    form.listen(event);

                    setTimeout(function () {
                        component.localErrors = form.errors.get(field);
                    }, event.type === 'input' ? form._config.inputDebounce + 5 : 0);
                });
                form.$bus.$on('reset', function () {
                    component.tempValue = null;
                    component.localErrors = null;
                });
            },
            unbind: function unbind(el, binding, value) {
                value.child.$off('event');
                value.child.$off('input');
                binding.value.$bus.$off('reset');
            }
        });
    }
};

exports.VuexForms = VuexForms;
exports.Form = _Form2.default;
exports.Errors = _Errors2.default;
exports.default = VuexForms;