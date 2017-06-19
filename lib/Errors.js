"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = function () {
    function Errors() {
        _classCallCheck(this, Errors);

        this.bag = {};
    }

    _createClass(Errors, [{
        key: "get",
        value: function get(field) {
            return this.bag.hasOwnProperty(field) ? this.bag[field] : null;
        }
    }, {
        key: "has",
        value: function has(field) {
            return this.bag.hasOwnProperty(field);
        }
    }, {
        key: "any",
        value: function any() {
            return Object.keys(this.bag).length > 0;
        }
    }, {
        key: "all",
        value: function all() {
            var errors = {};
            for (var field in this.bag) {
                if (this.bag.hasOwnProperty(field)) {
                    errors[field] = this.bag[field];
                }
            }

            return errors;
        }
    }, {
        key: "record",
        value: function record(errors) {
            if (errors.length < 1) return;

            var newErrors = {};

            for (var error in this.bag) {
                newErrors[error] = this.bag[error];
            }

            for (var field in errors) {
                newErrors[field] = errors[field];
            }

            this.bag = newErrors;
        }
    }, {
        key: "clear",
        value: function clear(field) {
            if (field) {
                var newErrors = {};
                for (var error in this.bag) {
                    if (this.bag.hasOwnProperty(error) && field !== error) {
                        newErrors[error] = this.bag[error];
                    }
                }
                this.bag = newErrors;
            } else {
                this.bag = {};
            }
        }
    }]);

    return Errors;
}();

exports.default = Errors;