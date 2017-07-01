'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    bind: function bind(el, binding, value) {
        var form = binding.value;
        var field = binding.arg;
        var component = value.child;
        if (binding.modifiers) {
            for (var modifier in binding.modifiers) {
                field += '.' + modifier;
            }
        }
        component.value = form[field];
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
            }, event.type === 'input' ? form._config.inputDebounce + 50 : 0);
        });
        form.$bus.$on('validate', function () {
            component.localErrors = form.errors.get(field);
        });
        form.$bus.$on('reset', function () {
            component.value = form._data._original[field];
            component.localErrors = null;
            if (component.$refs.input) {
                component.$refs.input.value = form._data._original[field];
            }
        });
    },
    unbind: function unbind(el, binding, value) {
        value.child.$off('event');
        value.child.$off('input');
        binding.value.$bus.$off('reset');
        binding.value.$bus.$off('validate');
    }
};