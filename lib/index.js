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

var _InputSyncDirective = require("./InputSyncDirective");

var _InputSyncDirective2 = _interopRequireDefault(_InputSyncDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VuexForms = {
    install: function install(Vue, options) {
        Vue.component('vuex-text', _VuexText2.default);
        Vue.component('vuex-checkbox', _VuexCheckbox2.default);
        Vue.component('vuex-radio', _VuexRadio2.default);
        Vue.component('vuex-select', _VuexSelect2.default);
        Vue.directive('input-sync', _InputSyncDirective2.default);
    }
};

exports.VuexForms = VuexForms;
exports.Form = _Form2.default;
exports.Errors = _Errors2.default;
exports.default = VuexForms;