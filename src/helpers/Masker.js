import caretPosition from "./caretPosition";

class Masker {
    // control the input's caret position to prevent the caret
    // from being moved to the end of the input when masking
    constructor() {
        this.caretPosition = 0;
    }

    readCaretPosition(el) {
        this.caretPosition = caretPosition.get(el);
    }

    updateCaretPosition(el, keyCode) {
        let movementOffset = (keyCode !== 8 && keyCode !== 46)
            ? 1
            : (keyCode !== 8) ? 0 : -1;
        setTimeout(() => {
            caretPosition.set(el, this.caretPosition + movementOffset);
        }, 0)
    }

    applyMask(data, mask) {
        // remove the mask so we're only working with data characters
        data = this.removeMask(data, mask);

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
                    if (this.caretPosition === i) this.caretPosition++;
                    break;
            }
        }

        return text;
    }

    removeMask(data, mask) {
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
}

export default Masker;