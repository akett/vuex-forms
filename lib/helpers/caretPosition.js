'use strict';

var caretPosition = {
    get: function get(el) {
        var iCaretPos = 0;

        if (document.selection) {
            el.focus();

            var oSel = document.selection.createRange();

            oSel.moveStart('character', -el.value.length);

            iCaretPos = oSel.text.length;
        } else if (el.selectionStart || el.selectionStart === '0') {
                iCaretPos = el.selectionStart;
            }

        return parseInt(iCaretPos);
    },
    set: function set(el, pos) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', pos);
            range.select();
        } else {
            if (el.selectionStart) {
                el.focus();
                el.setSelectionRange(pos, pos);
            } else {
                el.focus();
            }
        }
    }
};

module.exports = caretPosition;