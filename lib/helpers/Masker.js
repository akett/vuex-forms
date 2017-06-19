'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _caretPosition = require('./caretPosition');

var _caretPosition2 = _interopRequireDefault(_caretPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Masker = function () {
    function Masker() {
        _classCallCheck(this, Masker);

        this.caretPosition = 0;
    }

    _createClass(Masker, [{
        key: 'readCaretPosition',
        value: function readCaretPosition(el) {
            this.caretPosition = _caretPosition2.default.get(el);
        }
    }, {
        key: 'updateCaretPosition',
        value: function updateCaretPosition(el, keyCode) {
            var _this = this;

            var movementOffset = keyCode !== 8 && keyCode !== 46 ? 1 : keyCode !== 8 ? 0 : -1;
            setTimeout(function () {
                _caretPosition2.default.set(el, _this.caretPosition + movementOffset);
            }, 0);
        }
    }, {
        key: 'applyMask',
        value: function applyMask(data, mask) {
            data = this.removeMask(data, mask);

            var text = '',
                i = void 0,
                x = void 0,
                currentMaskChar = void 0,
                currentDataChar = void 0;
            for (x = i = 0; x < data.length && i < mask.length; i++) {
                currentMaskChar = mask.charAt(i);
                currentDataChar = data.charAt(x);
                switch (currentMaskChar) {
                    case '#':
                        if (/\d/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        x++;
                        break;
                    case 'A':
                        if (/[a-z]/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        x++;
                        break;
                    case 'N':
                        if (/[a-z0-9]/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        x++;
                        break;
                    case 'X':
                        text += currentDataChar;
                        x++;
                        break;
                    default:
                        text += currentMaskChar;
                        if (this.caretPosition === i) this.caretPosition++;
                        break;
                }
            }

            return text;
        }
    }, {
        key: 'removeMask',
        value: function removeMask(data, mask) {
            var text = '',
                currentMaskChar = void 0,
                currentDataChar = void 0;
            for (var i = 0; i < mask.length; i++) {
                currentMaskChar = mask.charAt(i);
                currentDataChar = data.charAt(i);
                switch (currentMaskChar) {
                    case '#':
                        if (/\d/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        break;
                    case 'A':
                        if (/[a-z]/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        break;
                    case 'N':
                        if (/[a-z0-9]/i.test(currentDataChar)) {
                            text += currentDataChar;
                        }
                        break;
                    case 'X':
                        text += currentDataChar;
                        break;
                    default:
                        if (mask.indexOf(currentDataChar) < 0) {
                            text += currentDataChar;
                        }
                        break;
                }
            }

            return text;
        }
    }]);

    return Masker;
}();

exports.default = Masker;