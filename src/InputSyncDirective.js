export default {
    bind: function (el, binding, value) {
        let form      = binding.value
        let field     = binding.arg
        let component = value.child
        if (binding.modifiers) {
            for (let modifier in binding.modifiers) {
                field += '.' + modifier
            }
        }
        component.value       = form[field]
        component.localErrors = form.errors.get(field)
        component.$on('input', (inputValue) => {
            if (field.indexOf('.') !== -1) {
                //field.split('.').reduce((o, i) => o[i], form)
                console.log('still working on nested data for the directive')
            } else {
                component.$set(form, field, inputValue)
            }
        })
        component.$on('event', (event) => {
            form.listen(event)
            // input event validation has a debounce timer, use setTimeout to wait for the validation to happen
            setTimeout(() => {
                component.localErrors = form.errors.get(field)
            }, event.type === 'input' ? (form._config.inputDebounce + 50) : 0)
        })
        form.$bus.$on('validate', () => {
            component.localErrors = form.errors.get(field)
        })
        form.$bus.$on('reset', () => {
            component.value       = form._data._original[field]
            component.localErrors = null
            if (component.$refs.input) {
                component.$refs.input.value = form._data._original[field]
            }
        })
    },
    unbind(el, binding, value) {
        value.child.$off('event')
        value.child.$off('input')
        binding.value.$bus.$off('reset')
        binding.value.$bus.$off('validate')
    }
}