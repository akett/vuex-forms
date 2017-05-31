var caretPosition = {
    get(el) {

        // Initialize
        var iCaretPos = 0;

        // IE Support
        if (document.selection) {

            // Set focus on the element
            el.focus();

            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange();

            // Move selection start to 0 position
            oSel.moveStart('character', -el.value.length);

            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (el.selectionStart || el.selectionStart === '0') {
            iCaretPos = el.selectionStart;
        }

        // Return results
        return parseInt(iCaretPos);
    },

    set(el, pos) {
        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', pos);
            range.select();
        }
        else {
            if (el.selectionStart) {
                el.focus();
                el.setSelectionRange(pos, pos);
            }
            else {
                el.focus();
            }
        }
    }
};

module.exports = caretPosition;