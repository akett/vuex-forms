import Form from "./Form"
import Errors from "./Errors"

import VuexText from './components/VuexText.vue';
import VuexCheckbox from './components/VuexCheckbox.vue';
import VuexRadio from './components/VuexRadio.vue';
import VuexSelect from './components/VuexSelect.vue';

const VuexForms = {
    install(Vue, options) {
        Vue.component('vuex-text', VuexText)
        Vue.component('vuex-checkbox', VuexCheckbox)
        Vue.component('vuex-radio', VuexRadio)
        Vue.component('vuex-select', VuexSelect)

        Vue.directive('vuex-input', {
            bind: function (el, binding, value) {
                let form      = binding.value
                let field     = binding.arg
                let component = value.child
                if (binding.modifiers) {
                    for (let modifier in binding.modifiers) {
                        field += '.' + modifier
                    }
                }
                component.tempValue   = form[field]
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
                    }, event.type === 'input' ? (form._config.inputDebounce + 5) : 0)
                })
                form.$bus.$on('reset', () => {
                    component.tempValue   = null
                    component.localErrors = null
                })
            },
            unbind(el, binding, value) {
                value.child.$off('event')
                value.child.$off('input')
                binding.value.$bus.$off('reset')
            }
        })
    }
};

export {
    VuexForms,
    Form,
    Errors
}

export default VuexForms;