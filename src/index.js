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
                console.log(binding)
                let field = binding.arg
                let form  = value.context[binding.expression.split('.')[0]];
                value.child.$on('event', (event) => {
                    form.listen(event)
                })
                value.child.errors = form.errors.get(field)
            },
            update: function (el, binding, value) {
                // mutating prop error -_-
                let field          = binding.expression.split('.').reverse().splice(0, 1).join('.')
                let form           = value.context[binding.expression.split('.')[0]];
                value.child.errors = form.errors.get(field)
            },
            unbind(el, binding, value) {
                value.child.$off('event')
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