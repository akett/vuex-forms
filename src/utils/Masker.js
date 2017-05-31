import caretPosition from "./caretPosition";

const Masker = {
    // control the input's caret position to prevent the caret
    // from being moved to the end of the input after masking
    caretPosition: 0,
    readCaretPosition: (el) => {
        Masker.caretPosition = caretPosition.get(el);
    },
    updateCaretPosition: (el, keyCode) => {
        let movementOffset = (keyCode !== 8 && keyCode !== 46)
            ? 1
            : (keyCode !== 8) ? 0 : -1;
        caretPosition.set(el, Masker.caretPosition + movementOffset);
    },
    applyMask: function (data, mask) {
        // remove the mask so we're only working with data characters
        data = Masker.removeMask(data, mask);

        let text = '', i, x, currentMaskChar, currentDataChar;
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
                    if (Masker.caretPosition === i) Masker.caretPosition++;
                    break;
            }
        }

        return text;
    },
    removeMask: function (data, mask) {
        let text = '', currentMaskChar, currentDataChar;
        for (let i = 0; i < mask.length; i++) {
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
};

export default Masker;