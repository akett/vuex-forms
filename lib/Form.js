"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Errors = require("./Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _vuelidate = require("vuelidate");

var _messages = require("./lang/en/messages.js");

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultConfig = {
    vuexAction: false,
    ajaxURL: false,
    ajaxMethod: 'POST',
    ajaxTimeout: 10000,
    validations: null,
    defaultMessages: _messages2.default,
    overrideMessages: {},
    validateOnInput: true,
    validateOnBlur: true,
    validateOnFocus: false,
    validateOnLoad: false,
    validateOnSubmit: true,
    touchOnBlur: false,
    touchOnFocus: false,
    inputDebounce: 200
};

var VUEX_FORM = 'VUEX';
var AJAX_FORM = 'AJAX';

var _cachedVue = null;
function getVue(rootVm) {
    if (_cachedVue) return _cachedVue;
    var Vue = rootVm.constructor;

    while (Vue.super) {
        Vue = Vue.super;
    }_cachedVue = Vue;
    return Vue;
}

var Form = function () {
    function Form(vm, data) {
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var apiHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        _classCallCheck(this, Form);

        var Vue = getVue(vm);

        this.errors = new _Errors2.default();
        this.$bus = new Vue();
        this._config = {};
        this._data = {};
        this._hasValidator = false;
        this._submitter = null;
        this._vuex = false;
        this._ajax = false;
        this._timers = {
            inputDebounce: 0
        };

        this.setConfig(config);
        this.setupData(data);
        this.setupSubmitter(vm, apiHandler);
        this.setupValidator(Vue);

        if (this._hasValidator && this._config.validateOnLoad) {
            this.$v.$touch();
            this.validate();
        }
    }

    _createClass(Form, [{
        key: "setConfig",
        value: function setConfig() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this._config = {};
            for (var option in defaultConfig) {
                if (defaultConfig.hasOwnProperty(option)) {
                    this._config[option] = typeof config[option] === 'undefined' ? defaultConfig[option] : config[option];
                }
            }
        }
    }, {
        key: "setupData",
        value: function setupData(data) {
            var _this = this;

            this._data = Object.assign({}, { _original: data }, data);

            var _loop = function _loop(field) {
                if (data.hasOwnProperty(field)) {
                    Object.defineProperty(_this, field, {
                        get: function get() {
                            return this._data[field];
                        },
                        set: function set(value) {
                            this._data[field] = value;
                        }
                    });
                }
            };

            for (var field in data) {
                _loop(field);
            }
        }
    }, {
        key: "setupSubmitter",
        value: function setupSubmitter(vm, apiHandler) {
            if (this._config.vuexAction === false && this._config.ajaxURL === false) {
                this._submitter = false;
                return;
            }
            this._submitter = this._config.vuexAction !== false ? VUEX_FORM : AJAX_FORM;

            if (this._submitter === VUEX_FORM) {
                this._vuex = vm.$store;
            } else {
                this._ajax = apiHandler;
            }
        }
    }, {
        key: "setupValidator",
        value: function setupValidator(Vue) {
            var _this2 = this;

            if (this._config.validations !== null) {
                var _validations = this._config.validations;
                this._validations = {};

                this._hasValidator = true;
                this._validator = new Vue({
                    mixins: [_vuelidate.validationMixin],
                    validations: function validations() {
                        return typeof _validations === 'function' ? _validations(this) : _validations;
                    },

                    data: function data() {
                        return _this2._data;
                    }
                });

                Object.defineProperty(this, '$v', {
                    get: function get() {
                        return _this2._validator.$v;
                    }
                });

                this.parseValidations(typeof _validations === 'function' ? _validations(this._validator) : _validations);
            }
        }
    }, {
        key: "parseValidations",
        value: function parseValidations(validations) {
            var previousPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            for (var field in validations) {
                if (validations.hasOwnProperty(field) && _typeof(validations[field]) === 'object') {
                    for (var possibleRule in validations[field]) {
                        if (validations[field].hasOwnProperty(possibleRule)) {
                            if (typeof validations[field][possibleRule] === 'function') {
                                var fieldMap = (previousPath !== null ? previousPath + '.' : '') + field;

                                if (this._validations.hasOwnProperty(fieldMap)) {
                                    this._validations[fieldMap].push(possibleRule);
                                } else {
                                    this._validations[fieldMap] = [possibleRule];
                                }
                            } else {
                                this.parseValidations(validations[field][possibleRule], (previousPath !== null ? previousPath + '.' : '') + field + '.' + possibleRule);
                            }
                        }
                    }
                }
            }
        }
    }, {
        key: "data",
        value: function data() {
            var data = {};
            for (var field in this._data._original) {
                data[field] = this._data[field];
            }

            return data;
        }
    }, {
        key: "reset",
        value: function reset() {
            for (var field in this._data._original) {
                if (this._data.hasOwnProperty(field)) {
                    if (_typeof(this._data[field]) === 'object') {
                        this.resetNestedData(this._data[field]);
                    } else {
                        this._data[field] = this._data._original[field];
                    }
                }
            }

            this.errors.clear();

            if (this.hasValidator()) {
                this.$v.$reset();
            }

            this.$bus.$emit('reset');
        }
    }, {
        key: "resetNestedData",
        value: function resetNestedData(dataObject) {
            for (var field in dataObject) {
                if (dataObject.hasOwnProperty(field)) {
                    if (_typeof(dataObject[field]) === 'object') {
                        this.resetNestedData(dataObject[field]);
                    } else {
                        dataObject[field] = this._data._original[field];
                    }
                }
            }
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this3 = this;

            if (this._hasValidator && this._config.validateOnSubmit) {
                this.$v.$touch();

                var errors = this.validate();
                if (Object.keys(errors).length > 0) return Promise.reject(errors);
            }

            if (this._submitter === false) {
                return false;
            }

            return new Promise(function (resolve, reject) {
                return _this3._vuex.dispatch(_this3._config.vuexAction, _this3.data()).then(function (data) {
                    _this3.errors.clear();
                    resolve(data);
                }).catch(function (errors) {
                    _this3.errors.clear();
                    _this3.errors.record(errors);
                    reject(errors);
                });
            });
        }
    }, {
        key: "listen",
        value: function listen(event) {
            var _this4 = this;

            if ((typeof event === "undefined" ? "undefined" : _typeof(event)) !== 'object') return;

            var field = this.hasValidator(event.field) ? event.field.indexOf('.') !== -1 ? event.field.split('.').reduce(function (o, i) {
                return o[i];
            }, this.$v) : this.$v[event.field] : false;

            switch (event.type) {
                case 'input':
                    if (this.hasValidator(event.field)) {
                        field.$touch();
                        if (this._config.validateOnInput) {
                            clearTimeout(this._timers.inputDebounce);
                            this._timers.inputDebounce = setTimeout(function () {
                                return _this4.validate(event.field);
                            }, this._config.inputDebounce);
                        }
                    }
                    this.$bus.$emit('input', event);
                    break;
                case 'blur':
                    if (this.hasValidator(event.field)) {
                        if (this._config.touchOnBlur) field.$touch();
                        if (this._config.validateOnBlur) this.validate(event.field);
                    }
                    this.$bus.$emit('blur', event);
                    break;
                case 'focus':
                    if (this.hasValidator(event.field)) {
                        if (this._config.touchOnFocus) field.$touch();
                        if (this._config.validateOnFocus) this.validate(event.field);
                    }
                    this.$bus.$emit('focus', event);
                    break;
            }
        }
    }, {
        key: "hasValidator",
        value: function hasValidator() {
            var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return field !== null ? this._hasValidator && this._validations.hasOwnProperty(field) : this._hasValidator;
        }
    }, {
        key: "validate",
        value: function validate() {
            var targetField = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!this._hasValidator || this.$v.$errors === false) return false;

            this.errors.clear(targetField);

            var validations = targetField !== null ? _defineProperty({}, targetField, targetField) : this._validations;

            var errors = {};
            for (var field in validations) {
                var validation = field.indexOf('.') !== -1 ? field.split('.').reduce(function (o, i) {
                    return o[i];
                }, this.$v) : this.$v[field];

                if ((typeof validation === "undefined" ? "undefined" : _typeof(validation)) === 'object' && validation.$error === true) {
                    var messages = [];
                    for (var rule in validation.$params) {
                        if (validation.hasOwnProperty(rule) && validation[rule] === false) {
                            var message = this._config.overrideMessages[field] && this._config.overrideMessages[field][rule] ? this._config.overrideMessages[field][rule] : this._config.defaultMessages[rule] ? this._config.defaultMessages[rule] : 'The :attribute field has an error';

                            var params = Object.assign({}, validation.$params[rule]);

                            if (params !== null && params.type) delete params.type;

                            var fieldName = field.indexOf('.') !== -1 ? field.split('.').reverse()[0] : field;
                            message = message.replace(":attribute", fieldName.replace(/_/g, ' '));

                            for (var param in params) {
                                if (params.hasOwnProperty(param)) {
                                    message = message.replace(":" + param, params[param]);
                                }
                            }

                            messages.push(message);
                        }
                    }

                    errors[field] = messages;
                }
            }

            this.errors.record(errors);

            this.$bus.$emit('validate');

            return errors;
        }
    }]);

    return Form;
}();

exports.default = Form;