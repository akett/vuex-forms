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
                let form  = binding.value
                let field = binding.arg
                if (binding.modifiers) {
                    for (let modifier in binding.modifiers) {
                        field += '.' + modifier
                    }
                }
                value.child.tempValue   = form[field]
                value.child.localErrors = form.errors.get(field)
                value.child.$on('input', (inputValue) => {
                    if (field.indexOf('.') !== -1) {
                        //field.split('.').reduce((o, i) => o[i], form)
                        console.log('still working on nested data for the directive')
                    } else {
                        value.child.$set(form, field, inputValue)
                    }
                })
                value.child.$on('event', (event) => {
                    form.listen(event)
                    // input event validation has a debounce timer, use setTimeout to wait for the validation to happen
                    setTimeout(() => {
                        value.child.localErrors = form.errors.get(field)
                    }, event.type === 'input' ? form._config.inputDebounce + 5 : 0)
                })
            },
            unbind(el, binding, value) {
                value.child.$off('event')
                value.child.$off('input')
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